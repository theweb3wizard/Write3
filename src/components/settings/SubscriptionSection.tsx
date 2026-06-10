"use client";

import { useUserStore } from "@/stores/userStore";
import { CreditCard, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SubscriptionSection() {
  const { user } = useUserStore();

  const tierLabels = {
    free: "Free Explorer",
    creator: "Creator Plan",
    pro: "Pro Plan",
    agency: "Agency Plan",
  };

  const getLimit = (tier: string) => {
    switch (tier) {
      case "free":
        return 50;
      case "creator":
        return 500;
      case "pro":
        return 2000;
      case "agency":
        return 10000;
      default:
        return 50;
    }
  };

  const currentLimit = getLimit(user?.subscription_tier || "free");
  const currentCount = user?.monthly_generation_count || 0;
  const percentage = Math.min(100, Math.round((currentCount / currentLimit) * 100));

  return (
    <div className="rounded-xl border border-card-border bg-card/40 p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Subscription Plan</h3>
          <p className="text-sm text-gray-400">View and manage your current subscription level and credit usage.</p>
        </div>
        <CreditCard className="h-6 w-6 text-electric-indigo" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tier Details */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Plan</span>
            <div className="text-xl font-bold text-white mt-1">
              {tierLabels[user?.subscription_tier || "free"]}
            </div>
          </div>

          <div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition duration-200 shadow-md shadow-electric-indigo/10 cursor-pointer glow-indigo"
            >
              Upgrade Plan
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="space-y-3 p-4 rounded-lg bg-card/20 border border-card-border">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-400">Monthly Generations</span>
            <span className="font-bold text-white">{currentCount} / {currentLimit}</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-card-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-premium transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="text-xs text-gray-500 flex justify-between">
            <span>Resets monthly</span>
            <span>{percentage}% Used</span>
          </div>
        </div>
      </div>
    </div>
  );
}
