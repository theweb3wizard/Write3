import type { Metadata } from "next";
import { getAppUrl } from "@/lib/utils/url";

export const defaultMetadata: Metadata = {
  title: {
    default: "Write3 | Compliance-Safe AI Voice Clone for Web3 Content",
    template: "%s | Write3",
  },
  description: "Clone your brand voice with AI. Generate compliance-safe Web3 content for Twitter, Discord, Reddit, and Telegram. Built-in SEC/FCA guardrails prevent regulatory risk. Pay with USDC on Solana.",
  keywords: [
    "Web3 content generator",
    "crypto AI voice clone",
    "compliance-safe AI writing",
    "SEC safe crypto content",
    "crypto Twitter thread generator",
    "Discord AI assistant Web3",
    "DAO communication tool",
    "AI content for crypto compliance",
    "Web3 brand voice training",
    "crypto writing assistant",
    "Reddit crypto AI content",
    "USDC content generator",
    "Solana AI writing tool",
    "DeFi content creation",
    "Web3 content strategy compliance",
  ],
  openGraph: {
    title: "Write3 | Compliance-Safe AI Voice Clone for Web3 Content",
    description: "Clone your brand voice. Generate compliance-safe content for Twitter, Discord, Reddit. No SEC risk. Pay with USDC on Solana.",
    url: getAppUrl(),
    siteName: "Write3",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Write3 | Compliance-Safe AI Voice Clone for Web3 Content",
    description: "Clone your brand voice. Generate compliant Web3 content. Draft, tune, post — all in one place. No SEC risk.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
