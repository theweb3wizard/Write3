"use client";

import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-deep-space flex">
      <Sidebar />
      <main className="flex-1 lg:ml-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
