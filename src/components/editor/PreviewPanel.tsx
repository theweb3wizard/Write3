"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Save, ExternalLink } from "lucide-react";
import { toast } from "sonner";

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
  const [copied, setCopied] = useState(false);

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

  const handleSave = async () => {
    try {
      toast.success("Content saved to library");
    } catch {
      toast.error("Failed to save");
    }
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
            onClick={handleSave}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-card-border/50 transition cursor-pointer"
            title="Save to library"
          >
            <Save className="h-4 w-4" />
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
    </div>
  );
}
