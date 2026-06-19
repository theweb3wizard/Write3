"use client";

import ProfileSection from "@/components/settings/ProfileSection";
import SubscriptionSection from "@/components/settings/SubscriptionSection";
import SocialAccountsSection from "@/components/settings/SocialAccountsSection";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useUserStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to delete account");
      }

      await logout();
      toast.success("Account deleted successfully.");
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Delete account error:", err);
      toast.error(err.message || "An error occurred during account deletion.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-space font-sans pb-16">
      {/* Header */}
      <header className="border-b border-card-border bg-card/20 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-card/40 transition cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Logo size="sm" showText={false} />
            <span className="font-bold text-white">Settings</span>
          </div>
          
          <div className="text-xs text-gray-400 font-mono">
            {user?.email}
          </div>
        </div>
      </header>

      {/* Main settings body */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        <ProfileSection />
        
        <SocialAccountsSection />
        
        <SubscriptionSection />

        {/* Danger Zone */}
        <div className="rounded-xl border border-error/20 bg-error/5 p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-error">Danger Zone</h3>
            <p className="text-sm text-gray-400">Irreversibly delete your account and all generated content.</p>
          </div>

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 rounded-lg bg-error/10 hover:bg-error/20 border border-error/20 px-4 py-2.5 text-sm font-semibold text-error transition duration-200 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          ) : (
            <div className="p-4 rounded-lg bg-error/10 border border-error/20 space-y-3 max-w-md">
              <p className="text-sm text-white font-medium">Are you absolutely sure?</p>
              <p className="text-xs text-gray-400">This action cannot be undone. All your projects, generated content, and settings will be permanently lost.</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex items-center gap-2 rounded-lg bg-error px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
