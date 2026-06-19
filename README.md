# Write3

AI-powered Web3 content generator. Generates authentic, platform-native content for Twitter/X, Discord, Telegram, Farcaster, blogs, and newsletters — purpose-built for crypto communities, DAOs, NFT projects, and DeFi protocols.

## Features

- **Multi-platform generation** — Native formatting for 6 channels (Twitter threads, Discord markdown, Telegram updates, Farcaster casts, blog posts, newsletters)
- **Voice training** — AI analyzes your existing content and replicates your community's unique voice and writing patterns
- **Template library** — Purpose-built prompts for announcements, governance proposals, AMAs, product launches, and market commentary
- **Tone control** — Slider from degen (0) to institutional (100) adjusts voice, vocabulary, and formality
- **Multi-model AI** — Routes through OpenRouter to Google Gemini Flash, Anthropic Claude, OpenAI GPT-4o, and DeepSeek — gated by subscription tier (free tier: Gemini Flash Latest + GPT-4o Mini + DeepSeek; auto picks optimally per tier)
- **Project management** — Organize content by project with full CRUD
- **Content library** — Search, filter by platform/status, pagination, inline status updates
- **Usage analytics** — Platform breakdown, daily counts, token usage, plan tracking
- **Subscription billing** — Free/Creator/Pro/Agency tiers via Paddle

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Database | Supabase (PostgreSQL, Auth, RLS) |
| AI | OpenRouter (Gemini Flash, Claude, GPT-4o, DeepSeek) |
| Payments | Paddle (browser SDK + node SDK + webhooks) |
| Rate Limiting | Upstash Redis + Ratelimit |
| Styling | Tailwind CSS v4 |
| Fonts | Inter + JetBrains Mono |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your keys:
#   OPENROUTER_API_KEY    — https://openrouter.ai/keys
#   NEXT_PUBLIC_SUPABASE_URL + anon + service_role — Supabase dashboard
#   UPSTASH_REDIS_REST_URL + token — Upstash console
#   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN + webhook secret — Paddle dashboard

# Run migrations on your Supabase database
# (Run the SQL in supabase/migrations/ against your Supabase SQL editor)

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + API routes
│   ├── (marketing)/        # Landing page
│   ├── api/                # API routes (generate, projects, content, etc.)
│   ├── auth/               # Auth pages (login, callback)
│   ├── dashboard/          # Dashboard page
│   ├── generate/           # Content generation editor
│   ├── library/            # Content library
│   ├── pricing/            # Pricing/subscriptions
│   └── voice-training/     # Voice profile training
├── components/
│   ├── auth/               # Auth form, OAuth buttons, callback
│   ├── billing/            # CheckoutButton
│   ├── editor/             # ContentEditor, ConfigPanel, PreviewPanel
│   ├── layout/             # AppShell, Sidebar, Footer, MarketingLayout
│   └── ui/                 # Shared UI (cards, loaders, error boundaries)
├── hooks/                  # React hooks (useSubscription)
├── lib/
│   ├── ai/                 # OpenRouter client + model registry + content gen
│   ├── payments/           # Payment route handlers
│   ├── seo/                # Metadata config
│   ├── subscription/       # Credit guards, generation checks
│   ├── supabase/           # Client/server/admin Supabase clients
│   └── utils/              # URL resolution, etc.
└── stores/                 # Zustand store (user profile)
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | AI generation via OpenRouter |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (admin) |
| `NOWPAYMENTS_API_KEY` | No* | Crypto payment creation |
| `NOWPAYMENTS_IPN_SECRET` | No* | Webhook signature verification |
| `NEXT_PUBLIC_APP_URL` | No | Canonical URL (auto-detected on Vercel) |

\* Optional for development; required in production for feature to work.

## Deployment

Deploy to Vercel with zero config:

```bash
npm install -g vercel
vercel --prod
```

Set all environment variables in Vercel → Project → Settings → Environment Variables, then run the Supabase migrations on your production database.

## License

MIT
