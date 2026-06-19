import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDegradationCached } from "@/lib/ai/router";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: projectIds } = await supabase
      .from("projects")
      .select("id")
      .eq("user_id", user.id);

    if (!projectIds || projectIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          total_generated: 0,
          by_platform: {},
          recent_days: [],
          credit_balance: 0,
          free_remaining: 25,
          total_generations: 0,
        },
      });
    }

    const ids = projectIds.map(p => p.id);

    const { data: userProfile } = await supabase
      .from("users")
      .select("credit_balance, free_generations_used, total_generations")
      .eq("id", user.id)
      .single();

    const { data: contentCounts } = await supabase
      .from("content_pieces")
      .select("platform, created_at")
      .in("project_id", ids);

    const total_generated = contentCounts?.length || 0;
    const by_platform: Record<string, number> = {};
    const by_day: Record<string, number> = {};

    contentCounts?.forEach(c => {
      by_platform[c.platform] = (by_platform[c.platform] || 0) + 1;
      const day = new Date(c.created_at).toISOString().slice(0, 10);
      by_day[day] = (by_day[day] || 0) + 1;
    });

    const recent_days = Object.entries(by_day)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30)
      .map(([date, count]) => ({ date, count }));

    const credit_balance = userProfile?.credit_balance ?? 0;
    const free_remaining = Math.max(0, 25 - (userProfile?.free_generations_used ?? 0));
    const total_generations = userProfile?.total_generations ?? 0;

    return NextResponse.json({
      success: true,
      data: {
        total_generated,
        by_platform,
        recent_days,
        credit_balance,
        free_remaining,
        total_generations,
      },
    });
  } catch (err: any) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

// Admin-only: system health overview
export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isAdmin = process.env.ADMIN_USER_IDS?.split(",").includes(user.id);
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const admin = createAdminClient();

    const { count: totalUsers } = await admin
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: totalGenerations } = await admin
      .from("content_pieces")
      .select("*", { count: "exact", head: true });

    const { count: totalProjects } = await admin
      .from("projects")
      .select("*", { count: "exact", head: true });

    let premiumBalance = 0;
    try {
      const key = process.env.OPENROUTER_API_KEY;
      if (key) {
        const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
          headers: { Authorization: `Bearer ${key}` },
        });
        if (res.ok) {
          const data = await res.json();
          premiumBalance = data?.data?.credits ?? 0;
        }
      }
    } catch {}

    return NextResponse.json({
      success: true,
      data: {
        total_users: totalUsers ?? 0,
        total_generations: totalGenerations ?? 0,
        total_projects: totalProjects ?? 0,
        premium_api_balance: premiumBalance,
        degradation_mode: isDegradationCached(),
      },
    });
  } catch (err: any) {
    console.error("Admin analytics error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
