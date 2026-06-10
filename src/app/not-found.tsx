import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-7 w-7 text-warning" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-sm text-gray-400 mb-6">
          This page doesn&apos;t exist or has been moved to a different route.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
