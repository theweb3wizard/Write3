import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCreditPrice } from "@/lib/subscription/guards";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { credits } = body;

    const usdAmount = getCreditPrice(credits);
    if (!usdAmount) {
      return NextResponse.json({ error: "Invalid credit amount. Available: 100 ($10), 500 ($35)" }, { status: 400 });
    }

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: usdAmount,
        price_currency: "usd",
        pay_currency: "usdcsol",
        ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
        order_id: `${user.id}_${Date.now()}`,
        order_description: `${credits} Write3 credits`,
        is_fixed_rate: true,
        is_fee_paid_by_user: true,
      }),
    });

    const invoice = await response.json();

    if (!response.ok) {
      console.error("NowPayments invoice error:", invoice);
      return NextResponse.json({ error: "Failed to create payment" }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      invoice_url: invoice.invoice_url,
      invoice_id: invoice.id,
    });
  } catch (err: any) {
    console.error("Create invoice error:", err);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
