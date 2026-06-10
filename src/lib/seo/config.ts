import type { Metadata } from "next";
import { getAppUrl } from "@/lib/utils/url";

export const defaultMetadata: Metadata = {
  title: {
    default: "Write3 | AI-Powered Web3 Content Generator",
    template: "%s | Write3",
  },
  description: "Generate authentic Web3-native content for Discord, Telegram, Twitter/X, Farcaster, blogs, and newsletters. AI-powered content generation for crypto communities.",
  keywords: [
    "Web3 content generator",
    "crypto AI writing tool",
    "blockchain content automation",
    "Discord content generator",
    "Twitter thread generator",
    "DAO proposal writer",
    "Web3 community management",
    "AI content for crypto",
    "NFT marketing content",
    "DeFi content creation",
  ],
  openGraph: {
    title: "Write3 | AI-Powered Web3 Content Generator",
    description: "Generate authentic Web3-native content for Discord, Telegram, Twitter/X, Farcaster, blogs, and newsletters.",
    url: getAppUrl(),
    siteName: "Write3",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Write3 | AI-Powered Web3 Content Generator",
    description: "Generate authentic Web3-native content for your community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
