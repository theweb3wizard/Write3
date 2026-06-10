"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google OAuth error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm font-medium text-white hover:bg-deep-space transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.435 0-6.223-2.77-6.223-6.19 0-3.42 2.788-6.19 6.223-6.19 1.503 0 2.88.536 3.96 1.42l3.064-3.04C18.892 2.22 15.772 1 12.24 1 5.86 1 .7 6.136.7 12.5s5.16 11.5 11.54 11.5c6.545 0 11.66-4.564 11.66-11.5 0-.756-.09-1.486-.25-2.215H12.24z" />
          </svg>
        )}
        Continue with Google
      </button>
    </div>
  );
}
