"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import { Brain, Upload, Sparkles, Loader2, Trash2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";

export default function VoiceTrainingPage() {
  const { user } = useUserStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [trainingData, setTrainingData] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase.from("projects").select("id, name").eq("user_id", user.id).order("updated_at", { ascending: false })
      .then(({ data }) => setProjects(data || []));
  }, [user]);

  useEffect(() => {
    if (!selectedProject) return;
    const fetchProfiles = async () => {
      const res = await fetch(`/api/voice-profile?project_id=${selectedProject}`);
      const json = await res.json();
      if (json.success) setProfiles(json.data);
    };
    fetchProfiles();
  }, [selectedProject]);

  const handleAnalyze = async () => {
    if (!selectedProject || !name.trim() || !trainingData.trim()) {
      toast.error("Please fill in all fields (min 50 characters for training data)");
      return;
    }
    setAnalyzing(true);
    setResults(null);

    try {
      const res = await fetch("/api/voice-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: selectedProject, name: name.trim(), training_data: trainingData }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Analysis failed");

      setResults(json.data);
      toast.success("Voice profile created");

      const refreshRes = await fetch(`/api/voice-profile?project_id=${selectedProject}`);
      const refreshJson = await refreshRes.json();
      if (refreshJson.success) setProfiles(refreshJson.data);
    } catch (err: any) {
      toast.error(err.message);
    }
    setAnalyzing(false);
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm("Delete this voice profile?")) return;
    try {
      const res = await fetch(`/api/voice-profile?id=${profileId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Voice profile deleted");
        setProfiles(prev => prev.filter(p => p.id !== profileId));
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <AppShell>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon-cyan/10">
            <Brain className="h-5 w-5 text-neon-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Voice Training</h1>
            <p className="text-sm text-gray-500">Train AI to write in your project's unique voice</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            <div className="rounded-xl border border-card-border bg-card p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Create Voice Profile</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
                  >
                    <option value="">Select project...</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Voice Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., DeFi Alpha Voice"
                    className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                    Training Data
                    <span className="text-gray-600 font-normal ml-1">(paste Twitter threads, Discord messages, or blog posts)</span>
                  </label>
                  <textarea
                    value={trainingData}
                    onChange={(e) => setTrainingData(e.target.value)}
                    placeholder="Paste your project's past content here. The more examples, the better the voice analysis..."
                    rows={8}
                    className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">{trainingData.length} characters (min 50)</p>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || !selectedProject || !name.trim() || trainingData.length < 50}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  {analyzing ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing Voice...</>
                  ) : (
                    <><Brain className="h-4 w-4" /> Analyze Voice</>
                  )}
                </button>
              </div>
            </div>

            {results && (
              <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-4 w-4 text-success" />
                  <h3 className="text-sm font-semibold text-white">Voice Profile Created</h3>
                </div>

                <div className="space-y-3">
                  {results.characteristics?.tone && (
                    <div>
                      <span className="text-xs text-gray-500">Tone</span>
                      <p className="text-sm text-white">{results.characteristics.tone}</p>
                    </div>
                  )}
                  {results.characteristics?.vocabulary && (
                    <div>
                      <span className="text-xs text-gray-500">Vocabulary</span>
                      <p className="text-sm text-white">{results.characteristics.vocabulary}</p>
                    </div>
                  )}
                  {results.characteristics?.sentence_length && (
                    <div>
                      <span className="text-xs text-gray-500">Sentence Length</span>
                      <p className="text-sm text-white">{results.characteristics.sentence_length}</p>
                    </div>
                  )}
                  {results.characteristics?.emoji_usage && (
                    <div>
                      <span className="text-xs text-gray-500">Emoji Usage</span>
                      <p className="text-sm text-white">{results.characteristics.emoji_usage}</p>
                    </div>
                  )}
                  {results.characteristics?.technical_depth && (
                    <div>
                      <span className="text-xs text-gray-500">Technical Depth</span>
                      <p className="text-sm text-white">{results.characteristics.technical_depth}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-card-border bg-card p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Saved Profiles</h3>
              {profiles.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No voice profiles yet</p>
                  <p className="text-xs text-gray-600 mt-1">Train your first voice to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="rounded-lg border border-card-border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{profile.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(profile.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-1 rounded text-gray-500 hover:text-error transition cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {profile.characteristics?.tone && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          Tone: {profile.characteristics.tone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
