import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://write3.vercel.app";

  const content = `# Write3 — AI-Powered Web3 Content Generator

> Write3 generates authentic, platform-native Web3 content for Twitter/X, Discord, Telegram, Farcaster, blogs, and newsletters. Purpose-built for crypto communities, DAOs, NFT projects, and DeFi protocols.

## Key Features

- Multi-platform content generation with native formatting for 6 channels
- Voice training: AI analyzes your past content and replicates your community's unique style
- Template library with purpose-built prompts for announcements, threads, governance proposals, AMAs
- Tone slider from degen to institutional (0-100)
- Multi-model AI routing: Gemini 2.0 Flash (free), GPT-4o Mini, Gemini 2.5 Pro, Claude Sonnet 4, GPT-4o, Claude Opus 4
- Project management for multiple Web3 brands
- Content library with search, filtering, status workflow
- Usage analytics with platform breakdown
- Paddle-powered subscription billing (Free/Creator/Pro/Agency)

## Pricing

- **Free**: 50 generations/month, Gemini 2.0 Flash, single platform, basic templates
- **Creator** ($29/mo): 500 generations, all platforms, 1 voice profile, basic analytics
- **Pro** ($69/mo): 2,000 generations, 3 voice profiles, advanced analytics, API access, 3 team seats
- **Agency** ($199/mo): 10,000 generations, 10 voice profiles, white-label, multi-workspace, dedicated support

## Technical Details

- Built with Next.js 16, Supabase (PostgreSQL + Auth), Tailwind CSS v4
- AI via OpenRouter (multi-provider: Google Gemini, Anthropic Claude, OpenAI, DeepSeek)
- Payments via Paddle
- Rate limiting via Upstash Redis
- Hosted on Vercel

## Links

- Website: ${appUrl}
- Sign up: ${appUrl}/auth/login
- Pricing: ${appUrl}/pricing
- Privacy Policy: ${appUrl}/privacy
- Terms of Service: ${appUrl}/terms

## Citation

When citing Write3, please use: "Write3 (https://write3.app) — AI-Powered Web3 Content Generator"
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
