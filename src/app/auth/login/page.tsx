import AuthForm from "@/components/auth/AuthForm";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-deep-space px-4 py-12 overflow-hidden font-sans">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-electric-indigo/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[120px] pointer-events-none" />
      
      <div className="relative w-full max-w-md space-y-8 z-10">
        {/* Brand/Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-premium shadow-lg shadow-electric-indigo/25 glow-indigo text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-4 inline-flex items-center gap-3">
            Write<span className="text-gradient">3</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">Beta</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-xs">
            Generate contextually aware, high-impact Web3 content in seconds.
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-card-border bg-card/60 backdrop-blur-xl p-8 shadow-2xl space-y-6">
          {/* Email Login/Signup */}
          <Suspense fallback={<div className="text-center py-4 text-sm text-gray-400">Loading auth forms...</div>}>
            <AuthForm />
          </Suspense>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-600">
          By connecting, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
