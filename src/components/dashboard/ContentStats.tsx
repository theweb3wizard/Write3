"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle, Clock, BarChart3, Zap } from "lucide-react";

interface Stats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
}

interface AnalyticsData {
  total_generated: number;
  by_platform: Record<string, number>;
  recent_days: { date: string; count: number }[];
  credit_balance: number;
  free_remaining: number;
  total_generations: number;
}

export default function ContentStats() {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, scheduled: 0, drafts: 0 });
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("/api/analytics");
        const json = await res.json();
        if (json.success) {
          setAnalytics(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (!analytics) return;
    setStats({
      total: analytics.total_generated,
      published: 0,
      scheduled: 0,
      drafts: analytics.total_generated,
    });
  }, [analytics]);

  const cards = [
    { label: "Total Generated", value: stats.total, icon: FileText, color: "text-electric-indigo", bg: "bg-electric-indigo/10" },
    { label: "Credits Remaining", value: analytics?.credit_balance ?? 0, icon: Zap, color: "text-warning", bg: "bg-warning/10" },
    { label: "Free This Month", value: `${analytics?.free_remaining ?? 25}/25`, icon: Clock, color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
    { label: "Lifetime", value: analytics?.total_generations ?? 0, icon: BarChart3, color: "text-info", bg: "bg-info/10" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-xl border border-card-border bg-card p-4 animate-pulse">
            <div className="h-4 w-20 bg-card-border rounded mb-3" />
            <div className="h-8 w-12 bg-card-border rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-card-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.bg}`}>
                  <Icon className={`h-3.5 w-3.5 ${card.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      {analytics && Object.keys(analytics.by_platform).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <span className="text-gray-500 font-semibold">By platform:</span>
          {Object.entries(analytics.by_platform)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([platform, count]) => (
              <span key={platform} className="text-gray-400">
                {platform}: <span className="text-white font-medium">{count}</span>
              </span>
            ))}
        </div>
      )}

      {analytics && analytics.recent_days.length > 0 && (
        <div className="mt-3 flex items-end gap-1 h-8">
          {analytics.recent_days.slice(-14).map((day) => (
            <div
              key={day.date}
              className="flex-1 rounded-t bg-electric-indigo/30 hover:bg-electric-indigo/50 transition cursor-pointer"
              style={{ height: `${Math.min(100, Math.max(10, day.count * 20))}%` }}
              title={`${day.date}: ${day.count} generations`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
