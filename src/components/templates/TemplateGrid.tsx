"use client";

import { useState, useEffect } from "react";
import TemplateCard from "./TemplateCard";

interface TemplateGridProps {
  selectedId?: string;
  onSelect: (template: any) => void;
  platform?: string;
}

export default function TemplateGrid({ selectedId, onSelect, platform }: TemplateGridProps) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (platform) params.set("platform", platform);
      if (category) params.set("category", category);

      try {
        const res = await fetch(`/api/templates?${params}`);
        const json = await res.json();
        if (json.success) setTemplates(json.data);
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, [platform, category]);

  const categories = ["General", "DeFi", "NFT", "DAO", "Educational"];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setCategory("")}
          className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer ${
            !category ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20" : "border-card-border text-gray-500 hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(category === cat ? "" : cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer ${
              category === cat ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20" : "border-card-border text-gray-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-xl border border-card-border bg-card p-4 animate-pulse">
              <div className="h-4 w-16 bg-card-border rounded mb-3" />
              <div className="h-4 w-32 bg-card-border rounded mb-2" />
              <div className="h-8 w-full bg-card-border rounded" />
            </div>
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500">
          No templates found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              selected={selectedId === template.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
