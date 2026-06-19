import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

    if (!ipnSecret) {
      console.error("NOWPAYMENTS_IPN_SECRET not configured");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(rawBody + ipnSecret));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const computedSignature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    const receivedSignature = request.headers.get("x-nowpayments-sig") || "";

    if (computedSignature !== receivedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(rawBody);

    if (data.payment_status !== "finished") {
      return NextResponse.json({ received: true });
    }

    const orderId: string = data.order_id || "";
    const userId = orderId.split("_")[0];
    const creditsMatch = (data.order_description || "").match(/^(\d+)/);
    const creditsPurchased = creditsMatch ? parseInt(creditsMatch[0]) : 0;

    if (!userId || !creditsPurchased) {
      console.error("Invalid webhook payload: missing user_id or credits", data);
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { data: existingPayment } = await adminClient
      .from("payments")
      .select("id")
      .eq("nowpayments_id", data.payment_id)
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json({ received: true });
    }

    const { error: creditError } = await adminClient.rpc("add_credits", {
      user_id: userId,
      amount: creditsPurchased,
    });

    if (creditError) {
      console.error("Failed to add credits:", creditError);
      return NextResponse.json({ error: "Failed to credit user" }, { status: 500 });
    }

    await adminClient.from("payments").insert({
      user_id: userId,
      nowpayments_id: data.payment_id || null,
      tx_hash: data.tx_hash || data.payment_id || null,
      amount_usd: data.price_amount || 0,
      credits_purchased: creditsPurchased,
      currency: "usdc",
      network: "solana",
      status: "confirmed",
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
