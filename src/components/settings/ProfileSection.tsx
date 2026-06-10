"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";

export default function ProfileSection() {
  const { user, fetchProfile } = useUserStore();
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters.");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          username: username.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      
      await fetchProfile(user.id);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-card-border bg-card/40 p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Profile Information</h3>
        <p className="text-sm text-gray-400">Update your account display name and settings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full rounded-lg border border-card-border bg-card/20 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Contact support to change your account email.</p>
        </div>

        <div>
          <label htmlFor="settings-username" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Username
          </label>
          <div className="relative">
            <input
              id="settings-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="degen_builder"
              className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-electric-indigo transition duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving || username.trim() === user?.username}
          className="flex items-center gap-2 rounded-lg bg-electric-indigo px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}
