"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { ExternalLink, AtSign, MessageCircle, Send, Newspaper, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

const platformIcons: Record<string, any> = {
  twitter: AtSign,
  discord: MessageCircle,
  telegram: Send,
  reddit: MessageCircle,
  blog: Newspaper,
  newsletter: BookOpen,
  farcaster: MessageCircle,
};

const platformColors: Record<string, string> = {
  twitter: "text-info",
  discord: "text-electric-indigo",
  telegram: "text-info",
  reddit: "text-orange-400",
  blog: "text-warning",
  newsletter: "text-success",
  farcaster: "text-neon-cyan",
};

export default function RecentContent() {
  const { user } = useUserStore();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchRecent = async () => {
      const supabase = createClient();
      const { data: projects } = await supabase
        .from("projects")
        .select("id")
        .eq("user_id", user.id);

      if (!projects?.length) { setLoading(false); return; }

      const { data } = await supabase
        .from("content_pieces")
        .select("id, title, platform, content_type, status, created_at, projects(name)")
        .in("project_id", projects.map(p => p.id))
        .order("created_at", { ascending: false })
        .limit(5);

      setContent(data || []);
      setLoading(false);
    };
    fetchRecent();
  }, [user]);

  if (loading) {
    return (
      <div className="rounded-xl border border-card-border bg-card p-5">
        <div className="h-5 w-32 bg-card-border rounded animate-pulse mb-4" />
        {[1, 2, 3].map(i => (
          <div key={i} className="h-14 bg-card-border rounded animate-pulse mb-3" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-card-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Recent Content</h3>
        <Link href="/library" className="text-xs text-electric-indigo hover:underline">
          View all
        </Link>
      </div>

      {content.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No content generated yet.</p>
          <Link href="/generate" className="text-sm text-electric-indigo hover:underline mt-1 inline-block">
            Generate your first piece
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {content.map((item) => {
            const Icon = platformIcons[item.platform] || FileText;
            const color = platformColors[item.platform] || "text-gray-400";
            return (
              <Link
                key={item.id}
                href={`/library?id=${item.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-card-border/30 transition group"
              >
                <div className={`p-2 rounded-lg bg-card-border/50 ${color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-electric-indigo transition">
                    {item.title || "Untitled"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.projects?.name} &middot; {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                  item.status === "published" ? "bg-success/10 text-success" :
                  item.status === "scheduled" ? "bg-warning/10 text-warning" :
                  "bg-gray-500/10 text-gray-400"
                }`}>
                  {item.status}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-gray-600 group-hover:text-gray-400 transition" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
