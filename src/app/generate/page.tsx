"use client";

import AppShell from "@/components/layout/AppShell";
import ContentEditor from "@/components/editor/ContentEditor";

export default function GeneratePage() {
  return (
    <AppShell>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <ContentEditor />
      </div>
    </AppShell>
  );
}
