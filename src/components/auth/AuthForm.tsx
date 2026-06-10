"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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

  return (
    <div className="space-y-6">
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
