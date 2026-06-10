"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { useSubscription } from "@/hooks/useSubscription";
import { getModelsForTier, type AIModel } from "@/lib/ai/models";
import { Settings2, ChevronDown, Sparkles } from "lucide-react";

interface ConfigPanelProps {
  projectId: string;
  onProjectChange: (id: string) => void;
  templateId: string;
  platform: string;
  onPlatformChange: (p: string) => void;
  contentType: string;
  onContentTypeChange: (t: string) => void;
  tone: number;
  onToneChange: (t: number) => void;
  voiceProfileId: string;
  onVoiceProfileChange: (id: string) => void;
  topic: string;
  onTopicChange: (t: string) => void;
  keyPoints: string[];
  onKeyPointsChange: (kp: string[]) => void;
  length: string;
  onLengthChange: (l: string) => void;
  model: string;
  onModelChange: (m: string) => void;
  advancedOpen: boolean;
  onAdvancedToggle: () => void;
  includeHashtags: boolean;
  onIncludeHashtagsChange: (v: boolean) => void;
  includeCta: boolean;
  onIncludeCtaChange: (v: boolean) => void;
}

const contentTypes = [
  { value: "announcement", label: "Announcement" },
  { value: "thread", label: "Thread" },
  { value: "update", label: "Update" },
  { value: "educational", label: "Educational" },
  { value: "promotional", label: "Promotional" },
  { value: "governance", label: "Governance" },
];

const platforms = [
  { value: "twitter", label: "Twitter/X" },
  { value: "discord", label: "Discord" },
  { value: "telegram", label: "Telegram" },
  { value: "blog", label: "Blog" },
  { value: "newsletter", label: "Newsletter" },
  { value: "farcaster", label: "Farcaster" },
];

export default function ConfigPanel({
  projectId, onProjectChange, templateId, platform, onPlatformChange,
  contentType, onContentTypeChange,
  tone, onToneChange, voiceProfileId, onVoiceProfileChange,
  topic, onTopicChange, keyPoints, onKeyPointsChange,
  length, onLengthChange, model, onModelChange,
  advancedOpen, onAdvancedToggle, includeHashtags, onIncludeHashtagsChange, includeCta, onIncludeCtaChange,
}: ConfigPanelProps) {
  const { user } = useUserStore();
  const { tier } = useSubscription();
  const [projects, setProjects] = useState<any[]>([]);
  const [voiceProfiles, setVoiceProfiles] = useState<any[]>([]);
  const [keyPointInput, setKeyPointInput] = useState("");

  const availableModels = getModelsForTier(tier);

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
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Content Type</label>
        <div className="grid grid-cols-3 gap-2">
          {contentTypes.map((ct) => (
            <button
              key={ct.value}
              onClick={() => onContentTypeChange(ct.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition cursor-pointer ${
                contentType === ct.value
                  ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                  : "border-card-border text-gray-500 hover:text-white hover:border-gray-500/30"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>
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
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">
          Tone: <span className="text-white font-semibold">
            {tone <= 25 ? "Degen 🔥" : tone <= 50 ? "Web3 Native" : tone <= 75 ? "Professional" : "Institutional 🏦"}
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={tone}
          onChange={(e) => onToneChange(parseInt(e.target.value))}
          className="w-full accent-electric-indigo"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Degen</span>
          <span>Institutional</span>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Voice Profile</label>
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

      <button
        onClick={onAdvancedToggle}
        className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-white transition cursor-pointer"
      >
        <Settings2 className="h-3.5 w-3.5" />
        Advanced Settings
        <ChevronDown className={`h-3 w-3 transition ${advancedOpen ? "rotate-180" : ""}`} />
      </button>

      {advancedOpen && (
        <div className="space-y-4 pl-3 border-l border-card-border">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Length</label>
            <div className="flex gap-2">
              {["short", "medium", "long"].map((l) => (
                <button
                  key={l}
                  onClick={() => onLengthChange(l)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border capitalize transition cursor-pointer ${
                    length === l
                      ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                      : "border-card-border text-gray-500 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Model</label>
            <select
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
            >
              <option value="auto">Auto (recommended)</option>
              {availableModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.provider} — {m.name}
                </option>
              ))}
            </select>
            {model !== "auto" && availableModels.length > 0 && (
              <p className="text-xs text-gray-600 mt-1.5">
                {(() => {
                  const selected = availableModels.find(m => m.id === model);
                  return selected?.description || "";
                })()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => onIncludeHashtagsChange(e.target.checked)}
                className="accent-electric-indigo"
              />
              <span className="text-sm text-gray-400">Hashtags</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCta}
                onChange={(e) => onIncludeCtaChange(e.target.checked)}
                className="accent-electric-indigo"
              />
              <span className="text-sm text-gray-400">Call-to-action</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
