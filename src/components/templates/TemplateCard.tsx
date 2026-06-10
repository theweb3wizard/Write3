"use client";

import { Sparkles, Lock } from "lucide-react";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    platform: string;
    category: string;
    is_premium: boolean;
  };
  selected?: boolean;
  onSelect: (template: any) => void;
}

const platformColors: Record<string, string> = {
  twitter: "bg-info/10 text-info border-info/20",
  discord: "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20",
  telegram: "bg-info/10 text-info border-info/20",
  blog: "bg-warning/10 text-warning border-warning/20",
  newsletter: "bg-success/10 text-success border-success/20",
  farcaster: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
};

export default function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={() => onSelect(template)}
      className={`text-left w-full rounded-xl border p-4 transition duration-150 cursor-pointer ${
        selected
          ? "border-electric-indigo/50 bg-electric-indigo/5"
          : "border-card-border bg-card hover:border-electric-indigo/30 hover:bg-card/80"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${platformColors[template.platform] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
          {template.platform}
        </span>
        {template.is_premium && (
          <Lock className="h-3.5 w-3.5 text-warning" />
        )}
      </div>

      <h4 className="text-sm font-semibold text-white mb-1">{template.name}</h4>
      <p className="text-xs text-gray-500 line-clamp-2">{template.description}</p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-card-border">
        <span className="text-xs text-gray-500">{template.category}</span>
        {!template.is_premium && (
          <Sparkles className="h-3 w-3 text-electric-indigo" />
        )}
      </div>
    </button>
  );
}
