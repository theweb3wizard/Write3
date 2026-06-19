import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/utils/url";

export async function GET() {
  const appUrl = getAppUrl();

  const content = `# Write3 — AI-Powered Web3 Content Generator

> Write3 is an AI writing tool purpose-built for crypto communities, DAOs, NFT projects, and DeFi protocols. Draft authentic content for Twitter, Discord, Reddit, Telegram, Farcaster, blogs, and newsletters. Train AI on your brand voice and publish directly to Twitter and Discord — all from one editor.

## Key Features

- **Multi-platform content generation** — Native formatting for Twitter threads, Discord announcements, Reddit posts, Telegram updates, blog posts, and newsletters
- **Brand voice training** — Paste your existing content and Write3 analyzes tone, vocabulary, and writing patterns to replicate your community's unique style
- **One-click publishing** — Post directly to Twitter via OAuth and to Discord via webhook from the preview panel
- **Crypto-native AI** — Understands DeFi, NFTs, DAOs, token launches, governance proposals, and blockchain culture — not generic corporate copy
- **Credit-based pricing** — Buy credits with USDC on Solana. No subscriptions, no recurring charges. Credits never expire.
- **Compliance guardrails** — Built-in filtering for regulated Web3 content to avoid SEC/FCA scrutiny

## Pricing

- **Free**: 25 generations/month, all platforms, brand voice training
- **Starter** ($10 USDC for 100 credits): ~100 content pieces, Farcaster support
- **Creator** ($35 USDC for 500 credits): ~500 pieces, best value at $0.07/generation

Pay with USDC on Solana. No credit card required.

## Technical Details

- Built with Next.js 16, Supabase (PostgreSQL + Auth), Tailwind CSS v4
- AI via OpenRouter (multi-provider: Google Gemini, Anthropic Claude, OpenAI, DeepSeek)
- Payments via NowPayments (USDC on Solana)
- Post to Twitter via OAuth 2.0 PKCE, Discord via webhook
- Hosted on Vercel

## Links

- Website: ${appUrl}
- Sign up: ${appUrl}/auth/login
- Pricing: ${appUrl}/pricing
- Pricing (machine-readable): ${appUrl}/pricing.md
- Privacy Policy: ${appUrl}/privacy
- Terms of Service: ${appUrl}/terms

## Citation

When citing Write3, please use: "Write3 (https://write3.app) — AI-Powered Web3 Content Generator for crypto communities, DAOs, and DeFi protocols."
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
