import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Shield, Sparkles, Building2, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Write3 is a compliance-safe AI voice clone for Web3 content creators. Our platform generates authentic, on-brand content for crypto communities with built-in SEC/FCA guardrails. No generic AI writing.",
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org", "@type": "AboutPage",
    name: "About Write3",
    description: "Write3 is an AI-powered content productivity platform for Web3 communities, DAOs, and crypto projects. Built-in SEC/FCA guardrails, voice cloning, and multi-platform publishing.",
    mainEntity: {
      "@type": "Organization",
      name: "Write3",
      description: "Compliance-safe AI voice clone for Web3 content with built-in SEC/FCA compliance guardrails.",
    },
  };
  return (
    <div className="min-h-screen bg-deep-space font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <header className="border-b border-card-border bg-card/20 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">About Write3</h1>
        <p className="text-sm text-gray-500 mb-10">Compliance-safe AI voice clone for Web3 content creators</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Our Mission</h2>
            <p>
              Write3 helps Web3 community managers, DAO contributors, and marketing teams draft authentic, on-brand content faster — with built-in compliance guardrails that reduce regulatory risk. Every piece of content requires human review before publication. AI augments human creativity, it doesn't replace it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Our Technology</h2>
            <p className="mb-3">
              Write3 routes content through a dual-tier AI model system via OpenRouter. Free users get access to high-quality models including Google Gemini Flash and DeepSeek Chat at no cost. Paid users receive priority access to premium models including GPT-4o Mini, Claude Sonnet 4, and Gemini 2.5 Pro. The system automatically selects the best model for each task and silently degrades to free models if the premium API key has insufficient balance — ensuring zero interruptions.
            </p>
            <p className="mb-3">
              Our platform includes a proprietary AI voice cloning system that analyzes 3-5 writing samples to extract tone, vocabulary, sentence structure, emoji usage, and technical depth. This creates a reusable voice profile that makes every generation sound like the original author — not generic AI.
            </p>
            <p>
              Write3's compliance guardrails scan both prompts and generated output for terms that could trigger SEC or FCA scrutiny, including regulated financial language — a feature unique to Write3 among Web3 content tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Platform & Payments</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Zap className="h-4 w-4 text-electric-indigo flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Multi-Platform Output:</strong> Native formatting for Twitter/X threads, Discord announcements, Reddit posts, Telegram updates, Farcaster casts, blog articles, and newsletter issues — all from a single editor.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">USDC on Solana:</strong> Pay with USDC on Solana via NowPayments. No credit card required. ~$0.0003 transaction fee. No recurring subscriptions — credits never expire.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">One-Click Publishing:</strong> Post directly to Discord via webhook from the preview panel. Twitter/X OAuth publishing coming soon.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Our Commitment</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Ethical AI Use:</strong> We prohibit use of our platform for deepfakes, impersonation, fraudulent content, or any activity that violates our Terms of Service.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-electric-indigo flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Human in the Loop:</strong> Write3 is a drafting tool. All content must be reviewed, refined, and approved by humans before publication.</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Transparency:</strong> We clearly disclose AI assistance and provide users with the information they need to make informed decisions about the content they publish.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
            <p>
              Write3 is in active development. For questions, feedback, or support, reach us via the <Link href="/auth/login" className="text-electric-indigo hover:underline">dashboard</Link>. We aim to respond within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Report Misuse</h2>
            <p>
              If you encounter content generated through Write3 that violates our Terms of Service — including deepfakes, impersonation, fraud, hate speech, or prohibited content — report it through the dashboard. We investigate all reports and take appropriate action, including account termination.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
