"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function QuickGenerate() {
  const router = useRouter();
  const { user } = useUserStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("projects")
        .select("id, name")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      setProjects(data || []);
      if (data?.length) setSelectedProject(data[0].id);
      setLoading(false);
    };
    fetchProjects();
  }, [user]);

  return (
    <div className="rounded-xl border border-card-border bg-card p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Quick Generate</h3>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Project</label>
          {loading ? (
            <div className="h-9 bg-card-border rounded animate-pulse" />
          ) : projects.length === 0 ? (
            <Link href="/projects" className="text-xs text-electric-indigo hover:underline">
              Create your first project
            </Link>
          ) : (
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={() => {
            if (selectedProject) router.push(`/generate?project=${selectedProject}`);
          }}
          disabled={!selectedProject}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          Generate Content
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
