"use client";

import { useState } from "react";
import { FolderOpen, Trash2, ExternalLink, AtSign, MessageCircle, Send, Newspaper, BookOpen } from "lucide-react";
import Link from "next/link";

const typeConfig: Record<string, { label: string; color: string }> = {
  defi: { label: "DeFi", color: "text-info bg-info/10" },
  nft: { label: "NFT", color: "text-warning bg-warning/10" },
  dao: { label: "DAO", color: "text-success bg-success/10" },
  infrastructure: { label: "Infrastructure", color: "text-electric-indigo bg-electric-indigo/10" },
  gamefi: { label: "GameFi", color: "text-neon-cyan bg-neon-cyan/10" },
  other: { label: "Other", color: "text-gray-400 bg-gray-500/10" },
};

const platformIcons: Record<string, any> = {
  twitter: AtSign, discord: MessageCircle, telegram: Send, blog: Newspaper, newsletter: BookOpen, farcaster: MessageCircle,
};

interface ProjectCardProps {
  project: any;
  onUpdate: () => void;
}

export default function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const [deleting, setDeleting] = useState(false);
  const type = typeConfig[project.project_type] || typeConfig.other;
  const toneLabel = project.tone_setting <= 25 ? "Degen" : project.tone_setting <= 50 ? "Web3 Native" : project.tone_setting <= 75 ? "Professional" : "Institutional";

  const handleDelete = async () => {
    if (!confirm("Delete this project and all its content?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects?id=${project.id}`, { method: "DELETE" });
      if (res.ok) onUpdate();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
    setDeleting(false);
  };

  return (
    <div className="rounded-xl border border-card-border bg-card p-5 hover:border-electric-indigo/30 transition group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${type.color} bg-opacity-20`}>
          <FolderOpen className={`h-4 w-4 ${type.color.split(" ")[0]}`} />
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-1.5 rounded-lg text-gray-600 hover:text-error hover:bg-error/10 transition opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <h3 className="text-sm font-semibold text-white mb-1">{project.name}</h3>
      {project.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{project.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full ${type.color}`}>{type.label}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-card-border/50 text-gray-400">{toneLabel}</span>
      </div>

      {project.platforms?.length > 0 && (
        <div className="flex gap-1.5 mb-3">
          {project.platforms.map((p: string) => {
            const Icon = platformIcons[p];
            return Icon ? <Icon key={p} className="h-3.5 w-3.5 text-gray-500" /> : null;
          })}
        </div>
      )}

      <Link
        href={`/generate?project=${project.id}`}
        className="flex items-center gap-1.5 text-xs text-electric-indigo hover:underline mt-2"
      >
        Generate content
        <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  );
}
