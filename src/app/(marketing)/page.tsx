import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const features = [
  { title: "AI Voice Cloning", description: "Paste 3-5 samples of your writing and Write3 analyzes your tone, vocabulary, and patterns. Every piece of content sounds like you — not a generic AI." },
  { title: "Compliance Guardrails", description: "Built-in SEC/FCA filtering flags risky language before generation. Catch terms like 'guaranteed returns', 'passive income', or 'price prediction' before you publish." },
  { title: "One-Click Publishing", description: "Post directly to Discord via webhook — no copy-paste. Twitter/X OAuth coming soon. Works for threads, announcements, and updates." },
  { title: "Multi-Platform Native Formatting", description: "Pre-structured formatting for Twitter, Discord, Reddit, Telegram, Farcaster, blog posts, and newsletters. Each platform gets native formatting automatically." },
  { title: "Pay with USDC on Solana", description: "Buy credits with USDC on Solana. ~$0.0003 transaction fee, no credit card required. Credits never expire. No subscriptions." },
  { title: "Voice Profile Library", description: "Your voice profile gets better over time. Every generation uses your trained voice. Switch between projects with different voices for different communities." },
];

const platforms = ["Twitter/X", "Discord", "Reddit", "Telegram", "Farcaster", "Blog", "Newsletter"];

const faqs = [
  { q: "What is Write3 and how does it work?", a: "Write3 is an AI-powered content generator built specifically for Web3 communities. You select a platform (Twitter, Discord, Reddit, etc.), choose your tone, and describe your topic. Write3 generates platform-native content that you can review, edit, and publish directly." },
  { q: "How is Write3 different from ChatGPT for crypto content?", a: "ChatGPT generates generic text that crypto audiences often recognize as AI-written. Write3 is trained on Web3-specific context — it understands DeFi protocols, token launches, NFT drops, governance proposals, and DAO communication styles. It also formats output natively for each platform and supports one-click publishing." },
  { q: "Can I post directly to Twitter and Discord?", a: "Yes. Connect your Twitter account via OAuth in Settings and you can post threads and tweets directly from the Write3 editor. For Discord, paste a webhook URL and send announcements with a single click." },
  { q: "How does the pricing work?", a: "Write3 uses prepaid credits. Free tier includes 25 generations per month. Paid credit packs start at $10 USDC for 100 credits (one-time purchase). Credits never expire. Payments are processed in USDC on the Solana blockchain — no credit card needed." },
  { q: "What platforms does Write3 support?", a: "Write3 supports Twitter/X, Discord, Reddit, Telegram, Farcaster, blog posts, and newsletters. Each platform gets native formatting — Twitter threads, Discord embeds, Reddit posts, etc." },
  { q: "Can I train Write3 on my brand's voice?", a: "Yes. Upload or paste existing content from your project and Write3 analyzes tone, vocabulary, sentence structure, emoji usage, and technical depth. The AI then generates new content that matches your community's established voice." },
  { q: "Is Write3 safe for regulated DeFi and token projects?", a: "Write3 includes built-in compliance guardrails that scan both prompts and generated output for terms that could trigger SEC or FCA scrutiny. Warnings appear before generation. The final review and approval always rests with the human user." },
  { q: "What AI models power Write3?", a: "Write3 routes content through multiple AI models via OpenRouter, including Google Gemini, Anthropic Claude, OpenAI GPT-4o, and DeepSeek. The system auto-selects the best model for each task." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="min-h-screen bg-deep-space font-sans">
        {/* Navigation */}
        <header className="border-b border-card-border bg-card/20 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-xl font-bold text-white">Write3</span>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm text-gray-400 hover:text-white transition">Sign In</Link>
              <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-lg bg-gradient-premium px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                Start Free
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-sm text-electric-indigo mb-8">
            <Sparkles className="h-4 w-4" />
            Compliance-Safe AI Voice Clone — Built for Web3
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Clone Your Voice.<br />
            <span className="text-gradient">Stay Compliant. Post Anywhere.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Write3 clones your brand voice and generates platform-native content for Twitter, Discord, Reddit — with built-in SEC/FCA guardrails that flag risky language before you post. Draft, check, and publish in one click.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-premium px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
              Clone Your Voice Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-card-border px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:border-gray-500/30 transition">
              View Pricing
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-xs text-success">Compliance Guardrails</span>
            <span className="px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-xs text-neon-cyan">Voice Cloning</span>
            <span className="px-3 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-xs text-electric-indigo">One-Click Publish</span>
            <span className="px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-xs text-warning">USDC on Solana</span>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-full bg-card border border-card-border text-xs text-gray-400">{p}</span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Built for Web3 Communities</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">An AI writing tool that understands DeFi, NFTs, DAOs, and blockchain culture — not generic corporate copy.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-card-border bg-card p-6 hover:border-electric-indigo/30 transition">
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Three Steps to Better Web3 Content</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">Clone your voice. Check compliance. Post everywhere.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-electric-indigo/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-electric-indigo">1</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Train Your Voice Clone</h3>
              <p className="text-sm text-gray-400">Paste 3-5 examples of your best content. Write3 learns your tone, vocabulary, and style in seconds.</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-electric-indigo/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-electric-indigo">2</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Generate with Guardrails</h3>
              <p className="text-sm text-gray-400">Choose platform and topic. Write3 generates platform-native content and scans for compliance risks before output.</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-electric-indigo/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-electric-indigo">3</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Post or Save</h3>
              <p className="text-sm text-gray-400">Publish to Discord with one click. Copy for Twitter, Reddit, Telegram. All content saved in your library.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">Everything you need to know about Write3.</p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-card-border bg-card p-5 group">
                <summary className="text-sm font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="rounded-2xl border border-card-border bg-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/5 via-transparent to-neon-cyan/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">Your Voice. Compliant. Everywhere.</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">25 free generations to start. No credit card. Pay with USDC on Solana when you need more.</p>
              <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-premium px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                Clone Your Voice Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-card-border py-8">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Write3 — AI-powered Web3 content generator</span>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
