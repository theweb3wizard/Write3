import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const category = searchParams.get("category");
    const includePremium = searchParams.get("include_premium") !== "false";

    const supabase = await createClient();
    let query = supabase
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (platform) {
      query = query.eq("platform", platform);
    }
    if (category) {
      query = query.eq("category", category);
    }
    if (!includePremium) {
      query = query.eq("is_premium", false);
    }

    const { data: templates, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: templates });
  } catch (err: any) {
    console.error("Templates fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}
