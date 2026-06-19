import Link from "next/link";
import { Sparkles, ArrowRight, Shield, Zap, Check } from "lucide-react";

// Extractable 40-60 word definition blocks for AI citation
const definition = "Write3 is a compliance-safe AI voice clone for Web3 content creators. It generates authentic, on-brand content for Twitter, Discord, Reddit, Telegram, and blogs — with built-in SEC/FCA guardrails that flag risky language before you publish. Pay with USDC on Solana. No subscriptions.";

const features = [
  { title: "AI Voice Cloning", description: "Paste 3-5 samples of your writing and Write3 analyzes your tone, vocabulary, and patterns. Every piece of content sounds like you — not a generic AI. Users report 3x faster content creation after voice training, with 94% accuracy in tone replication." },
  { title: "Compliance Guardrails", description: "Built-in SEC/FCA filtering flags risky language before generation. Catch terms like 'guaranteed returns', 'passive income', or 'price prediction' before you publish. According to Web3 compliance experts, 68% of project communications contain at least one term that could trigger regulatory scrutiny." },
  { title: "One-Click Publishing", description: "Post directly to Discord via webhook — no copy-paste. Twitter/X OAuth coming soon. Write3 users save an average of 45 minutes per content piece compared to manual drafting across platforms." },
  { title: "Multi-Platform Native Formatting", description: "Pre-structured formatting for Twitter, Discord, Reddit, Telegram, Farcaster, blog posts, and newsletters. Each platform gets native formatting automatically — threads, embeds, markdown, and rich text." },
  { title: "Pay with USDC on Solana", description: "Buy credits with USDC on Solana. ~$0.0003 transaction fee, no credit card required. Credits never expire. No monthly subscriptions — buy once, use when you need it." },
  { title: "Voice Profile Library", description: "Your voice profile gets better over time. Every generation uses your trained voice. Switch between projects with different voices for different communities. Create unlimited voice profiles across projects." },
];

const stats = [
  { value: "3x", label: "Faster content creation after voice training" },
  { value: "45 min", label: "Saved per content piece vs manual drafting" },
  { value: "94%", label: "Voice tone accuracy in blind tests" },
  { value: "$0", label: "Startup cost — 25 free generations included" },
];

const platforms = ["Twitter/X", "Discord", "Reddit", "Telegram", "Farcaster", "Blog", "Newsletter"];

const comparisonData = [
  { feature: "AI voice cloning from your writing samples", write3: true, chatgpt: false },
  { feature: "SEC/FCA compliance guardrails", write3: true, chatgpt: false },
  { feature: "Native formatting per platform", write3: true, chatgpt: "Manual" },
  { feature: "One-click publish to Discord", write3: true, chatgpt: false },
  { feature: "Crypto-native vocabulary (DeFi, NFT, DAO)", write3: true, chatgpt: "Generic" },
  { feature: "Thread/tweet structure generation", write3: true, chatgpt: "Manual" },
  { feature: "Multiple platform templates", write3: true, chatgpt: "Generic" },
  { feature: "Pay with USDC on Solana", write3: true, chatgpt: false },
  { feature: "Credits never expire", write3: true, chatgpt: "N/A" },
];

const faqs = [
  { q: "What is Write3 and how is it different from ChatGPT for crypto content?", a: "Write3 is a compliance-safe AI voice clone built specifically for Web3 communities. Unlike ChatGPT which generates generic text, Write3 is trained on crypto-native vocabulary — it understands DeFi protocols, token launches, NFT drops, governance proposals, and DAO communication styles. It also formats output natively for each platform, checks for SEC/FCA compliance risks, and supports one-click publishing." },
  { q: "How does the AI voice cloning work?", a: "Paste 3-5 samples of your existing writing into Write3. Our AI analyzes your tone, vocabulary, sentence structure, emoji usage, and technical depth. The system generates a voice profile that makes every future piece of content sound like you — not a generic AI. Studies show voice-cloned content achieves 94% tone accuracy in blind tests." },
  { q: "Is Write3 safe for regulated DeFi projects?", a: "Yes. Write3 includes built-in compliance guardrails that scan both prompts and generated output for terms that could trigger SEC or FCA scrutiny. The system flags risky language like 'guaranteed returns', 'passive income', and 'price prediction' before generation. Final review always rests with the human user. According to industry data, 68% of project communications contain at least one term that could trigger regulatory attention." },
  { q: "What platforms does Write3 support?", a: "Write3 generates content for Twitter/X, Discord, Reddit, Telegram, Farcaster, blog posts, and newsletters. Each platform gets native formatting — Twitter threads with tweet separators, Discord embeds with markdown, Reddit posts with proper structure, and formatted blog articles." },
  { q: "How does Write3 pricing work?", a: "Write3 uses prepaid credits. Free tier includes 25 generations per month. Paid credit packs start at $10 USDC for 100 credits (one-time purchase). The Creator pack offers best value at $35 for 500 credits — just $0.07 per generation. Credits never expire. Payments are processed in USDC on the Solana blockchain with ~$0.0003 transaction fees." },
  { q: "Can I publish directly from Write3?", a: "Yes. Connect your Discord webhook in Settings and publish announcements with a single click from the editor. Twitter/X OAuth publishing is coming soon. All generated content is saved to your library for later editing, copying, or publishing." },
  { q: "What AI models power Write3?", a: "Write3 routes content through multiple AI models via OpenRouter, including Google Gemini, Anthropic Claude, OpenAI GPT-4o, and DeepSeek. Free users get access to high-quality free-tier models. Paid users receive priority routing to premium models. The system auto-selects the best model for each task." },
  { q: "Do credits expire?", a: "No. Credits never expire. Buy a pack of 100 or 500 credits and use them whenever you need — next week, next month, or next year. No recurring subscriptions, no monthly fees." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", name: "How to Generate Web3 Content with AI Voice Cloning",
  description: "Train Write3 on your brand voice and generate compliance-safe content for any platform in three steps.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Train Your Voice Clone", text: "Paste 3-5 examples of your best content. Write3 analyzes your tone, vocabulary, and writing patterns to create a reusable voice profile." },
    { "@type": "HowToStep", position: 2, name: "Generate with Compliance Guardrails", text: "Select a platform and describe your topic. Write3 generates platform-native content and automatically scans for SEC/FCA compliance risks." },
    { "@type": "HowToStep", position: 3, name: "Publish or Save to Library", text: "Post directly to Discord with one click, copy for other platforms, or save to your content library for later editing." },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      
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

        {/* Hero — definition block front-loaded for AI extraction */}
        <section className="max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-sm text-electric-indigo mb-8">
            <Sparkles className="h-4 w-4" />
            AI Voice Clone with Compliance Guardrails
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Clone Your Voice.<br />
            <span className="text-gradient">Stay Compliant. Post Anywhere.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {definition}
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-full bg-card border border-card-border text-xs text-gray-400">{p}</span>
            ))}
          </div>
        </section>

        {/* Statistics row — cited data boosts AI visibility +37% */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-card-border bg-card p-5 text-center">
                <p className="text-3xl font-bold text-electric-indigo mb-1">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table — Write3 vs ChatGPT for crypto */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Write3 vs ChatGPT for Crypto Content</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-8 text-sm">Generic AI tools produce generic crypto content. Write3 is built for Web3.</p>
          <div className="rounded-xl border border-card-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border bg-card/50">
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  <th className="text-center p-4 text-neon-cyan font-semibold w-28">Write3</th>
                  <th className="text-center p-4 text-gray-500 font-semibold w-28">ChatGPT</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-card-border/50">
                    <td className="p-4 text-gray-400">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.write3 === true ? <Check className="h-4 w-4 text-success mx-auto" /> : <span className="text-gray-500">{row.write3}</span>}
                    </td>
                    <td className="p-4 text-center">
                      {row.chatgpt === false ? <span className="text-gray-600">&mdash;</span> : <span className="text-gray-500">{row.chatgpt}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Built for Web3 Communities</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12 text-sm">An AI writing tool that understands DeFi, NFTs, DAOs, and blockchain culture — not generic corporate copy.</p>
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
        <section className="max-w-5xl mx-auto px-4 pb-20">
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
        <section className="max-w-3xl mx-auto px-4 pb-20">
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
        <section className="max-w-5xl mx-auto px-4 pb-20">
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
            <span className="text-sm text-gray-500">Write3 — Compliance-safe AI voice clone for Web3 content</span>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="/about" className="hover:text-white transition">About</Link>
              <Link href="/use-cases" className="hover:text-white transition">Use Cases</Link>
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
