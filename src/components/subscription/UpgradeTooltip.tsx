"use client";

import { Lock } from "lucide-react";
import Link from "next/link";

interface UpgradeTooltipProps {
  message?: string;
  children: React.ReactNode;
}

export default function UpgradeTooltip({ message = "Available on paid plans", children }: UpgradeTooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition">
        <div className="relative">
          <Lock className="h-3 w-3 text-warning" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 rounded-lg bg-card border border-card-border shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none">
            <p className="text-xs text-gray-400 mb-1">{message}</p>
            <Link href="/pricing" className="text-xs text-electric-indigo hover:underline">
              Upgrade now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
