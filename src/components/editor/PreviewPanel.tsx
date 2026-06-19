"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, ExternalLink, MessageCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { checkCompliance } from "@/lib/ai/compliance";

interface PreviewPanelProps {
  title: string;
  body: string;
  platform: string;
  metadata?: {
    hashtags?: string[];
    mentions?: string[];
    thread_count?: number;
  };
  loading: boolean;
  error: string | null;
  onRegenerate: () => void;
  contentId?: string;
}

export default function PreviewPanel({
  title, body, platform, metadata, loading, error, onRegenerate, contentId,
}: PreviewPanelProps) {
  const { user } = useUserStore();
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false);

  const complianceWarnings = body ? checkCompliance(`${title} ${body}`) : null;

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase.from("user_social_accounts").select("platform, is_connected").eq("user_id", user.id).then(({ data }) => {
      if (!data) return;
      data.forEach((a) => {
        if (a.platform === "discord") setDiscordConnected(a.is_connected);
      });
    });
  }, [user]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handlePublishDiscord = async () => {
    if (!contentId) return;
    setPublishing(true);
    try {
      const res = await fetch("/api/publish/discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content_id: contentId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success("Posted to Discord!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setPublishing(false);
  };

  const formatBody = (text: string, plat: string) => {
    if (plat === "twitter") {
      const tweets = text.split(/\n\n+/);
      return tweets.map((tweet, i) => (
        <div key={i} className="mb-3 p-3 rounded-lg bg-deep-space/50 border border-card-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-full bg-electric-indigo/20 flex items-center justify-center text-[10px] font-bold text-electric-indigo">
              NC
            </div>
            <span className="text-xs text-gray-500 font-medium">@{title.toLowerCase().replace(/\s+/g, "").slice(0, 15) || "write3"}</span>
            <span className="text-xs text-gray-600">· Thread</span>
          </div>
          <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{tweet.trim()}</p>
        </div>
      ));
    }

    if (plat === "discord") {
      return (
        <div className="bg-[#2b2d31] rounded-lg p-4 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
          {text}
        </div>
      );
    }

    return (
      <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
        {text}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-card-border bg-card p-6">
        <div className="space-y-4">
          <div className="h-5 w-48 bg-card-border rounded animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-card-border rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-electric-indigo">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generating content...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-error/20 bg-error/5 p-6 text-center">
        <p className="text-sm text-error font-medium mb-2">Generation failed</p>
        <p className="text-xs text-gray-400 mb-4">{error}</p>
        <button
          onClick={onRegenerate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-error/10 text-error text-sm font-medium border border-error/20 hover:bg-error/20 transition cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try Again
        </button>
      </div>
    );
  }

  if (!body) {
    return (
      <div className="rounded-xl border border-card-border bg-card p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-16 w-16 rounded-full bg-card-border/30 flex items-center justify-center mb-4">
          <ExternalLink className="h-6 w-6 text-gray-500" />
        </div>
        <p className="text-sm text-gray-500 font-medium">Your content will appear here</p>
        <p className="text-xs text-gray-600 mt-1">Configure and generate to see a preview</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-card-border bg-card">
      <div className="p-4 border-b border-card-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{title || "Generated Content"}</h3>
          {metadata?.thread_count && metadata.thread_count > 1 && (
            <span className="text-xs text-gray-500">{metadata.thread_count} tweets in thread</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-card-border/50 transition cursor-pointer"
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={onRegenerate}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-card-border/50 transition cursor-pointer"
            title="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {formatBody(body, platform)}
      </div>

      {metadata && (metadata.hashtags?.length || metadata.mentions?.length) && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {metadata.hashtags?.map((tag) => (
            <span key={tag} className="text-xs text-info">#{tag}</span>
          ))}
          {metadata.mentions?.map((mention) => (
            <span key={mention} className="text-xs text-neon-cyan">{mention}</span>
          ))}
        </div>
      )}

      {complianceWarnings && !complianceWarnings.safe && (
        <div className="mx-4 mb-4 p-3 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-warning mb-1">Compliance Warnings</p>
              <ul className="text-xs text-gray-400 space-y-0.5">
                {complianceWarnings.warnings.map((w, i) => (
                  <li key={i}>- &quot;{w}&quot; detected in content</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pb-4 flex gap-2 border-t border-card-border pt-4">
        <button
          onClick={handlePublishDiscord}
          disabled={!discordConnected || !contentId || publishing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/20"
          title={!discordConnected ? "Set up Discord webhook in Settings" : "Post to Discord"}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {publishing ? "Posting..." : "Post to Discord"}
        </button>
      </div>
    </div>
  );
}
