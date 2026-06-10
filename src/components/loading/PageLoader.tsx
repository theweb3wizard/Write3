import { Sparkles } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 rounded-xl bg-gradient-premium flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
