"use client";

import { useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-7 w-7 text-error" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-sm text-gray-400 mb-6">
          The AI hit a gas limit. Try again in a few seconds.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-lg bg-electric-indigo px-4 py-2.5 text-sm font-semibold text-white hover:bg-electric-indigo/90 transition cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-white transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
