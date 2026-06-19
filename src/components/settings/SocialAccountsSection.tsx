"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { MessageCircle, Check, Loader2 } from "lucide-react";

export default function SocialAccountsSection() {
  const { user } = useUserStore();
  const supabase = createClient();

  const [discordWebhook, setDiscordWebhook] = useState("");
  const [discordConnected, setDiscordConnected] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("user_social_accounts").select("*").eq("user_id", user.id).then(({ data }) => {
      if (!data) return;
      data.forEach((a) => {
        if (a.platform === "discord" && a.is_connected) {
          setDiscordConnected(true);
          setDiscordWebhook(a.discord_webhook_url || "");
        }
      });
    });
  }, [user, supabase]);

  const saveDiscordWebhook = async () => {
    if (!user) return;
    setSaving(true);
    try {
      if (discordWebhook && !discordWebhook.startsWith("https://discord.com/api/webhooks/")) {
        toast.error("Invalid Discord webhook URL");
        return;
      }

      if (discordWebhook) {
        await supabase.from("user_social_accounts").upsert({
          user_id: user.id,
          platform: "discord",
          discord_webhook_url: discordWebhook,
          is_connected: true,
        }, { onConflict: "user_id, platform" });
      } else {
        await supabase.from("user_social_accounts").delete().eq("user_id", user.id).eq("platform", "discord");
      }

      setDiscordConnected(!!discordWebhook);
      toast.success(discordWebhook ? "Discord webhook saved" : "Discord webhook removed");
    } catch (err: any) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  const testDiscordWebhook = async () => {
    if (!discordWebhook) return;
    setTesting(true);
    try {
      const res = await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "Write3 test message — your webhook works!" }),
      });
      if (!res.ok) throw new Error("Webhook test failed");
      toast.success("Discord webhook works!");
    } catch {
      toast.error("Webhook test failed. Check the URL.");
    }
    setTesting(false);
  };

  return (
    <div className="rounded-xl border border-card-border bg-card/40 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Connected Accounts</h3>
        <p className="text-sm text-gray-400">Connect Discord to publish content directly from the editor.</p>
      </div>

      <div className="max-w-md">
        <div className="p-4 rounded-lg border border-card-border bg-card/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-neon-cyan" />
              <span className="text-sm font-medium text-white">Discord</span>
            </div>
            {discordConnected ? (
              <span className="flex items-center gap-1 text-xs text-success">
                <Check className="h-3 w-3" />
                Connected
              </span>
            ) : (
              <span className="text-xs text-gray-500">Not connected</span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={discordWebhook}
              onChange={(e) => setDiscordWebhook(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className="flex-1 bg-deep-space border border-card-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveDiscordWebhook}
              disabled={saving}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan text-xs font-medium border border-neon-cyan/20 hover:bg-neon-cyan/20 transition disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
              Save
            </button>
            {discordWebhook && (
              <button
                onClick={testDiscordWebhook}
                disabled={testing}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-card-border/30 text-gray-400 text-xs font-medium border border-card-border hover:text-white transition disabled:opacity-50 cursor-pointer"
              >
                {testing ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                Test
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
