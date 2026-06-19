"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, MessageCircle } from "lucide-react";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        
        router.push(redirectTo);
        router.refresh();
      } else {
        if (!username || username.trim().length < 3) {
          throw new Error("Username must be at least 3 characters long.");
        }
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
            data: {
              user_name: username.trim(),
            },
          },
        });
        
        if (signUpError) throw signUpError;
        
        // Check if user session was automatically established
        if (data.session) {
          router.push(redirectTo);
          router.refresh();
        } else {
          setSuccess("Registration successful! Please check your email to verify your account.");
          // Clear inputs
          setEmail("");
          setPassword("");
          setUsername("");
        }
      }
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "discord") => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (oauthError) throw oauthError;
    } catch (err: any) {
      setError(err.message || "OAuth sign-in failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <button
          disabled
          className="flex items-center justify-center gap-2 w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm font-semibold text-gray-500 cursor-not-allowed"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 000 12c0 1.97.47 3.84 1.3 5.47l4.54-3.38z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
          <span className="text-[10px] text-gray-600 ml-auto">Coming soon</span>
        </button>
        <button
          disabled
          className="flex items-center justify-center gap-2 w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm font-semibold text-gray-500 cursor-not-allowed"
        >
          <MessageCircle className="h-4 w-4 text-indigo-400" />
          Continue with Discord
          <span className="text-[10px] text-gray-600 ml-auto">Coming soon</span>
        </button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-card-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card/60 px-2 text-gray-500">or continue with email</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-error/10 border border-error/20 p-3 text-sm text-error">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-sm text-success">
            {success}
          </div>
        )}

        {mode === "signup" && (
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="degen_builder"
              className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-electric-indigo transition duration-200"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="gm@example.com"
            className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-electric-indigo transition duration-200"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-card-border bg-card pl-4 pr-10 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-electric-indigo transition duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition duration-200 disabled:opacity-50 cursor-pointer shadow-lg shadow-electric-indigo/20 glow-indigo"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="text-center text-sm text-gray-400">
        {mode === "signin" ? (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuccess(null);
              }}
              className="text-neon-cyan hover:underline font-medium cursor-pointer"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => {
                setMode("signin");
                setError(null);
                setSuccess(null);
              }}
              className="text-neon-cyan hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
