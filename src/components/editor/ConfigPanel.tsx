"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";

interface ConfigPanelProps {
  projectId: string;
  onProjectChange: (id: string) => void;
  platform: string;
  onPlatformChange: (p: string) => void;
  tone: string;
  onToneChange: (t: string) => void;
  voiceProfileId: string;
  onVoiceProfileChange: (id: string) => void;
  topic: string;
  onTopicChange: (t: string) => void;
  keyPoints: string[];
  onKeyPointsChange: (kp: string[]) => void;
}

const platforms = [
  { value: "twitter", label: "Twitter/X" },
  { value: "discord", label: "Discord" },
  { value: "telegram", label: "Telegram" },
  { value: "reddit", label: "Reddit" },
  { value: "blog", label: "Blog" },
  { value: "newsletter", label: "Newsletter" },
];

export default function ConfigPanel({
  projectId, onProjectChange, platform, onPlatformChange,
  tone, onToneChange, voiceProfileId, onVoiceProfileChange,
  topic, onTopicChange, keyPoints, onKeyPointsChange,
}: ConfigPanelProps) {
  const { user } = useUserStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [voiceProfiles, setVoiceProfiles] = useState<any[]>([]);
  const [keyPointInput, setKeyPointInput] = useState("");

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase.from("projects").select("id, name").eq("user_id", user.id).order("updated_at", { ascending: false })
      .then(({ data }) => setProjects(data || []));
  }, [user]);

  useEffect(() => {
    if (!projectId) return;
    const supabase = createClient();
    supabase.from("voice_profiles").select("id, name").eq("project_id", projectId).eq("is_active", true)
      .then(({ data }) => setVoiceProfiles(data || []));
  }, [projectId]);

  const addKeyPoint = () => {
    if (keyPointInput.trim() && keyPoints.length < 10) {
      onKeyPointsChange([...keyPoints, keyPointInput.trim()]);
      setKeyPointInput("");
    }
  };

  const removeKeyPoint = (index: number) => {
    onKeyPointsChange(keyPoints.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Project</label>
        <select
          value={projectId}
          onChange={(e) => onProjectChange(e.target.value)}
          className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
        >
          <option value="">Select project...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Platform</label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((p) => (
            <button
              key={p.value}
              onClick={() => onPlatformChange(p.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition cursor-pointer ${
                platform === p.value
                  ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                  : "border-card-border text-gray-500 hover:text-white hover:border-gray-500/30"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Tone</label>
        <div className="flex gap-2">
          {["degen", "professional", "educational"].map((t) => (
            <button
              key={t}
              onClick={() => onToneChange(t)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border capitalize transition cursor-pointer ${
                tone === t
                  ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                  : "border-card-border text-gray-500 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Style Profile</label>
        <select
          value={voiceProfileId}
          onChange={(e) => onVoiceProfileChange(e.target.value)}
          className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
        >
          <option value="">Default voice</option>
          {voiceProfiles.map((vp) => (
            <option key={vp.id} value={vp.id}>{vp.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g., Product launch announcement"
          className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Key Points</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keyPointInput}
            onChange={(e) => setKeyPointInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addKeyPoint(); } }}
            placeholder="Add a key point..."
            className="flex-1 bg-deep-space border border-card-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition"
          />
          <button
            onClick={addKeyPoint}
            disabled={!keyPointInput.trim() || keyPoints.length >= 10}
            className="px-3 py-2 rounded-lg bg-electric-indigo/10 text-electric-indigo text-sm font-medium border border-electric-indigo/20 hover:bg-electric-indigo/20 transition disabled:opacity-50 cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="space-y-1.5">
          {keyPoints.map((kp, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card-border/30">
              <span className="text-xs font-mono text-gray-500">{i + 1}</span>
              <span className="flex-1 text-sm text-gray-300 truncate">{kp}</span>
              <button
                onClick={() => removeKeyPoint(i)}
                className="text-xs text-error hover:text-red-400 transition cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
