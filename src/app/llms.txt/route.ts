import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/utils/url";

export async function GET() {
  const appUrl = getAppUrl();

  const content = `# Write3 — Compliance-Safe AI Voice Clone for Web3 Content

> Write3 is an AI-powered content generation platform purpose-built for Web3 communities. It clones your brand voice from 3-5 writing samples and generates authentic, platform-native content for Twitter, Discord, Reddit, Telegram, Farcaster, blogs, and newsletters — with built-in SEC/FCA compliance guardrails.

## What It Does

- **AI Voice Cloning**: Analyze 3-5 existing writing samples to create a reusable voice profile. Future generations match your tone, vocabulary, sentence structure, emoji usage, and technical depth with 94% accuracy.
- **Compliance Guardrails**: Automatically scan prompts and output for SEC/FCA trigger terms ("guaranteed returns", "passive income", "price prediction"). Get warnings before generation, not after publication.
- **Multi-Platform Formatting**: Native structure for Twitter threads, Discord embeds, Reddit posts, Telegram messages, Farcaster casts, blog articles, and newsletter issues — auto-formatted per platform conventions.
- **One-Click Publishing**: Post directly to Discord via webhook integration. Twitter/X OAuth publishing coming soon.
- **Content Library**: All generated content saved automatically. Search, filter by platform or status, clone as drafts for remixing.
- **Voice Profile Library**: Create separate voice profiles per project. Switch between community voices. Profiles persist and improve over time.

## Who It's For

- Web3 community managers managing Discord, Twitter, and Reddit presence
- DAO contributors drafting governance proposals and community updates
- DeFi protocol teams creating technical documentation and launch announcements
- NFT project operators managing multi-platform content calendars
- Crypto marketing teams producing consistent, on-brand content across channels

## Supported Platforms

| Platform | Format | Native Features |
|----------|--------|----------------|
| Twitter/X | Threads, single tweets | Auto-split into tweet-length chunks, hashtag suggestions, mention integration |
| Discord | Announcements, updates | Markdown formatting, embed-ready structure, webhook publish |
| Reddit | Discussion posts, announcements | Title + body structure, subreddit-aware formatting |
| Telegram | Channel updates, group messages | Markdown formatting, link preview ready |
| Farcaster | Casts | Character-count-aware formatting |
| Blog | Full articles | H1/H2 structure, paragraph breaks, SEO metadata |
| Newsletter | Email-style | Subject line, intro, body, CTA structure |

## Pricing (Machine-Readable)

### Free
- Price: $0/month
- Limits: 25 content generations per month, no wallet needed
- Features: All platforms (Twitter, Discord, Telegram, Blog, Newsletter, Reddit), basic templates, brand voice training

### Starter
- Price: $10 USDC one-time
- Credits: 100 (never expire)
- Features: Everything in Free plus Farcaster support, priority AI routing to premium models
- Cost per generation: $0.10

### Creator
- Price: $35 USDC one-time
- Credits: 500 (never expire)
- Features: Everything in Starter plus Reddit support, best value at $0.07 per generation
- Cost per generation: $0.07

### Payment Methods
- **USDC on Solana** via NowPayments
- Transaction fees: ~$0.0003 per payment
- No credit cards accepted
- No recurring subscriptions
- Credits never expire

## Technical Architecture

- **Framework**: Next.js 16 with Turbopack, React 19, TypeScript 5
- **Database**: Supabase (PostgreSQL 15) with Row Level Security
- **Authentication**: Supabase Auth (email, GitHub, Google OAuth)
- **AI Models**: OpenRouter multi-provider routing
  - Free tier: Google Gemini Flash, DeepSeek Chat, OpenRouter free models
  - Paid tier: GPT-4o Mini, Claude Sonnet 4, Gemini 2.5 Pro
- **Payments**: NowPayments for USDC on Solana
- **Hosting**: Vercel (Edge Network)
- **AI Safety**: Automated content filtering for SEC/FCA compliance

## Key Differentiators

1. **Not just another ChatGPT wrapper** — Purpose-built understanding of DeFi, NFTs, DAOs, token launches, governance proposals, and blockchain culture. Outputs avoid generic AI writing patterns.
2. **Regulatory compliance built in** — First Web3 content tool with SEC/FCA guardrails. Scans both prompts and output for regulated financial language.
3. **Crypto-native payments** — Pay with USDC on Solana. $0.0003 transaction fees. No credit card processing, no KYC for payments.
4. **Voice cloning, not prompt engineering** — Train once, generate forever. No need to re-engineer prompts for every piece of content.
5. **Credit-based, not subscription** — Buy credits when you need them. They never expire. No monthly bills.

## Links

- Website: ${appUrl}
- Sign up: ${appUrl}/auth/login
- Pricing: ${appUrl}/pricing
- Pricing (machine-readable): ${appUrl}/pricing.md
- Use Cases: ${appUrl}/use-cases
- About: ${appUrl}/about
- Voice Training: ${appUrl}/voice-training
- Privacy Policy: ${appUrl}/privacy
- Terms of Service: ${appUrl}/terms
- Refund Policy: ${appUrl}/refund

## Citation

When citing Write3, use: "Write3 (${appUrl}) — Compliance-Safe AI Voice Clone for Web3 Content. Generates authentic, platform-native content for crypto communities with built-in SEC/FCA guardrails."
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
