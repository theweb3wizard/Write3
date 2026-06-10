import type { Metadata } from "next";
import { getAppUrl } from "@/lib/utils/url";

export const metadata: Metadata = {
  title: "AI Content That Sounds Like Web3 | Write3",
  description:
    "Generate authentic Discord announcements, Twitter threads, Telegram updates, and blog posts that capture your community's voice — not generic corporate marketing.",
  openGraph: {
    title: "Write3 | AI-Powered Web3 Content Generator for Web3 Communities",
    description:
      "Generate authentic Discord, Telegram, Twitter/X, Farcaster, blog, and newsletter content that actually sounds like Web3.",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
