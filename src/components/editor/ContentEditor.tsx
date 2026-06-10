"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import ConfigPanel from "./ConfigPanel";
import PreviewPanel from "./PreviewPanel";
import TemplateGrid from "@/components/templates/TemplateGrid";

export default function ContentEditor() {
  const [projectId, setProjectId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState(50);
  const [voiceProfileId, setVoiceProfileId] = useState("");
  const [topic, setTopic] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [length, setLength] = useState("medium");
  const [model, setModel] = useState("auto");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCta, setIncludeCta] = useState(true);

  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedBody, setGeneratedBody] = useState("");
  const [generatedMetadata, setGeneratedMetadata] = useState<any>(null);
  const [contentId, setContentId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"template" | "config">("template");

  const handleTemplateSelect = (template: any) => {
    setTemplateId(template.id);
    setPlatform(template.platform);
    setStep("config");
  };

  const handleGenerate = async () => {
    if (!projectId || !templateId || !topic) {
      toast.error("Please fill in project, template, and topic");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedBody("");
    setGeneratedTitle("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          template_id: templateId,
          platform,
          content_type: "announcement",
          tone,
          voice_profile_id: voiceProfileId || null,
          topic,
          key_points: keyPoints,
          length,
          model,
          include_hashtags: includeHashtags,
          include_cta: includeCta,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Generation failed");
      }

      setGeneratedTitle(json.data.title);
      setGeneratedBody(json.data.body);
      setGeneratedMetadata(json.data.metadata);
      setContentId(json.data.id);
      toast.success("Content generated successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {step === "template" ? (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Choose a Template</h2>
          <TemplateGrid
            selectedId={templateId}
            onSelect={handleTemplateSelect}
            platform={platform}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-card-border bg-card p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white">Configuration</h3>
                <button
                  onClick={() => setStep("template")}
                  className="text-xs text-electric-indigo hover:underline cursor-pointer"
                >
                  Change template
                </button>
              </div>

              <ConfigPanel
                projectId={projectId}
                onProjectChange={setProjectId}
                templateId={templateId}
                platform={platform}
                onPlatformChange={setPlatform}
                tone={tone}
                onToneChange={setTone}
                voiceProfileId={voiceProfileId}
                onVoiceProfileChange={setVoiceProfileId}
                topic={topic}
                onTopicChange={setTopic}
                keyPoints={keyPoints}
                onKeyPointsChange={setKeyPoints}
                length={length}
                onLengthChange={setLength}
                model={model}
                onModelChange={setModel}
                advancedOpen={advancedOpen}
                onAdvancedToggle={() => setAdvancedOpen(!advancedOpen)}
                includeHashtags={includeHashtags}
                onIncludeHashtagsChange={setIncludeHashtags}
                includeCta={includeCta}
                onIncludeCtaChange={setIncludeCta}
              />

              <button
                onClick={handleGenerate}
                disabled={loading || !projectId || !topic}
                className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg bg-gradient-premium px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Sparkles className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
                {loading ? "Generating..." : "Generate Content"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <PreviewPanel
              title={generatedTitle}
              body={generatedBody}
              platform={platform}
              metadata={generatedMetadata}
              loading={loading}
              error={error}
              onRegenerate={handleGenerate}
              contentId={contentId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
