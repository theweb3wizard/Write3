# Master Blueprint: AI-Powered Web3 Content Generator for Niche Communities

## Version 1.0 | June 2026

---

## 1. Executive Summary

### The Product

**NicheCanvas** (working title) is an AI-powered content generation platform purpose-built for Web3 projects, crypto communities, DAOs, and blockchain-native brands. Unlike generic AI writing tools, NicheCanvas understands the unique linguistic patterns, cultural references, technical terminology, and community dynamics that define Web3 ecosystems. The platform generates contextually-aware content for Discord, Telegram, Twitter/X, Farcaster, blog posts, newsletters, and governance proposals — all tuned to the specific voice and knowledge domain of each niche community.

### Core Value Proposition

Web3 community managers currently face a **content production crisis**. The average crypto project maintains presence across **4-6 platforms simultaneously** (Discord, Telegram, Twitter/X, Farcaster, blog, newsletter), requiring **15-25 pieces of content daily** to maintain engagement [^3^][^32^]. Generic AI tools produce content that sounds corporate and out-of-touch with crypto culture — misusing terminology, missing narrative trends, and failing to capture the authentic voice that Web3 audiences demand [^12^][^13^]. NicheCanvas solves this by combining large language model capabilities with Web3-specific knowledge graphs, real-time narrative tracking, and community voice training.

### Target User

The primary user is the **Web3 Community Manager** or **Marketing Lead** at a crypto project, DeFi protocol, NFT collection, DAO, or blockchain infrastructure company. Secondary users include **founders doing their own marketing**, **crypto influencers**, and **Web3 marketing agencies** managing multiple client accounts. The target demographic aligns with the crypto owner profile: predominantly **male (61%)**, aged **25-44 (54% of all crypto owners)**, technically literate, and active on Crypto Twitter and Discord [^52^][^54^].

### Why This Is a Sure Bet

The convergence of three massive tailwinds makes this the optimal moment:

1. **Exploding AI Content Market**: The generative AI market reached **$140 billion in 2026**, growing at **28-40% CAGR** [^16^][^17^]. Content generation and marketing represents the largest application segment within this market.

2. **Maturing Web3 Ecosystem**: With **741 million global crypto owners** and the total crypto market cap surpassing **$4 trillion** in 2025, Web3 projects are transitioning from speculative hype to professional marketing operations [^3^][^4^]. The demand for quality, consistent content has never been higher.

3. **Structural Gap in the Market**: Every existing AI writing tool (Jasper, Copy.ai, Writesonic) is built for generic B2B marketing. None understand Web3 culture, terminology, or community dynamics. The projects that have tried to serve this niche (OpenTweet, ChainAware Growth Agents) focus on scheduling and analytics, not content generation [^6^][^3^]. NicheCanvas occupies a **zero-competition white space**.

### Financial Projections

| Metric | Estimate |
|--------|----------|
| Addressable Market (SAM) | **$1.4 billion** |
| Serviceable Obtainable Market (Year 1) | **$140 million** |
| Target Monthly Recurring Revenue (Month 12) | **$25,000 - $50,000** |
| Customer Lifetime Value (LTV) | **$738 - $1,107** |
| MVP Infrastructure Cost | **$96 - $146/month** |
| Target Customer Acquisition Cost (CAC) | **<$150** |
| Target LTV:CAC Ratio | **>5:1** |

### The Ask

This document provides everything needed for an agentic coding AI (Cursor, Antigravity, Claude Code) to build a working MVP in **4-6 weeks**. The stack is entirely free-tier at launch, scaling to under **$200/month** at $1K MRR [^22^]. Every architectural decision, data model, user flow, and security measure is specified. No further research is required before writing the first line of code.

---

## 2. Market Deep Dive

### 2.1 Target Audience Analysis

#### Primary Persona: The Web3 Community Manager

**Demographics**: The Web3 community manager is typically aged **25-34 (31% of crypto users)** or **35-44 (23%)**, with a median age of **34.8 years globally** [^54^]. They are **61% male**, though female participation is growing at **16% year-over-year** [^55^]. Geographically concentrated in North America (**17% adoption**), Asia-Pacific (**23%**), and Europe (**12%**) [^54^].

**Psychographics**: These are digitally native professionals who value **autonomy, transparency, and community ownership**. They speak the language of Web3 — degen, HODL, wen lambo, gm, ser — and understand that authentic community engagement is the primary moat in crypto [^4^][^32^]. They are skeptical of corporate-speak and can instantly detect inauthentic content. They work asynchronously across global time zones and are comfortable with AI tools but frustrated by their generic outputs.

**Daily Habits**: A typical day involves monitoring Discord and Telegram channels, crafting Twitter threads, coordinating with moderators, analyzing engagement metrics, planning content calendars, and staying current on market narratives [^32^][^34^]. They consume crypto news through Twitter/X, Telegram channels, and newsletters. They are early adopters of new tools but quick to abandon those that don't deliver immediate value.

**Pain Points**:

| Pain Point | Severity | Current Workaround | Failure Mode |
|-----------|----------|-------------------|--------------|
| **Content volume demand** | Critical | Hiring freelance writers | Inconsistent quality, high cost ($2-5K/month) [^13^] |
| **Maintaining authentic Web3 voice** | Critical | Manual editing of AI output | Time-consuming, still misses cultural nuances |
| **Multi-platform formatting** | High | Copy-paste with manual reformatting | Errors, inconsistent branding, wasted time |
| **Staying current on narratives** | High | Manual social listening | Misses trending topics, slow response |
| **Content personalization by segment** | Medium | Segmented campaigns in Mailchimp | No Web3-specific segmentation (wallet-based) |
| **Measuring content ROI** | Medium | Google Analytics + Dune dashboards | Disconnected data, no attribution to content |

**Willingness to Pay**: Based on competitive analysis, Web3 projects currently spend **$2,000-$10,000/month** on content marketing [^7^]. A tool that reduces this cost by 50-70% while improving quality commands **$49-$99/month** for individual users and **$199-$499/month** for teams. This aligns with pricing from comparable AI tools: Jasper at **$49-$69/month**, Copy.ai at **$29-$49/month**, and Writesonic at **$49-$79/month** [^43^][^46^].

#### Secondary Personas

**The Solo Founder**: Building a DeFi protocol or NFT project with no marketing budget. Needs to produce professional content without hiring. Price-sensitive, values templates and speed over customization. Willing to pay **$29-$49/month**.

**The Web3 Marketing Agency**: Managing content for 5-15 client projects simultaneously. Needs multi-account management, white-labeling, and team collaboration. Willing to pay **$199-$499/month** for agency plans.

**The Crypto Influencer**: Producing daily Twitter threads, newsletter content, and community updates. Needs personal brand voice training and rapid turnaround. Willing to pay **$49-$99/month**.

### 2.2 Market Demand & Timing

#### The Generative AI Content Explosion

The generative AI market reached approximately **$140 billion in 2026**, with content generation and marketing applications representing the dominant use case [^16^][^17^]. Enterprise adoption has accelerated dramatically: **OpenAI's revenue jumped from $5.5B to $12B annualized** between December 2024 and July 2025, and **GitHub Copilot penetrated 90% of Fortune 100 companies** [^16^]. The market is projected to grow at **28-40% CAGR** through 2030, reaching **$376 billion** [^16^][^18^].

Critically for this product, **84% of developers now use AI coding tools**, and **62% of startups have more than half their codebase written by AI** [^22^][^27^]. The normalization of AI-assisted creation means the target audience is already psychologically primed to adopt AI content tools — they just need one that understands their domain.

#### Web3's Content Production Crisis

Web3 marketing has fundamentally shifted from "generate hype" to "demonstrate value" [^4^]. Projects now need **utility-first messaging, verifiable on-chain results, and genuine community alignment**. This requires more sophisticated content, not less. The global crypto market surpassed **$4 trillion in market cap in 2025**, with **741 million crypto owners worldwide** [^3^][^4^]. Yet the tools for Web3 content creation remain primitive.

Current Web3 marketing stacks require **6-10 separate tools**: Typefully for scheduling, ChatGPT for drafting, Dune for analytics, Discord/Telegram for community, Zealy for quests, Galxe for campaigns, and manual processes to connect them [^3^][^5^][^8^]. NicheCanvas consolidates the content generation layer of this stack into a single specialized tool.

#### Search Volume & Organic Demand

While specific search data for "Web3 content generator" is nascent (indicating first-mover advantage), related terms show strong demand:

- **"AI content generator"**: High volume, dominated by generic tools
- **"Crypto marketing tools"**: Growing 35% YoY based on industry report trends
- **"Web3 marketing"**: Increasingly competitive keyword, with major agencies (Coinbound, RZLT) publishing comprehensive guides [^4^][^7^]
- **"Discord community management"**: Consistent high volume across crypto and gaming

The absence of a dominant Web3-specific content tool in search results represents a **first-mover SEO opportunity**. Early content marketing around "Web3 content generator," "crypto AI writing tool," and "blockchain content automation" can capture high-intent traffic with minimal competition.

### 2.3 Competitive Landscape

#### Direct Competitors (Web3-Specific Content Tools)

| Competitor | Category | Strengths | Weaknesses | Price |
|-----------|----------|-----------|------------|-------|
| **OpenTweet** [^6^] | Twitter scheduling for crypto | Multi-timezone scheduling, 7 AI models, $11.99 price point | Twitter-only, basic AI content, no Web3 knowledge | $11.99/mo |
| **ChainAware Growth Agents** [^3^] | On-chain personalization | Wallet-based personalization, behavioral analytics | Not a content generator — personalization layer only | Custom/Enterprise |
| **XActions** [^9^] | X/Twitter automation | Open source, no API fees, MCP server | Technical setup required, not content-focused | Free |
| **Typefully** [^5^] | X content scheduling | Clean UI, thread writing, analytics | Generic (not Web3-specific), no AI generation | $12-49/mo |

**Assessment**: No direct competitor offers Web3-specific AI content generation. OpenTweet comes closest but focuses on scheduling with basic AI, not sophisticated content creation. The competitive landscape is **wide open**.

#### Indirect Competitors (Generic AI Writing Tools)

| Competitor | Positioning | Web3 Suitability | Price | Key Weakness for Web3 |
|-----------|-------------|------------------|-------|----------------------|
| **Jasper** [^43^] | Marketing-focused AI | Poor — no Web3 knowledge | $49-69/mo | Generic brand voice training, no crypto terminology |
| **Copy.ai** [^47^] | GTM workflow automation | Poor — pivoted to sales | $29-49/mo | No longer focused on content creation |
| **Writesonic** [^46^] | SEO + content | Poor — no Web3 templates | $49-79/mo | Generic templates, no community voice training |
| **ChatGPT Plus** [^44^] | General-purpose AI | Moderate — can prompt for crypto | $20/mo | Requires extensive prompting, no brand memory, no templates |
| **Averi** [^46^] | Full content engine | Poor — no Web3 specialization | $99/mo | Enterprise-focused, no niche community features |

**Assessment**: Generic AI tools fail Web3 users because they lack domain knowledge. They produce content that sounds like a corporate marketing team trying to sound crypto-native — immediately detectable and often mocked by communities. The "vibe" of Web3 communication — a blend of technical precision, meme culture, financial speculation, and radical transparency — cannot be captured without specialized training data and community voice modeling.

#### Competitive Differentiation Matrix

| Capability | NicheCanvas | Jasper | Copy.ai | OpenTweet | ChatGPT |
|-----------|:-----------:|:------:|:-------:|:---------:|:-------:|
| Web3 terminology & knowledge | ✅ Native | ❌ None | ❌ None | ⚠️ Basic | ⚠️ Prompt-dependent |
| Community voice training | ✅ Core feature | ✅ Generic | ❌ No | ❌ No | ❌ No |
| Multi-platform formatting (Discord/Telegram/X) | ✅ Native | ⚠️ Export only | ⚠️ Export only | ✅ X only | ❌ Manual |
| Real-time narrative tracking | ✅ Built-in | ❌ No | ❌ No | ⚠️ Basic | ❌ No |
| Wallet-based audience segmentation | ✅ Web3-native | ❌ No | ❌ No | ❌ No | ❌ No |
| Governance proposal generation | ✅ Specialized | ❌ No | ❌ No | ❌ No | ⚠️ Prompt-dependent |
| Content calendar with Web3 events | ✅ Crypto-native | ⚠️ Generic | ⚠️ Generic | ⚠️ Basic | ❌ No |
| Token-gated content features | ✅ Web3-native | ❌ No | ❌ No | ❌ No | ❌ No |

### 2.4 Distribution Channels

#### Primary Channels

**Crypto Twitter (X)**: The primary discovery channel for Web3 tools. Strategy: Produce high-value Twitter threads demonstrating the tool's output, share "before/after" comparisons of generic AI vs. NicheCanvas content, engage with community manager conversations, and partner with crypto influencers for tutorials. **Expected CAC: $50-100** through organic + promoted content.

**Discord Communities**: Partner with major crypto Discords (DeFi protocols, NFT projects, DAOs) for exclusive access programs. Offer free trials to community managers in exchange for testimonials and case studies. **Expected CAC: $30-60** through community partnerships.

**Web3 Newsletters & Podcasts**: Sponsor relevant newsletters (The Defiant, Bankless, Milk Road) and appear on Web3 marketing podcasts. The newsletter audience is highly targeted and trust-based. **Expected CAC: $100-200** through sponsorships.

**Product Hunt**: Launch with a tailored Web3 angle. Product Hunt drives significant early-adopter traffic for SaaS tools. A well-executed launch can generate 500-2,000 signups in 48 hours. **Expected CAC: $10-30** for organic launch.

**SEO/Content Marketing**: Target long-tail keywords like "Web3 content generator," "crypto community content tool," "Discord content automation," "DAO proposal writer AI." Publish comprehensive guides on Web3 content strategy that demonstrate the tool in action. **Expected CAC: $0-20** (organic) after 6-12 months of content investment.

#### Secondary Channels

**Telegram Channels**: Crypto marketing Telegram channels have high engagement. Share product updates, tips, and exclusive offers.

**Web3 Marketing Agencies**: Affiliate/partnership program offering agencies 20-30% recurring commission for client referrals.

**Crypto Conferences**: EthDenver, Token2049, Consensus — booth presence and workshop sessions for community managers.

**Farcaster**: Emerging decentralized social platform with high Web3 concentration. Early presence establishes credibility.

### 2.5 Monetization Strategy

#### Pricing Model: Freemium with Usage Tiers

Based on competitive analysis and Web3 spending patterns, a **freemium model with tiered subscriptions** maximizes adoption while capturing value from power users:

| Plan | Price | Target User | Generations/Month | Key Features |
|------|-------|-------------|-------------------|--------------|
| **Free** | $0 | Individual explorers | 50 content pieces | Basic templates, single platform, community watermark |
| **Creator** | **$29/mo** | Solo founders, influencers | Unlimited | All platforms, voice training (1), basic analytics |
| **Pro** | **$69/mo** | Community managers, small teams | Unlimited + team (3 seats) | Voice training (3), advanced analytics, API access, priority support |
| **Agency** | **$199/mo** | Marketing agencies | Unlimited + team (10 seats) | White-label, multi-workspace, custom integrations, dedicated support |
| **Enterprise** | Custom | Large protocols, DAOs | Custom | SLA, custom model training, on-premise option, dedicated success manager |

**Pricing Rationale**: The **$29 entry point** matches Copy.ai's starter plan and is below Jasper's $49, reducing friction for individual users. The **$69 Pro tier** aligns with Jasper's pricing while offering more Web3-specific value. The **$199 Agency tier** is standard for marketing agency software (comparable to SEMrush, HubSpot agency plans). Free tier limits (50 pieces/month) provide enough value to demonstrate utility while encouraging upgrade for active users.

#### Revenue Projections (First 12 Months)

| Month | Free Users | Creator ($29) | Pro ($69) | Agency ($199) | MRR | Cumulative Revenue |
|-------|-----------|---------------|-----------|---------------|-----|-------------------|
| 1 | 200 | 10 | 2 | 0 | $428 | $428 |
| 3 | 800 | 50 | 15 | 2 | $2,848 | $6,264 |
| 6 | 2,500 | 180 | 60 | 8 | $10,812 | $32,700 |
| 9 | 5,000 | 400 | 150 | 20 | $26,450 | $89,850 |
| 12 | 8,000 | 750 | 300 | 45 | $52,305 | $243,765 |

**Assumptions**: 3-5% free-to-paid conversion rate (industry standard for freemium SaaS), 5% monthly churn (typical for AI tools), $75 average CAC across channels. These are conservative estimates given the lack of direct competition and high pain point severity.

#### Additional Revenue Streams

**API Access**: Charge per 1,000 API calls for developers integrating NicheCanvas into their own tools. Pricing: **$0.02 per generation**, comparable to OpenAI API markup.

**Custom Voice Training**: One-time fee of **$499-$1,499** for custom model fine-tuning on a project's historical content.

**Web3 Marketing Services**: Offer done-for-you content packages for projects without community managers. **$1,500-$5,000/month** per client.

---

## 3. Technical Architecture Decision

### 3.1 Final Stack Selection

After evaluating alternatives across each layer, the optimal stack for NicheCanvas is:

| Layer | Technology | Alternative Considered | Why This Wins |
|-------|-----------|----------------------|---------------|
| **Language** | **TypeScript** | Python, JavaScript | 43.6% developer adoption, #1 on GitHub (2.63M contributors), full-stack type safety, best AI code generation quality [^22^][^27^] |
| **Frontend Framework** | **Next.js 15 (App Router)** | Remix, SvelteKit, Vue/Nuxt | 20.8% adoption, built-in SSR/SSG, API routes, largest React ecosystem, optimal Vercel integration [^22^][^26^] |
| **Styling** | **Tailwind CSS + shadcn/ui** | Chakra UI, Mantine, Bootstrap | 51% adoption, 31M weekly downloads, utility-first approach, excellent component library ecosystem [^22^] |
| **Database** | **PostgreSQL via Supabase** | Firebase, PlanetScale, MongoDB | #1 database (55.6% adoption), relational power for content models, Row Level Security, real-time subscriptions, generous free tier [^22^][^27^] |
| **Authentication** | **Supabase Auth** | Clerk, Auth0, NextAuth | Built-in OAuth (GitHub, Google, Twitter), deep RLS integration, zero additional cost [^22^] |
| **AI/LLM** | **OpenAI API (GPT-4o)** | Anthropic Claude, Gemini, Llama | Best-in-class content quality, function calling, structured outputs, cost-effective at scale |
| **Hosting** | **Vercel** | AWS, Netlify, Railway | Zero-config Next.js deployment, preview deployments, edge functions, global CDN [^22^] |
| **State Management** | **Zustand + React Query** | Redux, Zustand alone | Lightweight, TypeScript-friendly, excellent server-state caching with React Query |
| **Payments** | **Stripe** | LemonSqueezy, Paddle | Mature Web3-friendly payment processor, subscription management, $1.9T payment volume [^22^] |
| **Email** | **Resend** | SendGrid, Postmark | 3,000/mo free tier, React Email templates, excellent deliverability [^22^] |
| **Monitoring** | **Vercel Analytics + Sentry** | Datadog, LogRocket | Included in Vercel Pro, error tracking with Sentry free tier |
| **Storage** | **Supabase Storage** | AWS S3, Cloudflare R2 | Integrated with auth/RLS, generous free tier (1GB), simple API |

### 3.2 Stack Justification & Trade-offs

#### Why Not Python for the Backend?

Python with FastAPI is the dominant stack for AI-native applications, appearing on **over 30% of AI-focused SaaS startups** [^23^]. However, for NicheCanvas, the AI integration is through API calls (OpenAI) rather than local model inference. The application logic — content generation workflows, user management, billing — is standard SaaS functionality better served by TypeScript's end-to-end type safety. If future iterations require custom model training or local LLM inference, a Python microservice can be added without disrupting the core architecture.

#### Why Not Firebase?

Firebase (Firestore) was considered for its real-time capabilities and ease of use. However, Firestore's NoSQL document model creates significant challenges for relational content data (projects → content pieces → templates → users). Supabase provides Firebase-like developer experience with PostgreSQL's relational power, Row Level Security, and no vendor lock-in — you can export your PostgreSQL database and migrate to any host [^22^][^24^].

#### Why Not Clerk for Auth?

Clerk offers superior pre-built UI components and organization management. However, it starts at **$25/month** and doesn't integrate with database-level security policies. Supabase Auth provides authentication, session management, and Row Level Security integration at **zero additional cost** when using Supabase as the database. The trade-off (less polished UI components) is acceptable given the cost savings and security integration [^22^].

### 3.3 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Web App   │  │  Chrome Ext │  │   Discord   │  │  Telegram Bot       │ │
│  │  (Next.js)  │  │  (future)   │  │   Bot       │  │  (future)           │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         └─────────────────┴─────────────────┴────────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE / SERVER LAYER                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │  Next.js API    │  │  Middleware     │  │  Server Components (RSC)    │  │
│  │  Routes         │  │  (Auth/Rate)    │  │  (SSR Pages)                │  │
│  │                 │  │                 │  │                             │  │
│  │  /api/generate  │  │  JWT Validation │  │  /dashboard                 │  │
│  │  /api/projects  │  │  Rate Limiting  │  │  /editor                    │  │
│  │  /api/templates │  │  CORS Headers   │  │  /settings                  │  │
│  │  /api/billing   │  │  Bot Detection  │  │  /analytics                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE (DATA LAYER)                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   PostgreSQL    │  │   Auth          │  │   Storage                   │  │
│  │   (Database)    │  │   (OAuth/JWT)   │  │   (Assets/Avatars)          │  │
│  │                 │  │                 │  │                             │  │
│  │  • users        │  │  • OAuth providers│  │  • User uploads            │  │
│  │  • projects     │  │  • Sessions     │  │  • Generated images        │  │
│  │  • content_pieces│  │  • RLS Policies │  │  • Template previews       │  │
│  │  • templates    │  │                 │  │                             │  │
│  │  • voice_profiles│  └─────────────────┘  └─────────────────────────────┘  │
│  │  • subscriptions│                                                   │
│  │  • usage_logs   │  ┌─────────────────┐                              │
│  │  • analytics    │  │   Realtime      │                              │
│  │                 │  │   (WebSockets)  │                              │
│  └─────────────────┘  │                 │                              │
│                       │  • Live content  │                              │
│                       │    updates       │                              │
│                       │  • Collaboration │                              │
│                       └─────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICE LAYER                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   OpenAI API    │  │   Stripe        │  │   Resend (Email)            │  │
│  │                 │  │                 │  │                             │  │
│  │  • GPT-4o       │  │  • Subscriptions│  │  • Welcome emails           │  │
│  │  • GPT-4o-mini  │  │  • Invoicing    │  │  • Notifications            │  │
│  │  • Embeddings   │  │  • Webhooks     │  │  • Marketing campaigns      │  │
│  │  • Fine-tuning  │  │                 │  │                             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   Upstash Redis │  │   Sentry        │  │   Vercel Analytics          │  │
│  │   (Caching/Rate)│  │   (Error Tracking│  │   (Web Analytics)           │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Scaling Considerations

**Phase 1: MVP (0-1,000 users)**
- Vercel Hobby + Supabase Free: **$0/month**
- Limitations: 500MB database, 2GB bandwidth, 100K edge function invocations/day
- When to upgrade: Database approaching 400MB or bandwidth > 1.5GB

**Phase 2: Early Traction (1,000-10,000 users)**
- Vercel Pro ($20/month) + Supabase Pro ($25/month): **$45/month**
- Upstash Redis for caching ($10/month): **$55/month total**
- Limitations: 8GB database, 250GB bandwidth

**Phase 3: Growth (10,000-50,000 users)**
- Vercel Pro + Supabase Team ($99/month) + Upstash Pro: **$150-200/month**
- Consider CDN for static assets (Cloudflare R2)
- Implement database connection pooling (PgBouncer included in Supabase)

**Phase 4: Scale (50,000+ users)**
- Evaluate migration to AWS/GCP for compute-intensive operations
- Implement read replicas for database scaling
- Consider self-hosted LLM inference for cost optimization at scale

---

## 4. UX & User Flows

### 4.1 Design Philosophy

**Core Principle**: NicheCanvas should feel like a **creative studio** designed by people who understand Web3, not a corporate productivity tool. The interface should evoke the energy of crypto culture — bold but not garish, technical but not cold, playful but professional.

**Key Experience Goals**:
1. **Zero-to-content in 60 seconds**: A new user should generate their first piece of Web3-native content within one minute of signup
2. **Progressive disclosure**: Surface simple options by default, reveal advanced controls on demand
3. **Contextual intelligence**: The tool should anticipate what the user needs based on their project type and current market trends
4. **Delight in details**: Micro-interactions, satisfying animations, and thoughtful empty states that make the product memorable

### 4.2 Color Palette & Visual Identity

**Primary Colors**:
- **Deep Space** (`#0A0E1A`): Primary background — evokes terminal screens and blockchain explorers
- **Electric Indigo** (`#6366F1`): Primary action color — vibrant, tech-forward, distinct from generic blue
- **Neon Cyan** (`#22D3EE`): Accent for highlights, hover states, Web3 indicators — the "crypto signal" color
- **Pure White** (`#FFFFFF`): Primary text on dark backgrounds

**Semantic Colors**:
- **Success**: `#10B981` (Emerald green — "WAGMI" energy)
- **Warning**: `#F59E0B` (Amber — pending transactions)
- **Error**: `#EF4444` (Red — rugged/rekt)
- **Info**: `#3B82F6` (Blue — neutral information)

**Gradients**:
- Primary gradient: `linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)` — used for CTAs, premium badges, hero elements
- Glow effect: `box-shadow: 0 0 20px rgba(99, 102, 241, 0.3)` — subtle electric glow on interactive elements

**Dark-First Design**: The interface defaults to dark mode (crypto-native users expect this). Light mode is available but secondary.

### 4.3 Typography

| Role | Font | Weight | Size | Usage |
|------|------|--------|------|-------|
| **Display/Headings** | Inter | 700-800 | 32-48px | Page titles, hero text |
| **Body** | Inter | 400-500 | 14-16px | Paragraphs, descriptions |
| **Monospace** | JetBrains Mono | 400-500 | 13-14px | Code snippets, wallet addresses, transaction hashes |
| **Labels/Captions** | Inter | 500-600 | 11-12px | UI labels, badges, timestamps |

Inter is chosen for its excellent readability at all sizes, extensive weight range, and native feel in both web and crypto contexts. JetBrains Mono provides the technical aesthetic for blockchain-specific data.

### 4.4 Motion & Micro-interactions

**Principles**: Motion serves purpose — it guides attention, provides feedback, and creates emotional resonance. Never use animation for decoration alone.

**Key Animations**:
- **Content generation pulse**: A subtle "breathing" gradient animation on the generate button during AI processing
- **Typewriter reveal**: Generated content appears character-by-character (configurable speed)
- **Success flash**: Brief electric cyan flash on the generated content area when complete
- **Card hover**: 2px upward lift with shadow intensification, 200ms ease-out
- **Page transitions**: 150ms fade with 8px upward slide for route changes
- **Loading states**: Skeleton screens with shimmer effect, never generic spinners
- **Count-up animation**: Numbers (usage stats, credits) animate on load

**Reduced Motion**: All animations respect `prefers-reduced-motion` for accessibility.

### 4.5 Tone of Voice

The product's voice mirrors its users — **knowledgeable, direct, occasionally irreverent, always helpful**. In-product copy uses Web3 terminology naturally without explaining it (the user already knows). Error messages are honest and actionable, never corporate-blame-shifting.

Examples:
- **Onboarding**: "Let's get you producing content that actually sounds like it came from your community, not a marketing intern."
- **Empty state (no projects)**: "No projects yet. Time to build something worthy of a thread. 🧵"
- **Error (generation failed)**: "The AI hit a gas limit. Try again in a few seconds."
- **Success**: "Content generated. Ready to deploy. 🚀"
- **Limit reached**: "You've maxed out your free generations. Time to upgrade and unlock unlimited content."

### 4.6 Complete User Journey

#### Journey 1: First-Time User (Free Tier)

**Step 1: Discovery → Landing Page**
- User arrives from Twitter thread, Product Hunt, or search
- Landing page immediately demonstrates value: "Generate Web3-native content in seconds"
- Live demo widget: pre-filled with a crypto project example, user can click "Generate" without signing up
- Social proof: logos of crypto projects using the tool, testimonials from community managers
- Clear CTA: "Start Creating Free" (no credit card required)

**Step 2: Signup (30 seconds)**
- Options: GitHub OAuth (preferred — aligns with dev/crypto identity), Google OAuth, or email
- Post-signup: Immediate redirect to onboarding, no email verification delay
- *Delight moment*: Welcome animation with personalized "gm, [username]" greeting

**Step 3: Onboarding Flow (2 minutes)**
- **Screen 1**: "What type of Web3 project are you building?" — Cards: DeFi Protocol, NFT Collection, DAO, L1/L2 Infrastructure, GameFi, Other
- **Screen 2**: "Where do you post content?" — Multi-select: Twitter/X, Discord, Telegram, Farcaster, Blog, Newsletter
- **Screen 3**: "What's your project's tone?" — Slider from "Degen 🔥" to "Institutional 🏦" with live preview of sample copy
- **Screen 4**: Connect wallet (optional) — "Connect your wallet for personalized content based on your holdings" — MetaMask, WalletConnect, Coinbase Wallet
- Onboarding completion: Auto-creates first project with selected preferences

**Step 4: First Content Generation (60 seconds)**
- Dashboard loads with pre-populated template: "Project Announcement Thread" (Twitter/X format)
- Template pre-filled with user's project type and tone preferences
- User clicks "Generate" → sees real-time generation with typewriter effect
- Output: 5-tweet thread appropriate for their project type and tone
- **Aha moment**: Content that actually sounds like it was written by a crypto-native community manager

**Step 5: Export & Share**
- One-click copy to clipboard with proper thread formatting
- "Post to Twitter" button (OAuth integration)
- Save to project library
- Prompt to upgrade after 3rd generation (soft upsell, not blocking)

**Step 6: Continued Engagement**
- Daily email with trending Web3 narratives and suggested content ideas
- In-app notification when new templates matching their project type are added
- Progress bar showing free generations remaining (gamification)

#### Journey 2: Upgrading to Paid

**Trigger**: User hits free generation limit or attempts premium feature
- Soft gate: "You've used 45/50 free generations this month. Upgrade for unlimited content."
- Upgrade modal shows side-by-side comparison: Free vs. Creator ($29/mo)
- Emphasizes value: "For the cost of one gas fee, get unlimited content for a month"
- Stripe checkout embedded (no redirect)
- Instant upgrade — no waiting, no manual intervention
- Post-upgrade: Confetti animation, unlock all premium features immediately

#### Journey 3: Power User (Pro/Agency)

**Advanced Workflows**:
- **Voice Training**: Upload historical content (Twitter threads, Discord announcements), AI analyzes and creates custom voice profile
- **Content Calendar**: Drag-and-drop scheduling across platforms with optimal timing recommendations
- **Team Collaboration**: Invite team members, assign roles (writer, editor, approver), comment on drafts
- **Analytics Dashboard**: Track content performance across platforms, identify top-performing topics and formats
- **API Integration**: Generate content programmatically for automated community management
- **White-label**: Remove NicheCanvas branding for agency clients

### 4.7 Screen-by-Screen Breakdown

#### Dashboard (Home)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard  Templates  Analytics  Settings     [Credits] [Profile]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  gm, alex.eth 👋                                                     │   │
│  │  You've generated 23 pieces this week. Your community is thriving.   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │  Quick Generate      │  │  Recent Content      │  │  Content Stats   │  │
│  │                      │  │                      │  │                  │  │
│  │  [Dropdown: Project] │  │  ┌────────────────┐  │  │  This Week       │  │
│  │  [Dropdown: Platform]│  │  │ Twitter Thread  │  │  │  23 generated    │  │
│  │  [Dropdown: Type]    │  │  │ 2 hours ago    │  │  │  18 published    │  │
│  │                      │  │  │ 142 engagements │  │  │  4 scheduled     │  │
│  │  [Generate Button]   │  │  └────────────────┘  │  │                  │  │
│  │                      │  │  ┌────────────────┐  │  │  Top Format      │  │
│  │  Or choose a         │  │  │ Discord Announce│  │  │  Twitter Threads │  │
│  │  template below ↓    │  │  │ 5 hours ago    │  │  │                  │  │
│  └──────────────────────┘  │  │ 89 reactions    │  │  │  Trending Topic  │  │
│                            │  └────────────────┘  │  │  L2 Scaling      │  │
│                            └──────────────────────┘  └──────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Templates                                                          │   │
│  │  [Twitter Thread] [Discord Announce] [Telegram Update] [Blog Post]  │   │
│  │  [Newsletter] [Governance Proposal] [AMA Recap] [Market Commentary] │   │
│  │  [Meme Caption] [Partnership Post] [Launch Announce] [Educational]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Trending in Web3  🚀                                               │   │
│  │  • ETH Denver submissions open → Generate announcement             │   │
│  │  • Base chain TVL hits new ATH → Generate market commentary        │   │
│  │  • New SEC guidance on staking → Generate regulatory analysis      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Content Editor

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  ← Back to Dashboard                                      [Publish] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐  ┌─────────────────────────────────────────────┐ │
│  │  Configuration       │  │  Preview                                    │ │
│  │                      │  │                                             │ │
│  │  Project: DeFi Alpha │  │  ┌─────────────────────────────────────┐   │ │
│  │  Platform: Twitter   │  │  │  🧵 1/5 Why @DeFiAlpha is           │   │ │
│  │  Content Type:       │  │  │  changing the yield farming game    │   │ │
│  │  Announcement Thread │  │  │  👇                                 │   │ │
│  │                      │  │  │                                     │   │ │
│  │  Tone: Degen 🔥      │  │  │  2/5 The problem: Most yield        │   │ │
│  │  [=========●====]    │  │  │  aggregators charge hidden fees...  │   │ │
│  │                      │  │  │                                     │   │ │
│  │  Length: Medium      │  │  │  3/5 Our solution: Zero-fee         │   │ │
│  │  [Short • Medium •   │  │  │  yield optimization with...         │   │ │
│  │   Long]              │  │  │                                     │   │ │
│  │                      │  │  │  4/5 Since launch:                  │   │ │
│  │  Voice: Default      │  │  │  ✅ $12M TVL                        │   │ │
│  │  [Dropdown]          │  │  │  ✅ 4,200+ holders                  │   │ │
│  │                      │  │  │  ✅ Zero exploits                   │   │ │
│  │  Topic: Custom       │  │  │                                     │   │ │
│  │  [Input: Product     │  │  │  5/5 Join the alpha:                │   │ │
│  │   launch]            │  │  │  discord.gg/defialpha               │   │ │
│  │                      │  │  │  Like + RT for early access 🚀      │   │ │
│  │  Key Points:         │  │  └─────────────────────────────────────┘   │ │
│  │  [textarea]          │  │                                             │ │
│  │  • Zero fees         │  │  [Copy] [Edit] [Regenerate] [Save]          │ │
│  │  • $12M TVL          │  │                                             │ │
│  │  • 4200 holders      │  │  Platform-specific formatting:              │ │
│  │                      │  │  [Twitter ✓] [Discord] [Telegram] [Blog]    │ │
│  │  [Advanced ▼]        │  │                                             │ │
│  │  • Include hashtags  │  │                                             │ │
│  │  • Add CTAs          │  │                                             │ │
│  │  • Mention handles   │  │                                             │ │
│  │                      │  │                                             │ │
│  │  [Generate]          │  │                                             │ │
│  └──────────────────────┘  └─────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Voice Training

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Voice Training                                               [?]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Train Your Community Voice 🤖                                      │   │
│  │                                                                     │   │
│  │  Upload your past content and AI will learn your unique voice.      │   │
│  │                                                                     │   │
│  │  [Dropzone: Drag & drop Twitter exports, Discord logs, blog posts]  │   │
│  │                                                                     │   │
│  │  Or paste content directly:                                         │   │
│  │  ┌───────────────────────────────────────────────────────────────┐  │   │
│  │  │ Paste example content here...                                  │  │   │
│  │  │                                                                │  │   │
│  │  │                                                                │  │   │
│  │  └───────────────────────────────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  │  Voice Name: [My Project Voice    ]                                 │   │
│  │                                                                     │   │
│  │  [Analyze Voice]                                                    │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Analysis Results                                                   │   │
│  │                                                                     │   │
│  │  Detected characteristics:                                          │   │
│  │  • Tone: Enthusiastic, technical, meme-aware                        │   │
│  │  • Vocabulary: DeFi-native, uses "ser," "WAGMI," "alpha"            │   │
│  │  • Sentence length: Short-medium (avg 15 words)                     │   │
│  │  • Emoji usage: Moderate 🚀 📈 ✨                                   │   │
│  │  • Technical depth: High (explains complex concepts simply)         │   │
│  │                                                                     │   │
│  │  Sample output with this voice:                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │ "gm ser 🌞 Ready to dive into this week's yield alpha?      │    │   │
│  │  │  We've optimized the vaults and APY is looking juicy..."    │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  │                                                                     │   │
│  │  [Save Voice] [Test with Template] [Refine]                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Empty States & Error Handling

**No Projects State**:
- Illustration: Abstract geometric shapes forming a "blank canvas"
- Headline: "Your canvas is empty"
- Subtext: "Time to create your first project and start generating content that resonates."
- CTA: "Create Project" (primary), "Explore Templates" (secondary)

**No Content Generated State**:
- Illustration: Pencil hovering over a document
- Headline: "No content yet"
- Subtext: "Pick a template and generate your first piece. It takes less than a minute."
- CTA: "Generate Content" (primary)

**Generation Error State**:
- Icon: ⚠️ in warning color
- Headline: "Generation interrupted"
- Subtext: "The AI model encountered an issue. This usually resolves in a few seconds."
- CTA: "Try Again" (primary), "Contact Support" (secondary)
- Auto-retry: Silent retry up to 3 times before showing error

**Rate Limit State**:
- Icon: ⏳
- Headline: "Taking a breather"
- Subtext: "You've been generating a lot of content! Rate limit resets in 2 minutes."
- CTA: "View My Content" (primary), "Upgrade for Higher Limits" (secondary)

---

## 5. Data & Security Plan

### 5.1 Data Models

#### Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     users       │     │    projects     │     │  content_pieces │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (uuid) PK    │◄────┤ id (uuid) PK    │◄────┤ id (uuid) PK    │
│ email           │     │ user_id FK      │     │ project_id FK   │
│ username        │     │ name            │     │ template_id FK  │
│ avatar_url      │     │ description     │     │ platform        │
│ wallet_address  │     │ project_type    │     │ content_type    │
│ subscription_tier│    │ tone_setting    │     │ title           │
│ created_at      │     │ voice_profile_id│     │ body            │
│ updated_at      │     │ created_at      │     │ status          │
└─────────────────┘     │ updated_at      │     │ metadata        │
                        └─────────────────┘     │ ai_model_used   │
                                │               │ tokens_used     │
                                │               │ created_at      │
                                ▼               │ updated_at      │
                        ┌─────────────────┐     └─────────────────┘
                        │  voice_profiles │
                        ├─────────────────┤
                        │ id (uuid) PK    │
                        │ project_id FK   │
                        │ name            │
                        │ training_data   │
                        │ characteristics │
                        │ is_active       │
                        │ created_at      │
                        └─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   templates     │     │   usage_logs    │     │  subscriptions  │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (uuid) PK    │     │ id (uuid) PK    │     │ id (uuid) PK    │
│ name            │     │ user_id FK      │     │ user_id FK      │
│ description     │     │ action_type     │     │ stripe_sub_id   │
│ platform        │     │ resource_type   │     │ plan_type       │
│ content_type    │     │ resource_id     │     │ status          │
│ category        │     │ tokens_used     │     │ current_period_ │
│ default_prompt  │     │ metadata        │     │   start/end     │
│ system_message  │     │ created_at      │     │ cancel_at       │
│ is_premium      │     └─────────────────┘     │ created_at      │
│ is_active       │                             │ updated_at      │
│ created_at      │                             └─────────────────┘
└─────────────────┘
```

#### Table Definitions

**users** — Core user accounts

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, default gen_random_uuid() | Unique identifier |
| `email` | `varchar(255)` | UNIQUE, NOT NULL | Login email |
| `username` | `varchar(50)` | UNIQUE | Display name |
| `avatar_url` | `text` | | Profile image URL |
| `wallet_address` | `varchar(42)` | | Connected ETH address (optional) |
| `subscription_tier` | `varchar(20)` | DEFAULT 'free' | free, creator, pro, agency |
| `monthly_generation_count` | `int` | DEFAULT 0 | Current month usage |
| `generations_reset_at` | `timestamptz` | | Monthly reset timestamp |
| `created_at` | `timestamptz` | DEFAULT now() | Account creation |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update |

**projects** — Web3 projects/communities

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK | Unique identifier |
| `user_id` | `uuid` | FK → users.id, ON DELETE CASCADE | Owner |
| `name` | `varchar(100)` | NOT NULL | Project name |
| `description` | `text` | | Project description |
| `project_type` | `varchar(50)` | NOT NULL | defi, nft, dao, infrastructure, gamefi, other |
| `tone_setting` | `int` | DEFAULT 50 | 0-100 scale (degen to institutional) |
| `voice_profile_id` | `uuid` | FK → voice_profiles.id | Active voice profile |
| `platforms` | `text[]` | | Active platforms: ['twitter', 'discord', 'telegram'] |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

**content_pieces** — Generated content

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK | Unique identifier |
| `project_id` | `uuid` | FK → projects.id, ON DELETE CASCADE | Parent project |
| `template_id` | `uuid` | FK → templates.id | Used template |
| `platform` | `varchar(20)` | NOT NULL | twitter, discord, telegram, blog, newsletter |
| `content_type` | `varchar(50)` | NOT NULL | announcement, thread, update, proposal, etc. |
| `title` | `varchar(200)` | | Content title |
| `body` | `text` | NOT NULL | Generated content |
| `status` | `varchar(20)` | DEFAULT 'draft' | draft, published, scheduled, archived |
| `metadata` | `jsonb` | | Platform-specific formatting, hashtags, mentions |
| `ai_model_used` | `varchar(50)` | | gpt-4o, gpt-4o-mini |
| `tokens_used` | `int` | | Input + output token count |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

**voice_profiles** — Custom AI voice training

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK | Unique identifier |
| `project_id` | `uuid` | FK → projects.id | Parent project |
| `name` | `varchar(100)` | NOT NULL | Voice name |
| `training_data` | `text` | | Raw training content |
| `characteristics` | `jsonb` | | Analyzed traits: tone, vocabulary, patterns |
| `system_prompt` | `text` | | Generated system prompt for this voice |
| `is_active` | `boolean` | DEFAULT true | |
| `created_at` | `timestamptz` | DEFAULT now() | |

**templates** — Content generation templates

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK | Unique identifier |
| `name` | `varchar(100)` | NOT NULL | Template name |
| `description` | `text` | | Template description |
| `platform` | `varchar(20)` | NOT NULL | Target platform |
| `content_type` | `varchar(50)` | NOT NULL | Content category |
| `category` | `varchar(50)` | NOT NULL | General, DeFi, NFT, DAO, etc. |
| `default_prompt` | `text` | NOT NULL | Base prompt template |
| `system_message` | `text` | | System context for generation |
| `variables` | `jsonb` | | Configurable variables: {key: {label, type, required}} |
| `example_output` | `text` | | Sample generated content |
| `is_premium` | `boolean` | DEFAULT false | Free vs. paid template |
| `is_active` | `boolean` | DEFAULT true | |
| `created_at` | `timestamptz` | DEFAULT now() | |

**usage_logs** — Audit trail for billing and analytics

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK | Unique identifier |
| `user_id` | `uuid` | FK → users.id | Acting user |
| `action_type` | `varchar(50)` | NOT NULL | generate, edit, export, voice_train |
| `resource_type` | `varchar(50)` | | content_piece, template, project |
| `resource_id` | `uuid` | | Affected resource |
| `tokens_used` | `int` | DEFAULT 0 | AI tokens consumed |
| `metadata` | `jsonb` | | Additional context |
| `created_at` | `timestamptz` | DEFAULT now() | |

**subscriptions** — Stripe subscription tracking

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK | Unique identifier |
| `user_id` | `uuid` | FK → users.id, UNIQUE | One subscription per user |
| `stripe_subscription_id` | `varchar(100)` | UNIQUE | Stripe subscription ID |
| `stripe_customer_id` | `varchar(100)` | | Stripe customer ID |
| `plan_type` | `varchar(20)` | NOT NULL | free, creator, pro, agency |
| `status` | `varchar(20)` | NOT NULL | active, canceled, past_due |
| `current_period_start` | `timestamptz` | | |
| `current_period_end` | `timestamptz` | | |
| `cancel_at` | `timestamptz` | | Scheduled cancellation |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

### 5.2 Data Flow Architecture

#### Content Generation Flow

```
User Request (Generate Content)
    │
    ▼
┌─────────────────────────────────────┐
│  1. Client Validation               │
│     • Check auth (Supabase JWT)     │
│     • Check rate limits (Upstash)   │
│     • Check subscription tier       │
│     • Validate input parameters     │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  2. Context Assembly                │
│     • Fetch project settings        │
│     • Load voice profile (if set)   │
│     • Fetch template configuration  │
│     • Assemble system message       │
│     • Build user prompt with vars   │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  3. AI Generation                   │
│     • Call OpenAI API (GPT-4o)      │
│     • Apply retry logic (3 attempts)│
│     • Parse structured response     │
│     • Apply post-processing         │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  4. Storage & Response              │
│     • Save to content_pieces table  │
│     • Log usage (usage_logs)        │
│     • Update generation count       │
│     • Return formatted response     │
└─────────────────────────────────────┘
    │
    ▼
Client Receives: Generated content + metadata
```

#### Authentication Flow

```
User Login (GitHub OAuth)
    │
    ▼
┌─────────────────────────────────────┐
│  1. OAuth Initiation                │
│     • Redirect to GitHub OAuth      │
│     • State parameter for CSRF      │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  2. Callback Handling               │
│     • Verify state parameter        │
│     • Exchange code for token       │
│     • Fetch user profile from GitHub│
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  3. Account Management              │
│     • Check if user exists          │
│     • Create new user if needed     │
│     • Create/update session         │
│     • Issue JWT (Supabase)          │
└─────────────────────────────────────┘
    │
    ▼
Client: Store session, redirect to dashboard
```

### 5.3 Security Architecture

#### Authentication & Authorization

**Primary Method**: Supabase Auth with OAuth providers (GitHub, Google, Twitter/X)
- GitHub OAuth is primary — aligns with crypto/developer identity
- Email/password as fallback with strong password requirements
- JWT sessions with automatic refresh
- Row Level Security (RLS) policies enforce data isolation at the database level

**RLS Policies** (Critical for multi-tenant security):

```sql
-- Users can only read/update their own profile
CREATE POLICY "Users can manage own profile"
ON users FOR ALL
USING (auth.uid() = id);

-- Projects: user can only access their own
CREATE POLICY "Users can manage own projects"
ON projects FOR ALL
USING (auth.uid() = user_id);

-- Content pieces: access through project ownership
CREATE POLICY "Users can access project content"
ON content_pieces FOR ALL
USING (
  project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  )
);

-- Usage logs: users can only view their own
CREATE POLICY "Users can view own usage"
ON usage_logs FOR SELECT
USING (auth.uid() = user_id);
```

**API Route Protection**:
- Every API route validates the Supabase session JWT
- Middleware checks for authentication before route handling
- Role-based access control for admin endpoints

#### Encryption

**In Transit**: All communications use TLS 1.3. Enforced via:
- Vercel automatic HTTPS
- Supabase SSL enforcement
- HSTS headers configured

**At Rest**:
- Supabase PostgreSQL data encrypted at rest (AWS RDS encryption)
- Sensitive user data (wallet addresses) stored as standard text (public blockchain data)
- API keys stored in environment variables, never in client-side code

#### Input Sanitization & Validation

**All user inputs validated via Zod schemas**:
- Content generation: Max length limits, allowed character sets, template variable validation
- Project creation: Name length (3-100 chars), description max 1000 chars
- Wallet addresses: Ethereum address format validation (0x + 40 hex chars)
- Rate limiting: Per-user and per-IP limits on generation endpoints

**XSS Prevention**:
- React's built-in XSS protection for rendered content
- Content Security Policy headers
- Input sanitization before database storage

#### Rate Limiting

| Endpoint | Free Tier | Creator | Pro | Agency |
|----------|-----------|---------|-----|--------|
| Content generation | 50/month | Unlimited | Unlimited | Unlimited |
| API requests/minute | 10 | 60 | 120 | 300 |
| Voice training | 0 | 1 profile | 3 profiles | 10 profiles |
| Team members | 1 | 1 | 3 | 10 |

Rate limiting implemented via Upstash Redis with sliding window algorithm.

#### Audit Trail

All significant actions logged to `usage_logs` table:
- Content generation (with token usage)
- Voice training attempts
- Subscription changes
- Project creation/deletion
- Export actions

Logs retained for 12 months for billing disputes and security analysis.

### 5.4 Compliance Considerations

#### GDPR (European Users)

**Data Minimization**: Only collect data necessary for service operation (email, username, optional wallet address)

**Right to Deletion**: Users can delete their account and all associated data via Settings. Implemented via cascading deletes in database schema.

**Data Portability**: Users can export all their content as JSON via API.

**Consent Management**: Explicit consent for email marketing during signup (opt-in checkbox, not pre-checked).

**Privacy Policy**: Required before launch. Cover: data collected, usage purpose, retention period, third-party services (OpenAI, Stripe), user rights.

#### CCPA (California Users)

**Disclosure**: Privacy policy must disclose categories of personal information collected and third parties with whom it's shared.

**Do Not Sell**: NicheCanvas does not sell user data. Explicit statement required.

**Deletion Rights**: Same mechanism as GDPR.

### 5.5 Security Checklist

| # | Control | Implementation | Status |
|---|---------|---------------|--------|
| 1 | HTTPS everywhere | Vercel auto-SSL + HSTS | Required |
| 2 | Authentication | Supabase Auth + OAuth | Required |
| 3 | Authorization | RLS policies + API middleware | Required |
| 4 | Input validation | Zod schemas on all inputs | Required |
| 5 | Rate limiting | Upstash Redis per-user/IP | Required |
| 6 | SQL injection prevention | Supabase parameterized queries | Built-in |
| 7 | XSS prevention | React escaping + CSP headers | Required |
| 8 | CSRF protection | SameSite cookies + state params | Required |
| 9 | API key security | Environment variables only | Required |
| 10 | Error handling | Generic error messages to client | Required |
| 11 | Audit logging | usage_logs table | Required |
| 12 | Dependency scanning | npm audit in CI/CD | Required |
| 13 | Content moderation | OpenAI moderation API on output | Required |
| 14 | Wallet connection security | SIWE (Sign-In with Ethereum) | Future |
| 15 | Penetration testing | Before public launch | Recommended |

---

## 6. Manual Setup Guide

Before any agentic builder begins coding, the human founder must complete the following setup steps. Each step includes the exact commands and configuration needed.

### 6.1 Account Creation

#### Step 1: GitHub Account & Repository

1. Ensure you have a GitHub account (create at github.com if needed)
2. Create a new repository: `nichecanvas` (private recommended during development)
3. Generate a personal access token: Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
   - Scopes needed: `repo`, `workflow`
   - Save the token securely — you cannot view it again

#### Step 2: Vercel Account

1. Sign up at vercel.com using your GitHub account
2. No payment required for Hobby tier
3. Note your Vercel team slug (visible in dashboard URL: `vercel.com/[TEAM_SLUG]`)

#### Step 3: Supabase Account

1. Sign up at supabase.com using your GitHub account
2. Create a new project:
   - Name: `nichecanvas`
   - Database password: Generate strong password, save in password manager
   - Region: Choose closest to your target users (US East Coast recommended for global Web3 audience)
3. Save the following from Project Settings → API:
   - Project URL: `https://[PROJECT_REF].supabase.co`
   - Project API Keys → `anon` public key
   - Project API Keys → `service_role` secret key (keep secure — never expose to client)

#### Step 4: OpenAI Account

1. Sign up at platform.openai.com
2. Add payment method (required even for free tier usage tracking)
3. Navigate to API Keys → Create new secret key
   - Name: `NicheCanvas Production`
   - Save the key immediately — you cannot view it again
4. Set usage limits: Settings → Limits → Hard limit: $100/month (prevents unexpected bills during development)
5. Note your Organization ID from Organization Settings

#### Step 5: Stripe Account

1. Sign up at stripe.com
2. Complete account verification (business details required)
3. Navigate to Developers → API Keys:
   - Publishable key (pk_test_... for development)
   - Secret key (sk_test_... for development)
4. Create webhook endpoint (after deployment): Developers → Webhooks → Add endpoint
   - URL: `https://[YOUR_DOMAIN]/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`
   - Save the webhook signing secret

#### Step 6: Resend Account (Email)

1. Sign up at resend.com
2. Verify a domain (after you purchase one) or use the default `resend.dev` domain for testing
3. Navigate to API Keys → Create API Key:
   - Name: `NicheCanvas`
   - Permissions: `Sending access`
   - Save the key

#### Step 7: Upstash Account (Redis for Rate Limiting)

1. Sign up at upstash.com
2. Create a new Redis database:
   - Name: `nichecanvas-rate-limiting`
   - Region: Same as your Vercel deployment region
3. Save the REST URL and token from the database details page

#### Step 8: Domain Purchase (Optional for MVP)

1. Purchase domain through Namecheap, Porkbun, or Cloudflare Registrar
2. Recommended: `nichecanvas.io` or `nichecanvas.xyz` (Web3-friendly TLD)
3. For MVP, you can use the free Vercel subdomain: `nichecanvas.vercel.app`

### 6.2 Environment Variables

Create a `.env.local` file in the project root. **Never commit this file to GitHub.**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY]

# OpenAI
OPENAI_API_KEY=[YOUR_OPENAI_KEY]
OPENAI_ORG_ID=[YOUR_ORG_ID]

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_CREATOR=price_...  # Create in Stripe dashboard
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_AGENCY=price_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev  # Update after domain verification

# Upstash (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Update after deployment
APP_ENV=development  # Change to 'production' for production
JWT_SECRET=[GENERATE_RANDOM_STRING_32_CHARS]  # For custom JWT signing if needed
```

Generate a random JWT secret:
```bash
openssl rand -base64 32
```

### 6.3 Database Provisioning & Migrations

#### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

#### Step 2: Initialize Supabase in Project

```bash
# In your project directory
supabase login
supabase init
supabase link --project-ref [YOUR_PROJECT_REF]
```

#### Step 3: Run Initial Migration

Create `supabase/migrations/00000000000000_initial_schema.sql` with the full schema from Section 5.1, then:

```bash
supabase db push
```

#### Step 4: Seed Templates Data

Create `supabase/seed.sql` with initial template data (see Section 7.3 for template seed data), then:

```bash
supabase db reset  # Applies migrations + seeds (local only)
# For production, run seed SQL via Supabase SQL Editor
```

#### Step 5: Enable RLS Policies

Run the RLS policies from Section 5.3 via Supabase SQL Editor or include in migration file.

#### Step 6: Configure OAuth Providers

In Supabase Dashboard → Authentication → Providers:

**GitHub**:
- Enable GitHub provider
- Client ID: From GitHub OAuth App (Settings → Developer settings → OAuth Apps → New OAuth App)
  - Application name: NicheCanvas
  - Homepage URL: `http://localhost:3000` (dev) / `https://yourdomain.com` (prod)
  - Authorization callback URL: `https://[PROJECT_REF].supabase.co/auth/v1/callback`
- Client Secret: From GitHub OAuth App
- Save

**Google** (optional):
- Enable Google provider
- Configure in Google Cloud Console → APIs & Services → Credentials
- Add authorized redirect URI: `https://[PROJECT_REF].supabase.co/auth/v1/callback`

### 6.4 Stripe Product Configuration

1. In Stripe Dashboard → Products → Add product:
   - **Creator Plan**: $29/month, recurring
   - **Pro Plan**: $69/month, recurring  
   - **Agency Plan**: $199/month, recurring
2. Copy each Price ID (starts with `price_`) to your `.env.local`
3. For testing, use Test Mode (toggle in Stripe dashboard)
4. Use Stripe test cards for development: `4242 4242 4242 4242`, any future date, any CVC, any ZIP

### 6.5 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/[USERNAME]/nichecanvas.git
cd nichecanvas

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with all your keys

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

### 6.6 Pre-Deployment Checklist

Before deploying to production:

- [ ] All environment variables set in Vercel dashboard (Settings → Environment Variables)
- [ ] Database migrations applied to production Supabase project
- [ ] RLS policies active and tested
- [ ] Stripe webhooks configured with production URL
- [ ] Resend domain verified (for production email sending)
- [ ] Custom domain configured in Vercel (optional)
- [ ] `APP_ENV=production` set
- [ ] Stripe in Live Mode (not Test Mode)
- [ ] OpenAI usage limits configured
- [ ] Sentry error monitoring configured (optional but recommended)

---

## 7. Agentic Build Plan

This section provides a precise, step-by-step sequence for an agentic builder to follow. Every step is self-contained, specifying exactly what files to create or edit, what code to write, and what dependencies to install.

### Critical Rule: The `Lastupdate.md` Protocol

**At the very start of work**, the agent must check for a file called `Lastupdate.md` in the project root.

- If it exists, read it and continue from the exact step indicated in "Next Steps"
- If it does not exist, create it and begin with Phase 1, Step 1

**After every completed step**, the agent must update `Lastupdate.md` with:
- Timestamp (UTC)
- Phase and step completed
- What was done, file changes, new environment variables
- Any decisions made or context the next agent needs
- Clear "Next Steps" pointer to the exact step that follows

#### `Lastupdate.md` Template

```markdown
# NicheCanvas Build Log

## Current Status
- Phase: [PHASE_NUMBER]
- Step: [STEP_NUMBER]
- Last Updated: [TIMESTAMP_UTC]

## Completed Work
[Description of what was done in this step]

## Files Changed
- [file path]: [description of change]

## Environment Variables Added
- [VARIABLE_NAME]: [purpose]

## Decisions & Context
[Any important decisions made that future agents need to know]

## Next Steps
Phase [X], Step [Y]: [Exact description of next step]
```

---

### Phase 1: Foundation & Setup (Week 1)

#### Step 1.1: Initialize Next.js Project with TypeScript

**Prompt for Cursor**: "Initialize a new Next.js 15 project with TypeScript, Tailwind CSS, and the App Router. Use the command `npx create-next-app@latest nichecanvas --typescript --tailwind --eslint --app --src-dir --no-import-alias`. After creation, verify the project runs with `npm run dev`. Update `Lastupdate.md` with status."

**Commands**:
```bash
npx create-next-app@latest nichecanvas --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd nichecanvas
npm run dev
```

**Files created**: Entire Next.js project scaffold

#### Step 1.2: Install Core Dependencies

**Prompt for Cursor**: "Install the core dependencies for the project: `@supabase/ssr`, `@supabase/supabase-js`, `zustand`, `@tanstack/react-query`, `zod`, `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`, `class-variance-authority`. These are needed for auth, state management, data fetching, validation, styling, icons, and animations. After installation, verify `npm run dev` still works. Update `Lastupdate.md`."

**Commands**:
```bash
npm install @supabase/ssr @supabase/supabase-js zustand @tanstack/react-query zod clsx tailwind-merge lucide-react framer-motion class-variance-authority
```

**Files modified**: `package.json`, `package-lock.json`

#### Step 1.3: Configure Tailwind & Global Styles

**Prompt for Cursor**: "Configure Tailwind CSS with the NicheCanvas color palette. Update `tailwind.config.ts` to add custom colors: deepSpace (#0A0E1A), electricIndigo (#6366F1), neonCyan (#22D3EE), and semantic colors (success: #10B981, warning: #F59E0B, error: #EF4444). Also add the JetBrains Mono font family. Update `src/app/globals.css` to set up dark mode as default, base styles, and custom utility classes. Update `src/app/layout.tsx` to load Inter and JetBrains Mono fonts from Google Fonts via Next.js font optimization. Update `Lastupdate.md`."

**Files to modify**:
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`

#### Step 1.4: Set Up Supabase Client & Auth Helpers

**Prompt for Cursor**: "Create Supabase client utilities. Create `src/lib/supabase/client.ts` for the browser client, `src/lib/supabase/server.ts` for server components, and `src/lib/supabase/admin.ts` for admin operations (service role). Each file should properly handle the environment variables with type safety. Create a middleware file `src/middleware.ts` that refreshes the Supabase session and handles auth routing. Update `Lastupdate.md`."

**Files to create**:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`
- `src/middleware.ts`

#### Step 1.5: Create Database Schema & Migrations

**Prompt for Cursor**: "Create the complete database schema for NicheCanvas. Create `supabase/migrations/00000000000000_initial_schema.sql` with all tables: users, projects, content_pieces, voice_profiles, templates, usage_logs, subscriptions. Include all columns, types, constraints, foreign keys, indexes, and RLS policies from Section 5.1 and 5.3 of the blueprint. Also create `supabase/seed.sql` with 8-10 initial content templates covering different platforms and Web3 project types. Update `Lastupdate.md`."

**Files to create**:
- `supabase/migrations/00000000000000_initial_schema.sql`
- `supabase/seed.sql`

---

### Phase 2: Authentication & User Management (Week 1-2)

#### Step 2.1: Build Auth Pages (Login/Signup)

**Prompt for Cursor**: "Create the authentication pages. Create `src/app/auth/login/page.tsx` and `src/app/auth/callback/route.ts` for handling OAuth callbacks. The login page should show GitHub OAuth as the primary option, with Google as secondary, and email signup as fallback. Use the Supabase auth helpers. Style with Tailwind using the NicheCanvas color palette (dark theme, electricIndigo accents). Include proper error handling and loading states. Update `Lastupdate.md`."

**Files to create**:
- `src/app/auth/login/page.tsx`
- `src/app/auth/callback/route.ts`
- `src/components/auth/AuthForm.tsx`
- `src/components/auth/OAuthButtons.tsx`

#### Step 2.2: Create User Store & Session Management

**Prompt for Cursor**: "Create a Zustand store for user state management. Create `src/stores/userStore.ts` that manages: current user data, auth state (loading, authenticated, unauthenticated), subscription tier, and monthly usage count. Include methods for login, logout, and refreshing user data. Integrate with Supabase auth state changes. Use persistence for non-sensitive data. Update `Lastupdate.md`."

**Files to create**:
- `src/stores/userStore.ts`

#### Step 2.3: Build User Settings Page

**Prompt for Cursor**: "Create the user settings page at `src/app/settings/page.tsx`. Include sections for: profile information (username, avatar), connected wallet address (with validation), subscription management (upgrade/downgrade with Stripe integration placeholder), and account deletion. Use Zod validation for form inputs. Update `Lastupdate.md`."

**Files to create**:
- `src/app/settings/page.tsx`
- `src/components/settings/ProfileSection.tsx`
- `src/components/settings/SubscriptionSection.tsx`
- `src/components/settings/WalletConnect.tsx`

---

### Phase 3: Core Content Generation (Week 2-3)

#### Step 3.1: Create OpenAI Integration Service

**Prompt for Cursor**: "Create the OpenAI integration service. Create `src/lib/openai/client.ts` that initializes the OpenAI client with the API key. Create `src/lib/openai/content-generation.ts` with a `generateContent` function that takes parameters: project context, voice profile, template configuration, user inputs. The function should: assemble the system message (including Web3 context and voice characteristics), build the user prompt with template variables, call GPT-4o with retry logic (3 attempts), parse and validate the response, track token usage, and return formatted content. Include proper error handling and rate limiting checks. Update `Lastupdate.md`."

**Files to create**:
- `src/lib/openai/client.ts`
- `src/lib/openai/content-generation.ts`
- `src/lib/openai/prompts.ts` (system messages and prompt templates)

#### Step 3.2: Build Content Generation API Route

**Prompt for Cursor**: "Create the content generation API endpoint at `src/app/api/generate/route.ts`. This is a Next.js API route that: validates the user's session via Supabase, checks subscription tier and generation limits, calls the OpenAI content generation service, saves the generated content to the content_pieces table, logs usage to usage_logs, and returns the generated content with metadata. Use Zod for input validation. Implement rate limiting via Upstash Redis. Return appropriate error responses (401 for unauthorized, 429 for rate limit, 500 for generation errors). Update `Lastupdate.md`."

**Files to create**:
- `src/app/api/generate/route.ts`
- `src/lib/rate-limit.ts` (Upstash Redis rate limiting utility)

#### Step 3.3: Create Template System

**Prompt for Cursor**: "Build the template management system. Create `src/lib/templates/index.ts` that exports template definitions with: name, description, platform, content_type, category, default_prompt template, system_message, variables configuration, and example output. Create `src/app/api/templates/route.ts` to fetch templates (filtered by platform, category, and premium status). Create React components: `TemplateCard.tsx` for displaying a template, `TemplateGrid.tsx` for browsing templates, and `TemplateSelector.tsx` for the generation flow. Include filtering by platform (Twitter, Discord, Telegram, Blog, Newsletter) and category (General, DeFi, NFT, DAO, etc.). Update `Lastupdate.md`."

**Files to create**:
- `src/lib/templates/index.ts`
- `src/lib/templates/definitions/` (individual template files)
- `src/app/api/templates/route.ts`
- `src/components/templates/TemplateCard.tsx`
- `src/components/templates/TemplateGrid.tsx`
- `src/components/templates/TemplateSelector.tsx`

#### Step 3.4: Build Content Editor Interface

**Prompt for Cursor**: "Create the main content editor component at `src/components/editor/ContentEditor.tsx`. This is the core UI for content generation. It should have: left panel with configuration (project selector, platform dropdown, content type selector, tone slider from degen to institutional, voice profile selector, topic input, key points textarea, advanced options accordion), right panel with live preview of generated content in platform-specific formatting, generate button with loading state (pulsing gradient animation), action buttons (copy, edit inline, regenerate, save to library), and platform toggle tabs to see how content looks on different platforms. Use Framer Motion for the generation animation and typewriter effect for content reveal. Connect to the /api/generate endpoint. Update `Lastupdate.md`."

**Files to create**:
- `src/components/editor/ContentEditor.tsx`
- `src/components/editor/ConfigPanel.tsx`
- `src/components/editor/PreviewPanel.tsx`
- `src/components/editor/GenerationAnimation.tsx`
- `src/components/editor/PlatformToggle.tsx`

#### Step 3.5: Create Dashboard Page

**Prompt for Cursor**: "Build the main dashboard at `src/app/dashboard/page.tsx`. The dashboard should include: welcome header with personalized greeting ("gm, [username]"), quick generate widget (mini version of the editor), recent content section showing last 5 generated pieces with metadata, content stats cards (generations this week, published count, scheduled count, top format), templates section with quick-access popular templates, and trending in Web3 section (static for MVP, dynamic in future). Fetch data from Supabase on the server side using React Server Components. Protect the route — redirect unauthenticated users to /auth/login. Update `Lastupdate.md`."

**Files to create/modify**:
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/WelcomeHeader.tsx`
- `src/components/dashboard/QuickGenerate.tsx`
- `src/components/dashboard/RecentContent.tsx`
- `src/components/dashboard/ContentStats.tsx`
- `src/components/dashboard/TrendingTopics.tsx`

---

### Phase 4: Voice Training & Projects (Week 3-4)

#### Step 4.1: Build Project Management

**Prompt for Cursor**: "Create the project management system. Create `src/app/api/projects/route.ts` for CRUD operations on projects (GET list, POST create, PATCH update, DELETE). Create `src/app/projects/page.tsx` for the projects listing page with cards for each project. Create `src/components/projects/ProjectCard.tsx`, `ProjectForm.tsx` (create/edit modal), and `ProjectDeleteDialog.tsx`. Include project type icons, tone indicator, and platform badges. Protect all routes with auth check. Update `Lastupdate.md`."

**Files to create**:
- `src/app/api/projects/route.ts`
- `src/app/projects/page.tsx`
- `src/components/projects/ProjectCard.tsx`
- `src/components/projects/ProjectForm.tsx`
- `src/components/projects/ProjectDeleteDialog.tsx`

#### Step 4.2: Create Voice Training Feature

**Prompt for Cursor**: "Build the voice training feature. Create `src/app/api/voice-profile/route.ts` for creating and managing voice profiles. The creation endpoint should accept training data (pasted text or uploaded file), analyze it to extract characteristics (tone, vocabulary, sentence length, emoji usage, technical depth), generate a system prompt for OpenAI that captures the voice, and save everything to the voice_profiles table. Create `src/app/voice-training/page.tsx` with: upload/paste area for training content, analysis results display with detected characteristics, sample output generation with the trained voice, and save/refine controls. Create `src/components/voice/VoiceAnalyzer.tsx`, `VoiceResults.tsx`, and `VoiceSample.tsx`. Update `Lastupdate.md`."

**Files to create**:
- `src/app/api/voice-profile/route.ts`
- `src/app/voice-training/page.tsx`
- `src/components/voice/VoiceAnalyzer.tsx`
- `src/components/voice/VoiceResults.tsx`
- `src/components/voice/VoiceSample.tsx`
- `src/lib/openai/voice-analysis.ts`

---

### Phase 5: Content Library & Analytics (Week 4)

#### Step 5.1: Build Content Library

**Prompt for Cursor**: "Create the content library page at `src/app/library/page.tsx`. This is where users view, search, and manage all their generated content. Features: grid/list view toggle, search by title/content, filter by platform, content type, status (draft/published/scheduled/archived), date range filter, sort options (newest, oldest, most engaged), content cards showing preview, platform icon, creation date, and action menu (copy, edit, delete, export), and pagination or infinite scroll. Fetch data from Supabase with proper RLS. Update `Lastupdate.md`."

**Files to create**:
- `src/app/library/page.tsx`
- `src/app/api/content/route.ts` (list with filtering)
- `src/components/library/ContentGrid.tsx`
- `src/components/library/ContentFilters.tsx`
- `src/components/library/ContentCard.tsx`

#### Step 5.2: Create Analytics Dashboard (MVP Version)

**Prompt for Cursor**: "Build a basic analytics dashboard at `src/app/analytics/page.tsx`. MVP version should show: generations over time (last 30 days bar chart), content breakdown by platform (pie chart), content breakdown by type (bar chart), most used templates list, token usage tracking, and subscription usage (generations used vs. limit). Use a simple charting library like `recharts`. Data comes from usage_logs table. Update `Lastupdate.md`."

**Files to create**:
- `src/app/analytics/page.tsx`
- `src/app/api/analytics/route.ts`
- `src/components/analytics/GenerationChart.tsx`
- `src/components/analytics/PlatformBreakdown.tsx`
- `src/components/analytics/UsageStats.tsx`

---

### Phase 6: Payments & Subscriptions (Week 4-5)

#### Step 6.1: Integrate Stripe Checkout

**Prompt for Cursor**: "Integrate Stripe for subscription payments. Create `src/lib/stripe/client.ts` for the Stripe client initialization. Create `src/app/api/stripe/checkout/route.ts` for creating checkout sessions (POST with priceId and userId). Create `src/app/api/stripe/webhook/route.ts` for handling Stripe webhooks (checkout.session.completed, invoice.paid, invoice.payment_failed, customer.subscription.deleted). The webhook should update the subscriptions table and user subscription_tier. Create `src/components/billing/CheckoutButton.tsx` that redirects to Stripe Checkout. Create `src/components/billing/PricingCard.tsx` for the pricing page. Update `Lastupdate.md`."

**Files to create**:
- `src/lib/stripe/client.ts`
- `src/app/api/stripe/checkout/route.ts`
- `src/app/api/stripe/webhook/route.ts`
- `src/components/billing/CheckoutButton.tsx`
- `src/components/billing/PricingCard.tsx`

#### Step 6.2: Build Pricing Page

**Prompt for Cursor**: "Create the pricing page at `src/app/pricing/page.tsx`. Display four tiers: Free ($0), Creator ($29/mo), Pro ($69/mo), and Agency ($199/mo). Each card should list features with checkmarks, highlight the most popular plan (Pro), include monthly/annual toggle (annual shows 20% discount), and have CTA buttons that redirect to Stripe Checkout (or show 'Current Plan' if user is already subscribed). Use the electricIndigo gradient for the recommended plan. Style with the NicheCanvas dark theme. Update `Lastupdate.md`."

**Files to create**:
- `src/app/pricing/page.tsx`
- `src/components/pricing/PricingToggle.tsx`
- `src/components/pricing/FeatureList.tsx`

#### Step 6.3: Implement Subscription Guards

**Prompt for Cursor**: "Implement subscription-based feature guards. Create `src/lib/subscription/guards.ts` with functions: `canGenerate(user)` checks if user has remaining generations, `canUseVoiceTraining(user)` checks tier eligibility, `canAddTeamMember(user, currentCount)` checks team limits, `canUseTemplate(user, template)` checks premium template access, and `getGenerationLimit(tier)` returns monthly limit. Create a React hook `useSubscription()` that exposes these guards and subscription status. Apply guards to the generate API route and UI elements (disable premium features for free users with upgrade tooltip). Update `Lastupdate.md`."

**Files to create**:
- `src/lib/subscription/guards.ts`
- `src/hooks/useSubscription.ts`
- `src/components/subscription/UpgradeTooltip.tsx`
- `src/components/subscription/PremiumBadge.tsx`

---

### Phase 7: Landing Page & Marketing (Week 5-6)

#### Step 7.1: Build Landing Page

**Prompt for Cursor**: "Create the marketing landing page at `src/app/(marketing)/page.tsx`. The page should have: hero section with headline 'AI Content That Actually Sounds Like Web3', subheadline explaining the value prop, live demo widget (pre-filled example that visitors can generate without signup), social proof section with testimonial cards, features grid (Web3-native content, multi-platform formatting, voice training, community templates), how it works section (3 steps: choose template, customize, generate), pricing preview with 'View Full Pricing' link, and CTA sections. Use Framer Motion for scroll animations. Update `Lastupdate.md`."

**Files to create**:
- `src/app/(marketing)/page.tsx`
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/DemoWidget.tsx`
- `src/components/landing/FeaturesGrid.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/SocialProof.tsx`
- `src/components/landing/CTASection.tsx`

#### Step 7.2: Create Navigation & Layout Components

**Prompt for Cursor**: "Build the application shell components. Create `src/components/layout/AppShell.tsx` for the authenticated app layout with sidebar navigation. Create `src/components/layout/Sidebar.tsx` with navigation items: Dashboard, Generate, Library, Voice Training, Analytics, Settings, and Upgrade CTA (for free users). Create `src/components/layout/Navbar.tsx` for the top navigation with logo, search, notifications bell, and user menu. Create `src/components/layout/MarketingLayout.tsx` for the marketing pages (landing, pricing) with different navigation. Include responsive mobile menu. Update `Lastupdate.md`."

**Files to create**:
- `src/components/layout/AppShell.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/MarketingLayout.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/layout/Footer.tsx`

#### Step 7.3: Add SEO & Meta Tags

**Prompt for Cursor**: "Set up SEO for the application. Create `src/lib/seo/config.ts` with default metadata (title template, description, keywords, OG image settings). Update `src/app/layout.tsx` with proper metadata, Open Graph tags, and Twitter card tags. Create `src/app/robots.ts` and `src/app/sitemap.ts` for SEO. Update `Lastupdate.md`."

**Files to create/modify**:
- `src/lib/seo/config.ts`
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

---

### Phase 8: Polish & Launch Preparation (Week 6)

#### Step 8.1: Add Error Boundaries & Loading States

**Prompt for Cursor**: "Implement error handling and loading states throughout the app. Create `src/components/error/ErrorBoundary.tsx` for catching React errors. Create `src/components/loading/` with: SkeletonCard, SkeletonGrid, PageLoader, and ContentGenerationLoader components. Update all data-fetching components to use these loading states. Create `src/app/error.tsx` and `src/app/not-found.tsx` for global error and 404 pages. Update `Lastupdate.md`."

**Files to create**:
- `src/components/error/ErrorBoundary.tsx`
- `src/components/error/ErrorFallback.tsx`
- `src/components/loading/SkeletonCard.tsx`
- `src/components/loading/SkeletonGrid.tsx`
- `src/components/loading/PageLoader.tsx`
- `src/components/loading/ContentGenerationLoader.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`

#### Step 8.2: Implement Toast Notifications

**Prompt for Cursor**: "Add a toast notification system. Use `sonner` library for toasts. Install it and create `src/components/ui/Toaster.tsx`. Create a hook `src/hooks/useToast.ts` that wraps sonner with NicheCanvas styling (dark theme, semantic colors). Add toast calls for: successful content generation, save operations, copy to clipboard, errors, and subscription events. Update `Lastupdate.md`."

**Commands**:
```bash
npm install sonner
```

**Files to create**:
- `src/components/ui/Toaster.tsx`
- `src/hooks/useToast.ts`

#### Step 8.3: Add Responsive Design & Mobile Optimization

**Prompt for Cursor**: "Ensure the entire application is fully responsive. Review all components for mobile usability: sidebar should become a hamburger menu on mobile, content editor should stack panels vertically on small screens, dashboard cards should reflow to single column, template grid should reduce columns on smaller screens, tables should become cards on mobile, and tap targets should be at least 44px. Test all breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px). Update `Lastupdate.md`."

**Files to review and modify**: All page and component files

#### Step 8.4: Performance Optimization

**Prompt for Cursor**: "Optimize the application for performance. Implement: dynamic imports with `next/dynamic` for heavy components (charts, editor), image optimization with `next/image` for all images, font optimization (already using next/font), route prefetching, API response caching headers, and React Server Components where possible for data fetching. Run `npm run build` and verify no build errors. Check Lighthouse scores (target: 90+ for all categories). Update `Lastupdate.md`."

**Files to review and modify**: All page files, component imports

#### Step 8.5: Final Testing & Deployment

**Prompt for Cursor**: "Perform final testing and prepare for deployment. Steps: run `npm run build` and fix any errors, run `npm run lint` and fix warnings, test all auth flows (signup, login, logout, password reset), test content generation end-to-end, test subscription upgrade flow with Stripe test mode, test on mobile viewport, verify all environment variables are documented, create `README.md` with setup instructions, and deploy to Vercel by connecting the GitHub repository. After successful deployment, update `Lastupdate.md` with final status and mark the project as MVP complete."

**Commands**:
```bash
npm run build
npm run lint
```

---

### Post-MVP Feature Roadmap

Features planned for after initial launch, in priority order:

| Priority | Feature | Description | Estimated Effort |
|----------|---------|-------------|------------------|
| P1 | **Twitter/X Integration** | Direct posting via Twitter API, thread formatting | 1 week |
| P1 | **Discord/Telegram Bots** | Bot integrations for generating content directly in communities | 1-2 weeks |
| P2 | **Content Calendar** | Drag-and-drop scheduling with optimal timing recommendations | 1 week |
| P2 | **Real-time Narrative Tracking** | Integration with Kaito AI or similar for trending topic suggestions | 1 week |
| P2 | **Team Collaboration** | Comments, approvals, role-based access | 1 week |
| P3 | **Advanced Analytics** | Engagement tracking, content performance scoring | 1 week |
| P3 | **Chrome Extension** | Generate content while browsing Twitter/Discord | 1 week |
| P3 | **Custom Model Fine-tuning** | Fine-tune OpenAI models on project-specific datasets | 2 weeks |
| P4 | **API for Developers** | REST API with API key authentication | 1 week |
| P4 | **White-label for Agencies** | Custom branding, client workspaces | 1 week |

---

## Appendix A: Content Generation Prompts Library

### System Message Template

```
You are an expert Web3 content strategist and community manager. You specialize in creating authentic, engaging content for {project_type} projects.

Your writing style for this project:
- Tone: {tone_description} (on a scale of 1-10: {tone_value})
- Technical depth: {technical_depth}
- Community awareness: High (you understand crypto culture, memes, and community dynamics)
- Authenticity: You never sound like corporate marketing — you sound like a passionate community member

Rules:
- Use appropriate Web3 terminology naturally (DeFi, DAO, NFT, TVL, APY, etc.)
- Match the voice characteristics: {voice_characteristics}
- Include relevant emojis where appropriate (don't overdo it)
- Keep sentences punchy and engaging
- Always include a clear call-to-action
- Fact-check technical claims (don't make up numbers)
- Avoid hype language that sounds like a scam ("guaranteed returns", "100x potential")

Platform formatting for {platform}:
{platform_formatting_rules}
```

### Template Examples (for seed data)

**Twitter Thread - Product Launch**:
```
Create a 5-tweet announcement thread for {project_name} launching {feature_name}.

Key points to include:
{key_points}

Format as a Twitter thread with:
- Hook tweet that grabs attention
- Problem/solution narrative
- Feature highlights with bullet points
- Social proof or metrics if available
- Call-to-action with links

Use an enthusiastic but credible tone. Include relevant hashtags.
```

**Discord Announcement - Community Update**:
```
Write a Discord server announcement for {project_name} about {topic}.

Tone: {tone} | Include: @everyone ping at start, clear section headers, emoji bullet points, and a closing call-to-action.

Key information:
{key_points}

Keep it scannable — Discord users skim. Use bold headers and short paragraphs.
```

**Telegram Update - Market Commentary**:
```
Write a concise Telegram message from {project_name} about recent market developments.

Topic: {topic}
Key points: {key_points}

Style: Brief, informative, slightly informal. Include relevant market context. End with a community question to drive engagement.
```

---

## Appendix B: API Specification

### Content Generation Endpoint

**POST** `/api/generate`

**Headers**:
```
Authorization: Bearer [supabase_jwt_token]
Content-Type: application/json
```

**Request Body**:
```json
{
  "project_id": "uuid",
  "template_id": "uuid",
  "platform": "twitter",
  "content_type": "announcement_thread",
  "tone": 65,
  "voice_profile_id": "uuid | null",
  "topic": "Product launch announcement",
  "key_points": ["Zero fees", "$12M TVL", "4200 holders"],
  "length": "medium",
  "include_hashtags": true,
  "include_cta": true
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Product Launch Thread",
    "body": "🧵 1/5 Why @DeFiAlpha is changing the yield farming game...",
    "platform": "twitter",
    "content_type": "announcement_thread",
    "metadata": {
      "hashtags": ["#DeFi", "#YieldFarming"],
      "mentions": ["@DeFiAlpha"],
      "thread_count": 5
    },
    "tokens_used": 1247,
    "created_at": "2026-06-10T12:00:00Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing auth token
- `429 Too Many Requests`: Rate limit exceeded
- `403 Forbidden`: Subscription tier doesn't allow this feature
- `500 Internal Server Error`: AI generation failed

---

## Appendix C: Database Index Recommendations

```sql
-- Performance indexes
CREATE INDEX idx_content_pieces_project_id ON content_pieces(project_id);
CREATE INDEX idx_content_pieces_created_at ON content_pieces(created_at DESC);
CREATE INDEX idx_content_pieces_status ON content_pieces(status);
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at DESC);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_templates_platform ON templates(platform);
CREATE INDEX idx_templates_category ON templates(category);
```

---

*This document was generated on June 10, 2026. All market data, pricing, and competitive information reflects research conducted on that date. The agentic build plan is designed to be self-contained — no additional research should be needed before beginning implementation.*
