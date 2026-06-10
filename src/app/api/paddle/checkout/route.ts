import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PRICE_IDS: Record<string, string> = {
  creator: process.env.PADDLE_PRICE_CREATOR || "",
  pro: process.env.PADDLE_PRICE_PRO || "",
  agency: process.env.PADDLE_PRICE_AGENCY || "",
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { plan } = body;

    if (!plan || !["creator", "pro", "agency"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Price not configured for this plan" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        priceId,
        customerId: user.id,
        customerEmail: user.email,
      },
    });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
