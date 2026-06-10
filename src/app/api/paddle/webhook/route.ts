import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Webhooks } from "@paddle/paddle-node-sdk";
import { z } from "zod";

const WebhookEventSchema = z.object({
  event_type: z.string(),
  data: z.object({
    id: z.string().optional(),
    customer_id: z.string().optional(),
    status: z.string().optional(),
    items: z.array(z.object({
      price: z.object({
        name: z.string().optional(),
      }).optional(),
    })).optional(),
    current_billing_period: z.object({
      starts_at: z.string().optional(),
      ends_at: z.string().optional(),
    }).optional(),
    scheduled_change: z.object({
      effective_at: z.string().nullable().optional(),
    }).optional(),
    custom_data: z.object({
      user_id: z.string().optional(),
    }).optional(),
  }),
});

export async function POST(request: Request) {
  try {
    const secretKey = process.env.PADDLE_WEBHOOK_SECRET;
    if (!secretKey) {
      console.error("PADDLE_WEBHOOK_SECRET not configured — rejecting webhook");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const rawBody = await request.text();
    const signature = request.headers.get("paddle-signature") || request.headers.get("Paddle-Signature") || "";

    const webhooks = new Webhooks();
    const isValid = await webhooks.isSignatureValid(rawBody, secretKey, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid webhook body" }, { status: 400 });
    }

    const parsed = WebhookEventSchema.safeParse(parsedBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    const eventType = parsed.data.event_type;
    const data = parsed.data.data;

    const adminClient = createAdminClient();

    if (eventType === "subscription.created" || eventType === "subscription.updated") {
      const subscriptionId = data.id || "";
      const customerId = data.customer_id || "";
      const rawPlanName = data.items?.[0]?.price?.name?.toLowerCase() || "";
      const planType = rawPlanName.includes("creator") ? "creator"
        : rawPlanName.includes("pro") ? "pro"
        : rawPlanName.includes("agency") ? "agency"
        : "free";
      const status = data.status || "active";
      const currentPeriodStart = data.current_billing_period?.starts_at || null;
      const currentPeriodEnd = data.current_billing_period?.ends_at || null;
      const cancelAt = data.scheduled_change?.effective_at || null;

      const userId = data.custom_data?.user_id || customerId;

      const { data: existingSub } = await adminClient
        .from("subscriptions")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existingSub) {
        await adminClient
          .from("subscriptions")
          .update({
            paddle_subscription_id: subscriptionId,
            paddle_customer_id: customerId,
            plan_type: planType,
            status,
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
            cancel_at: cancelAt,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);
      } else {
        await adminClient
          .from("subscriptions")
          .insert({
            user_id: userId,
            paddle_subscription_id: subscriptionId,
            paddle_customer_id: customerId,
            plan_type: planType,
            status,
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
            cancel_at: cancelAt,
          });
      }

      await adminClient
        .from("users")
        .update({ subscription_tier: planType, updated_at: new Date().toISOString() })
        .eq("id", userId);
    }

    if (eventType === "subscription.canceled") {
      const customerId = data.customer_id || "";
      const { data: sub } = await adminClient
        .from("subscriptions")
        .select("user_id")
        .eq("paddle_customer_id", customerId)
        .maybeSingle();

      if (sub) {
        await adminClient
          .from("subscriptions")
          .update({ status: "deleted", updated_at: new Date().toISOString() })
          .eq("user_id", sub.user_id);

        await adminClient
          .from("users")
          .update({ subscription_tier: "free", updated_at: new Date().toISOString() })
          .eq("id", sub.user_id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
