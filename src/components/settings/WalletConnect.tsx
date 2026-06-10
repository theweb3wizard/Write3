"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, Wallet } from "lucide-react";

export default function WalletConnect() {
  const { user, fetchProfile } = useUserStore();
  const [wallet, setWallet] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (user?.wallet_address) {
      setWallet(user.wallet_address);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (wallet.trim() && !/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) {
      toast.error("Invalid Ethereum wallet address format.");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          wallet_address: wallet.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      await fetchProfile(user.id);
      toast.success("Wallet address updated!");
    } catch (err: any) {
      console.error("Wallet update error:", err);
      toast.error(err.message || "Failed to update wallet address.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-card-border bg-card/40 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Wallet Connection</h3>
          <p className="text-sm text-gray-400">Add your public Ethereum wallet address for on-chain personalizations.</p>
        </div>
        <Wallet className="h-6 w-6 text-neon-cyan" />
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="settings-wallet" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Ethereum Address
          </label>
          <input
            id="settings-wallet"
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="0x71C...3a9"
            className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-white placeholder-gray-500 font-mono outline-none focus:border-neon-cyan transition duration-200"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving || wallet.trim() === (user?.wallet_address || "")}
            className="flex items-center gap-2 rounded-lg bg-card border border-card-border hover:border-neon-cyan px-4 py-2.5 text-sm font-semibold text-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Wallet"
            )}
          </button>
          
          {user?.wallet_address && (
            <button
              type="button"
              disabled={isSaving}
              onClick={async () => {
                setIsSaving(true);
                try {
                  const { error } = await supabase
                    .from("users")
                    .update({ wallet_address: null, updated_at: new Date().toISOString() })
                    .eq("id", user.id);
                  if (error) throw error;
                  await fetchProfile(user.id);
                  setWallet("");
                  toast.success("Wallet disconnected.");
                } catch (err: any) {
                  toast.error(err.message || "Failed to disconnect wallet.");
                } finally {
                  setIsSaving(false);
                }
              }}
              className="px-4 py-2.5 text-sm font-semibold text-error hover:underline transition cursor-pointer"
            >
              Disconnect
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
