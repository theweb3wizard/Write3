"use client";

import { Zap, ArrowUpRight, RefreshCw } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";

export default function SubscriptionSection() {
  const { creditBalance, freeRemaining, refreshBalance } = useSubscription();

  return (
    <div className="rounded-xl border border-card-border bg-card/40 p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Credits & Usage</h3>
          <p className="text-sm text-gray-400">Manage your credits and view usage.</p>
        </div>
        <Zap className="h-6 w-6 text-electric-indigo" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Credit Balance</span>
            <div className="text-3xl font-bold text-white mt-1">
              {creditBalance}
              <span className="text-sm font-normal text-gray-500 ml-2">credits</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition duration-200 cursor-pointer glow-indigo"
            >
              Buy Credits
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={refreshBalance}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border px-4 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-lg bg-card/20 border border-card-border">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-400">Free Generations This Month</span>
            <span className="font-bold text-white">{freeRemaining} / 25</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-400">Purchased Credits</span>
            <span className="font-bold text-white">{creditBalance}</span>
          </div>
          <div className="text-xs text-gray-500">
            Credits never expire. Free generations reset monthly.
          </div>
        </div>
      </div>
    </div>
  );
}
