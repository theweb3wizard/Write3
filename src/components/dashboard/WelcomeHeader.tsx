"use client";

import { useUserStore } from "@/stores/userStore";
import { Zap } from "lucide-react";

export default function WelcomeHeader() {
  const { user } = useUserStore();

  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            gm, {user?.username || "builder"} <span className="inline-block">👋</span>
          </h1>
          <p className="text-gray-400 mt-1">
            Ready to create some Web3-native content?
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20">
          <Zap className="h-3.5 w-3.5 text-electric-indigo" />
          <span className="text-xs font-medium text-electric-indigo">
            {user?.credit_balance ?? 0} credits
          </span>
        </div>
      </div>
    </div>
  );
}
