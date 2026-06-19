import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { refreshDegradationStatus, isDegradationCached } from "@/lib/ai/router";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("users")
      .select("credit_balance")
      .eq("id", user.id)
      .single();

    const isAdmin = process.env.ADMIN_USER_IDS?.split(",").includes(user.id);

    const result: Record<string, unknown> = {
      credit_balance: profile?.credit_balance ?? 0,
    };

    if (isAdmin) {
      const premiumBalance = await checkPremiumBalance();
      result.premium_api_balance = premiumBalance;
      result.degradation_mode = isDegradationCached();
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    console.error("Balance check error:", err);
    return NextResponse.json({ error: "Failed to check balance" }, { status: 500 });
  }
}

async function checkPremiumBalance(): Promise<number> {
  try {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) return 0;

    const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
      headers: { Authorization: `Bearer ${key}` },
    });

    if (!response.ok) return 0;
    const data = await response.json();
    return data?.data?.credits ?? 0;
  } catch {
    return 0;
  }
}

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = process.env.ADMIN_USER_IDS?.split(",").includes(user.id);
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const degraded = await refreshDegradationStatus();
    return NextResponse.json({ success: true, data: { degradation_mode: degraded } });
  } catch (err: any) {
    console.error("Refresh error:", err);
    return NextResponse.json({ error: "Failed to refresh" }, { status: 500 });
  }
}
