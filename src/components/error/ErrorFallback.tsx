"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="rounded-xl border border-error/20 bg-error/5 p-6 text-center">
      <AlertTriangle className="h-8 w-8 text-error mx-auto mb-3" />
      <h3 className="text-sm font-semibold text-white mb-1">Something went wrong</h3>
      <p className="text-xs text-gray-400 mb-4">{error?.message || "An unexpected error occurred"}</p>
      {reset && (
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error/10 text-error text-xs font-medium border border-error/20 hover:bg-error/20 transition cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" />
          Try Again
        </button>
      )}
    </div>
  );
}
