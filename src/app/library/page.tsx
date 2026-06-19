"use client";

import { useState, useEffect, useCallback } from "react";
import AppShell from "@/components/layout/AppShell";
import { Search, Grid3X3, List, AtSign, MessageCircle, Send, Newspaper, BookOpen, Copy, Check, Trash2, FileText, RefreshCw, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const platformIcons: Record<string, any> = {
  twitter: AtSign, discord: MessageCircle, telegram: Send, reddit: MessageCircle,
  blog: Newspaper, newsletter: BookOpen, farcaster: MessageCircle,
};

const platformColors: Record<string, string> = {
  twitter: "text-info", discord: "text-electric-indigo", telegram: "text-info",
  reddit: "text-orange-400", blog: "text-warning", newsletter: "text-success",
  farcaster: "text-neon-cyan",
};

export default function LibraryPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [remixing, setRemixing] = useState<string | null>(null);

  const refetch = useCallback(() => setRefreshKey(k => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString(), sort });
    if (platform) params.set("platform", platform);
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);

    fetch(`/api/content?${params}`)
      .then(res => res.json())
      .then(json => {
        if (cancelled) return;
        if (json.success) {
          setContent(json.data);
          setTotalPages(json.pagination?.totalPages || 1);
          setTotalItems(json.pagination?.total || 0);
        }
      })
      .catch(err => console.error("Failed to fetch content:", err))
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [page, sort, platform, statusFilter, search, refreshKey]);

  const handleCopy = async (id: string, body: string) => {
    try {
      await navigator.clipboard.writeText(body);
      setCopiedId(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this content piece?")) return;
    try {
      const res = await fetch(`/api/content?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Content deleted");
        if (selectedItem?.id === id) setSelectedItem(null);
        refetch();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Status updated to ${status}`);
        refetch();
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleRemix = async (id: string) => {
    setRemixing(id);
    try {
      const res = await fetch(`/api/content?action=clone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success("Content duplicated as draft. Edit it now.");
        refetch();
      }
    } catch {
      toast.error("Failed to remix");
    } finally {
      setRemixing(null);
    }
  };

  const truncateBody = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  return (
    <AppShell>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Content Library</h1>
            <p className="text-sm text-gray-500 mt-1">
              {totalItems > 0
                ? `${totalItems} piece${totalItems !== 1 ? "s" : ""} of content`
                : "Browse, search, and manage all your generated content"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg border transition cursor-pointer ${view === "grid" ? "bg-electric-indigo/10 border-electric-indigo/20 text-electric-indigo" : "border-card-border text-gray-500 hover:text-white"}`}
              title="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg border transition cursor-pointer ${view === "list" ? "bg-electric-indigo/10 border-electric-indigo/20 text-electric-indigo" : "border-card-border text-gray-500 hover:text-white"}`}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search content..."
              className="w-full bg-deep-space border border-card-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition"
            />
          </div>
          <select
            value={platform}
            onChange={(e) => { setPlatform(e.target.value); setPage(1); }}
            className="bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
          >
            <option value="">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="discord">Discord</option>
            <option value="telegram">Telegram</option>
            <option value="reddit">Reddit</option>
            <option value="blog">Blog</option>
            <option value="newsletter">Newsletter</option>
            <option value="farcaster">Farcaster</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-electric-indigo/50 transition cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {loading ? (
          <div className={`grid ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-xl border border-card-border bg-card p-4 animate-pulse">
                <div className="h-4 w-24 bg-card-border rounded mb-3" />
                <div className="h-4 w-full bg-card-border rounded mb-2" />
                <div className="h-8 w-3/4 bg-card-border rounded" />
              </div>
            ))}
          </div>
        ) : content.length === 0 ? (
          <div className="rounded-xl border border-card-border bg-card p-12 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">No content found</h3>
            <p className="text-sm text-gray-500">
              {search || platform || statusFilter ? "Try different filters or search terms." : "Generate your first piece of content to see it here."}
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.map((item) => {
              const Icon = platformIcons[item.platform] || FileText;
              const color = platformColors[item.platform] || "text-gray-400";
              return (
                <div key={item.id} className="rounded-xl border border-card-border bg-card p-4 hover:border-electric-indigo/30 transition group">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-1.5 rounded-lg bg-card-border/30 ${color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      item.status === "published" ? "bg-success/10 text-success" :
                      item.status === "scheduled" ? "bg-warning/10 text-warning" :
                      item.status === "archived" ? "bg-gray-500/10 text-gray-400" :
                      "bg-gray-500/10 text-gray-400"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <button onClick={() => setSelectedItem(item)} className="w-full text-left">
                    <h4 className="text-sm font-semibold text-white mb-1 truncate hover:text-electric-indigo transition-colors">{item.title || "Untitled"}</h4>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{truncateBody(item.body, 150)}</p>
                  </button>
                  <div className="flex items-center justify-between pt-3 border-t border-card-border">
                    <span className="text-xs text-gray-600">{new Date(item.created_at).toLocaleDateString()}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => handleCopy(item.id, item.body)} className="p-1 rounded text-gray-500 hover:text-white cursor-pointer" title="Copy">
                        {copiedId === item.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => handleRemix(item.id)}
                        disabled={remixing === item.id}
                        className="p-1 rounded text-gray-500 hover:text-neon-cyan cursor-pointer disabled:opacity-50"
                        title="Duplicate as draft"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${remixing === item.id ? "animate-spin" : ""}`} />
                      </button>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="text-[10px] bg-transparent border-none text-gray-500 cursor-pointer focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button onClick={() => handleDelete(item.id)} className="p-1 rounded text-gray-500 hover:text-error cursor-pointer" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {content.map((item) => {
              const Icon = platformIcons[item.platform] || FileText;
              const color = platformColors[item.platform] || "text-gray-400";
              return (
                <div key={item.id} className="rounded-xl border border-card-border bg-card p-4 flex items-center gap-4 hover:border-electric-indigo/30 transition group">
                  <div className={`p-2 rounded-lg ${color} bg-card-border/30`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <button onClick={() => setSelectedItem(item)} className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-white truncate hover:text-electric-indigo transition-colors">{item.title || "Untitled"}</p>
                    <p className="text-xs text-gray-500 truncate">{truncateBody(item.body, 200)}</p>
                  </button>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize hidden sm:inline ${
                    item.status === "published" ? "bg-success/10 text-success" :
                    item.status === "scheduled" ? "bg-warning/10 text-warning" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-600 hidden md:inline">{new Date(item.created_at).toLocaleDateString()}</span>
                  <div className="flex gap-1">
                    <button onClick={() => handleCopy(item.id, item.body)} className="p-1.5 rounded text-gray-500 hover:text-white hover:bg-card-border/30 transition cursor-pointer">
                      {copiedId === item.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleRemix(item.id)}
                      disabled={remixing === item.id}
                      className="p-1.5 rounded text-gray-500 hover:text-neon-cyan hover:bg-card-border/30 transition cursor-pointer disabled:opacity-50"
                      title="Duplicate as draft"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${remixing === item.id ? "animate-spin" : ""}`} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded text-gray-500 hover:text-error hover:bg-error/10 transition cursor-pointer">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-sm border border-card-border text-gray-500 hover:text-white disabled:opacity-50 transition cursor-pointer"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition cursor-pointer ${
                    p === page
                      ? "bg-electric-indigo/10 border-electric-indigo/20 text-electric-indigo"
                      : "border-card-border text-gray-500 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm border border-card-border text-gray-500 hover:text-white disabled:opacity-50 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="max-w-2xl w-full rounded-xl border border-card-border bg-card p-6 space-y-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                  selectedItem.status === "published" ? "bg-success/10 text-success" :
                  selectedItem.status === "scheduled" ? "bg-warning/10 text-warning" :
                  "bg-gray-500/10 text-gray-400"
                }`}>{selectedItem.status}</span>
                <span className="text-xs text-gray-500">{selectedItem.platform}</span>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-1 rounded text-gray-500 hover:text-white cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-lg font-semibold text-white">{selectedItem.title || "Untitled"}</h2>
            <div className="rounded-lg bg-deep-space border border-card-border p-4">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{selectedItem.body}</pre>
            </div>
            {selectedItem.metadata?.hashtags?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedItem.metadata.hashtags.map((tag: string) => (
                  <span key={tag} className="text-xs text-info">{tag}</span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between pt-3 border-t border-card-border">
              <div className="text-xs text-gray-500 space-y-0.5">
                <p>Model: {selectedItem.ai_model_used}</p>
                <p>Tokens: {selectedItem.tokens_used}</p>
                <p>{new Date(selectedItem.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(selectedItem.id, selectedItem.body)} className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-gray-300 hover:text-white cursor-pointer transition">
                  {copiedId === selectedItem.id ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                  Copy
                </button>
                <button onClick={() => { handleRemix(selectedItem.id); setSelectedItem(null); }} className="flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-gray-300 hover:text-neon-cyan cursor-pointer transition">
                  <RefreshCw className="h-3 w-3" />
                  Remix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
