"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface VoiceProfile {
  id: string;
  name: string;
  characteristics: {
    tone?: string;
    vocabulary?: string;
    sentence_length?: string;
    emoji_usage?: string;
    technical_depth?: string;
    writing_patterns?: string;
    system_prompt?: string;
  };
  is_active: boolean;
  created_at: string;
}

export default function VoiceProfileCard({ projectId }: { projectId?: string }) {
  const [profiles, setProfiles] = useState<VoiceProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    setLoading(true);
    supabase
      .from("voice_profiles")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!cancelled && data) setProfiles(data);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [projectId, supabase]);

  if (loading) {
    return (
      <div className="rounded-xl border border-card-border bg-card/40 p-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading voice profiles...
        </div>
      </div>
    );
  }

  if (profiles.length === 0) return null;

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <div key={profile.id} className="rounded-xl border border-card-border bg-card/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-neon-cyan" />
              <h4 className="text-sm font-semibold text-white">{profile.name}</h4>
            </div>
            {profile.is_active && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success/10 text-success text-xs">Active</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {profile.characteristics?.tone && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Tone</span>
                <p className="text-xs text-gray-300">{profile.characteristics.tone}</p>
              </div>
            )}
            {profile.characteristics?.vocabulary && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Vocabulary</span>
                <p className="text-xs text-gray-300">{profile.characteristics.vocabulary}</p>
              </div>
            )}
            {profile.characteristics?.technical_depth && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Technical Depth</span>
                <p className="text-xs text-gray-300">{profile.characteristics.technical_depth}</p>
              </div>
            )}
            {profile.characteristics?.emoji_usage && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Emoji Usage</span>
                <p className="text-xs text-gray-300">{profile.characteristics.emoji_usage}</p>
              </div>
            )}
            {profile.characteristics?.writing_patterns && (
              <div className="col-span-2 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Writing Patterns</span>
                <p className="text-xs text-gray-300">{profile.characteristics.writing_patterns}</p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-600">
            Created {new Date(profile.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
