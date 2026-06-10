"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectForm from "@/components/projects/ProjectForm";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreated = () => {
    setShowForm(false);
    fetchProjects();
  };

  return (
    <AppShell>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your Web3 projects and their content settings</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-xl border border-card-border bg-card p-5 animate-pulse">
                <div className="h-5 w-32 bg-card-border rounded mb-3" />
                <div className="h-4 w-full bg-card-border rounded mb-2" />
                <div className="h-4 w-3/4 bg-card-border rounded" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-card-border bg-card p-12 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-sm text-gray-500 mb-6">Time to create your first project and start generating Web3-native content.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-premium px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onUpdate={fetchProjects} />
            ))}
          </div>
        )}

        {showForm && (
          <ProjectForm
            onClose={() => setShowForm(false)}
            onCreated={handleCreated}
          />
        )}
      </div>
    </AppShell>
  );
}
