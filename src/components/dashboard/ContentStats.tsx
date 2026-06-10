"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { FileText, CheckCircle, Clock, BarChart3 } from "lucide-react";

interface Stats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
}

export default function ContentStats() {
  const { user } = useUserStore();
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, scheduled: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const supabase = createClient();
      const { data: projects } = await supabase
        .from("projects")
        .select("id")
        .eq("user_id", user.id);

      if (!projects?.length) { setLoading(false); return; }

      const projectIds = projects.map(p => p.id);
      const { data: content } = await supabase
        .from("content_pieces")
        .select("status")
        .in("project_id", projectIds);

      if (content) {
        setStats({
          total: content.length,
          published: content.filter(c => c.status === "published").length,
          scheduled: content.filter(c => c.status === "scheduled").length,
          drafts: content.filter(c => c.status === "draft").length,
        });
      }
      setLoading(false);
    };
    fetchStats();
  }, [user]);

  const cards = [
    { label: "Total Generated", value: stats.total, icon: FileText, color: "text-electric-indigo", bg: "bg-electric-indigo/10" },
    { label: "Published", value: stats.published, icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
    { label: "Scheduled", value: stats.scheduled, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
    { label: "Drafts", value: stats.drafts, icon: BarChart3, color: "text-info", bg: "bg-info/10" },
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
  );
}
