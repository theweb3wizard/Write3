"use client";

import AppShell from "@/components/layout/AppShell";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import ContentStats from "@/components/dashboard/ContentStats";
import QuickGenerate from "@/components/dashboard/QuickGenerate";
import RecentContent from "@/components/dashboard/RecentContent";
import TrendingTopics from "@/components/dashboard/TrendingTopics";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
        <WelcomeHeader />
        <ContentStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <QuickGenerate />
          </div>
          <div className="lg:col-span-2">
            <RecentContent />
          </div>
        </div>
        <TrendingTopics />
      </div>
    </AppShell>
  );
}
