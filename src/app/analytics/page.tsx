"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import { BarChart3, Globe, FileText, Cpu, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-card-border rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-xl border border-card-border bg-card p-4 animate-pulse">
                <div className="h-4 w-24 bg-card-border rounded mb-3" />
                <div className="h-8 w-16 bg-card-border rounded" />
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  const stats = [
    { label: "Total Generations", value: data?.total_generations || 0, icon: FileText, color: "text-electric-indigo", bg: "bg-electric-indigo/10" },
    { label: "Token Usage", value: data?.token_usage?.toLocaleString() || "0", icon: Cpu, color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
    { label: "Platforms Used", value: data?.platform_breakdown?.length || 0, icon: Globe, color: "text-success", bg: "bg-success/10" },
    { label: "Recent (30d)", value: data?.recent_generations || 0, icon: TrendingUp, color: "text-warning", bg: "bg-warning/10" },
  ];

  const maxDailyCount = Math.max(...(data?.daily_counts?.map((d: any) => d.count) || [0]), 1);

  const platformColors: Record<string, string> = {
    twitter: "#3B82F6", discord: "#6366F1", telegram: "#3B82F6",
    blog: "#F59E0B", newsletter: "#10B981", farcaster: "#22D3EE",
  };

  return (
    <AppShell>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-card-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                  <div className={`p-1.5 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-card-border bg-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Generations (Last 30 Days)</h3>
            {data?.daily_counts?.length > 0 ? (
              <div className="flex items-end gap-1 h-32">
                {data.daily_counts.map((day: any, i: number) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-electric-indigo/60 hover:bg-electric-indigo transition cursor-pointer relative group"
                    style={{ height: `${Math.max((day.count / maxDailyCount) * 100, day.count > 0 ? 8 : 2)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-card-border rounded px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                      {day.date}: {day.count} generations
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
            )}
          </div>

          <div className="rounded-xl border border-card-border bg-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">By Platform</h3>
            {data?.platform_breakdown?.length > 0 ? (
              <div className="space-y-3">
                {data.platform_breakdown.map((item: any, i: number) => {
                  const total = data.platform_breakdown.reduce((s: number, p: any) => s + p.value, 0);
                  const pct = total > 0 ? (item.value / total) * 100 : 0;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400 capitalize">{item.name}</span>
                        <span className="text-sm text-white font-medium">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-card-border overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: platformColors[item.name] || "#6366F1" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-card-border bg-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">By Content Type</h3>
            {data?.type_breakdown?.length > 0 ? (
              <div className="space-y-3">
                {data.type_breakdown.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{item.name.replace(/_/g, " ")}</span>
                    <span className="text-sm text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
            )}
          </div>

          <div className="rounded-xl border border-card-border bg-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Usage</h3>
            {data?.subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Plan</span>
                  <span className="text-sm text-white font-medium capitalize">{data.subscription.subscription_tier}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-400">Monthly Generations</span>
                    <span className="text-sm text-white font-medium">
                      {data.subscription.monthly_generation_count} / {data.subscription.subscription_tier === "free" ? "50" : "Unlimited"}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-card-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-premium transition-all duration-500"
                      style={{ width: `${Math.min((data.subscription.monthly_generation_count / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No subscription data</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
