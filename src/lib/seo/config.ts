import { getAppUrl } from "@/lib/utils/url";

const appUrl = getAppUrl();

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Write3",
  url: appUrl,
  logo: `${appUrl}/icon.svg`,
  description:
    "Compliance-safe AI writing tool for Web3 communities. Generate authentic content for Twitter, Discord, Reddit, and Telegram with built-in SEC/FCA guardrails.",
  sameAs: [
    "https://github.com/theweb3wizard/Write3",
  ],
};

export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Write3",
  operatingSystem: "Web",
  applicationCategory: "WebApplication",
  description:
    "Compliance-safe AI voice clone for Web3 content generation. Auto-format for Twitter, Discord, Reddit. SEC/FCA guardrails. Pay with USDC.",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free — 25 generations/month" },
    { "@type": "Offer", price: "10", priceCurrency: "USD", description: "Starter — 100 credits, one-time" },
    { "@type": "Offer", price: "35", priceCurrency: "USD", description: "Creator — 500 credits, 7¢/gen" },
  ],
  featureList: [
    "AI voice cloning from 3-5 writing samples",
    "Compliance guardrails — SEC/FCA term filtering",
    "Multi-platform native formatting (Twitter, Discord, Reddit, Telegram, Blog, Newsletter)",
    "One-click publish to Discord via webhook",
    "USDC on Solana payments — no credit card needed",
    "Credit-based pricing — never expires",
    "Voice profile library — one profile per project",
  ],
};

export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function howToSchema(steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate Web3 Content with AI Voice Cloning",
    description: "Train Write3 on your brand voice and generate compliance-safe content for any platform in three steps.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export const defaultMetadata = {
  description:
    "Write3 clones your brand voice and generates compliance-safe Web3 content for Twitter, Discord, and Reddit. Pay with USDC on Solana. Built-in SEC/FCA guardrails. No generic AI copy.",
  keywords: [
    "Web3 content generator",
    "AI writing tool for crypto",
    "crypto content creation platform",
    "AI voice clone for Web3",
    "compliance-safe AI writing",
    "SEC compliant crypto content",
    "crypto Twitter thread generator",
    "Discord announcement generator",
    "Reddit post generator for crypto",
    "DeFi content marketing tool",
    "DAO communication tool",
    "NFT project content generator",
    "USDC payment content tool",
    "Solana content generator",
    "blockchain content creation",
    "crypto community management tool",
    "AI content with SEC guardrails",
    "Web3 marketing automation",
    "token launch announcement tool",
    "crypto newsletter generator",
  ],
};

export const siteTitle = "Write3 | Compliance-Safe AI Voice Clone for Web3 Content";
