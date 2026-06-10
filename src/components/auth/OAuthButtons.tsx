"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const supabase = createClient();

  const handleOAuthLogin = async (provider: "github" | "google") => {
    setIsLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("OAuth error:", error);
      setIsLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* GitHub Button */}
      <button
        type="button"
        onClick={() => handleOAuthLogin("github")}
        disabled={isLoading !== null}
        className="flex items-center justify-center gap-2 rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm font-medium text-white hover:bg-deep-space transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        {isLoading === "github" ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
          </svg>
        )}
        GitHub
      </button>

      {/* Google Button */}
      <button
        type="button"
        onClick={() => handleOAuthLogin("google")}
        disabled={isLoading !== null}
        className="flex items-center justify-center gap-2 rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm font-medium text-white hover:bg-deep-space transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        {isLoading === "google" ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.435 0-6.223-2.77-6.223-6.19 0-3.42 2.788-6.19 6.223-6.19 1.503 0 2.88.536 3.96 1.42l3.064-3.04C18.892 2.22 15.772 1 12.24 1 5.86 1 .7 6.136.7 12.5s5.16 11.5 11.54 11.5c6.545 0 11.66-4.564 11.66-11.5 0-.756-.09-1.486-.25-2.215H12.24z" />
          </svg>
        )}
        Google
      </button>
    </div>
  );
}
