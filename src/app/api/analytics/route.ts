import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const projectIdsQuery = await supabase
      .from("projects")
      .select("id")
      .eq("user_id", user.id);
    const projectIds = projectIdsQuery.data?.map(p => p.id) || [];

    if (projectIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          total_generations: 0,
          platform_breakdown: [],
          type_breakdown: [],
          daily_counts: [],
          top_templates: [],
          token_usage: 0,
          recent_generations: 0,
        },
      });
    }

    const [contentResult, logsResult, userResult] = await Promise.all([
      supabase
        .from("content_pieces")
        .select("id, platform, content_type, tokens_used, template_id, created_at, projects!inner(name)")
        .in("project_id", projectIds)
        .gte("created_at", thirtyDaysAgo.toISOString())
        .order("created_at", { ascending: false }),

      supabase
        .from("usage_logs")
        .select("tokens_used, action_type, created_at")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString()),

      supabase
        .from("users")
        .select("subscription_tier, monthly_generation_count, generations_reset_at")
        .eq("id", user.id)
        .single(),
    ]);

    const content = contentResult.data || [];
    const logs = logsResult.data || [];

    const platformBreakdown = content.reduce((acc: Record<string, number>, c) => {
      acc[c.platform] = (acc[c.platform] || 0) + 1;
      return acc;
    }, {});

    const typeBreakdown = content.reduce((acc: Record<string, number>, c) => {
      acc[c.content_type] = (acc[c.content_type] || 0) + 1;
      return acc;
    }, {});

    const dailyCounts: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dailyCounts[d.toISOString().split("T")[0]] = 0;
    }
    content.forEach(c => {
      const day = new Date(c.created_at).toISOString().split("T")[0];
      if (dailyCounts[day] !== undefined) dailyCounts[day]++;
    });

    const templateCounts: Record<string, { name: string; count: number }> = {};
    content.forEach(c => {
      const key = c.template_id || "unknown";
      if (!templateCounts[key]) {
        templateCounts[key] = { name: (c as any).projects?.name || "Untitled", count: 0 };
      }
      templateCounts[key].count++;
    });

    const totalTokens = logs.reduce((sum, l) => sum + (l.tokens_used || 0), 0);
    const recentCount = content.length;

    return NextResponse.json({
      success: true,
      data: {
        total_generations: content.length,
        platform_breakdown: Object.entries(platformBreakdown).map(([name, value]) => ({ name, value })),
        type_breakdown: Object.entries(typeBreakdown).map(([name, value]) => ({ name, value })),
        daily_counts: Object.entries(dailyCounts).map(([date, count]) => ({ date, count })),
        top_templates: Object.values(templateCounts).sort((a, b) => b.count - a.count).slice(0, 10),
        token_usage: totalTokens,
        recent_generations: recentCount,
        subscription: userResult.data,
      },
    });
  } catch (err: any) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
