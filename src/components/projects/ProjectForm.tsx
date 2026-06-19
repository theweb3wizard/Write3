"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProjectFormProps {
  onClose: () => void;
  onCreated: () => void;
}

const projectTypes = [
  { value: "defi", label: "DeFi Protocol" },
  { value: "nft", label: "NFT Collection" },
  { value: "dao", label: "DAO" },
  { value: "infrastructure", label: "L1/L2 Infrastructure" },
  { value: "gamefi", label: "GameFi" },
  { value: "other", label: "Other" },
];

const platformOptions = [
  { value: "twitter", label: "Twitter/X" },
  { value: "discord", label: "Discord" },
  { value: "telegram", label: "Telegram" },
  { value: "reddit", label: "Reddit" },
  { value: "blog", label: "Blog" },
  { value: "newsletter", label: "Newsletter" },
  { value: "farcaster", label: "Farcaster" },
];

export default function ProjectForm({ onClose, onCreated }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("defi");
  const [toneSetting, setToneSetting] = useState(50);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.length < 3) {
      toast.error("Project name must be at least 3 characters");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), project_type: projectType, tone_setting: toneSetting, platforms }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create project");

      toast.success("Project created");
      onCreated();
    } catch (err: any) {
      toast.error(err.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-card-border bg-card">
        <div className="flex items-center justify-between p-5 border-b border-card-border">
          <h3 className="text-lg font-semibold text-white">New Project</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-card-border/50 transition cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="DeFi Alpha"
              className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition"
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A yield optimization protocol on Base..."
              rows={3}
              className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition resize-none"
              maxLength={1000}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Project Type</label>
            <div className="grid grid-cols-2 gap-2">
              {projectTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setProjectType(type.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition cursor-pointer ${
                    projectType === type.value
                      ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                      : "border-card-border text-gray-500 hover:text-white"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Tone: <span className="text-white font-semibold">
                {toneSetting <= 25 ? "Degen 🔥" : toneSetting <= 50 ? "Web3 Native" : toneSetting <= 75 ? "Professional" : "Institutional 🏦"}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={toneSetting}
              onChange={(e) => setToneSetting(parseInt(e.target.value))}
              className="w-full accent-electric-indigo"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Degen</span>
              <span>Institutional</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => togglePlatform(p.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                    platforms.includes(p.value)
                      ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                      : "border-card-border text-gray-500 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Creating..." : "Create Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-white border border-card-border hover:bg-card-border/30 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
