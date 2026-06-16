"use client";

import { useState } from "react";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { Sparkles, ArrowRight, AtSign, MessageCircle, Send, Newspaper, BookOpen, Quote, Star, Shield, Zap, Globe, Brain, RefreshCw, Check, Layers, Building2, Users, FileText, Cpu } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Brain, title: "Web3-Native Content", description: "AI that understands DeFi, NFTs, DAOs, and blockchain culture. No more generic corporate copy." },
  { icon: Globe, title: "Multi-Platform Formatting", description: "Pre-structured output tailored for Twitter threads, Discord announcements, Telegram updates, and more." },
  { icon: Zap, title: "Brand Style Alignment", description: "Analyze your existing content to create style profiles that guide AI to match your community's unique voice." },
  { icon: Star, title: "Premium Templates", description: "Purpose-built templates for product launches, governance proposals, AMAs, and market commentary." },
  { icon: Shield, title: "Enterprise Ready", description: "RLS-protected data, team collaboration, and white-label options for agencies." },
  { icon: Layers, title: "Human-in-the-Loop Design", description: "AI-assisted drafting that puts you in control. Every piece of content requires human review and approval before publishing." },
];

const caseStudies = [
  { quote: "Write3 saves us 15+ hours a week on content drafting. The brand style alignment is remarkable — it captures our community voice while we review and refine before posting.", author: "Alex Chen", role: "Community Lead, DeFi Protocol", result: "15+ hrs/week saved" },
  { quote: "Finally, an AI tool that doesn't sound like a corporate blog. The structured drafting for Telegram and Discord lets our team produce consistent updates that our community loves.", author: "Sarah M.", role: "CMO, NFT Project", result: "3x content output" },
  { quote: "We manage 8 client projects. Write3's agency plan with brand style profiles for each client is a game changer for our team's productivity.", author: "Marcus Williams", role: "Founder, Web3 Marketing Agency", result: "8 client successes" },
];

const platforms = [
  { icon: AtSign, name: "Twitter/X" },
  { icon: MessageCircle, name: "Discord" },
  { icon: Send, name: "Telegram" },
  { icon: Newspaper, name: "Blog" },
  { icon: BookOpen, name: "Newsletter" },
];

const tones = [
  { id: "degen", label: "Degen" },
  { id: "professional", label: "Professional" },
  { id: "dao", label: "DAO Governance" },
];

const sampleInputs: Record<string, string> = {
  degen: "gm. just shipped the new v2 contract. audit passed, LP incentives go live tomorrow. let's send it.",
  professional: "We are pleased to announce the successful completion of our v2 contract audit. Liquidity incentives will be activated tomorrow.",
  dao: "Proposal: Allocate 50,000 tokens from the treasury to fund the Q3 developer grant program. Voting begins in 48 hours.",
};

const comparisons = [
  { feature: "Web3 Context", chatgpt: "General", write3: "Deep/Native", human: "Expert" },
  { feature: "Brand Voice", chatgpt: "Requires complex prompting", write3: "Instant Alignment", human: "High" },
  { feature: "Speed", chatgpt: "Fast", write3: "Instant", human: "Slow" },
  { feature: "Cost", chatgpt: "Low", write3: "Competitive", human: "High" },
  { feature: "Social Formatting", chatgpt: "Manual", write3: "Automatic", human: "Manual" },
];

export default function LandingPage() {
  const [playgroundText, setPlaygroundText] = useState("");
  const [playgroundTone, setPlaygroundTone] = useState("professional");
  const [optimizedText, setOptimizedText] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    if (!playgroundText.trim()) return;
    setIsOptimizing(true);
    setTimeout(() => {
      const toneLabel = tones.find(t => t.id === playgroundTone)?.label || "Professional";
      const input = sampleInputs[playgroundTone] || "";
      setOptimizedText(`[${toneLabel}-Optimized via Write3 Style Alignment]\n\n${input || playgroundText}\n\n— Drafted with Write3 AI assistance. Human review recommended before publishing.`);
      setIsOptimizing(false);
    }, 1200);
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-indigo/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-indigo/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 py-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-sm text-electric-indigo mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Web3 Content Productivity Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI Content That<br />
            <span className="text-gradient">Actually Sounds Like Web3</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Draft authentic Discord announcements, Twitter threads, Telegram updates, and blog posts that capture your community's voice — with AI assistance designed for human creators who review and approve every piece before publishing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-premium px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start Creating Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-card-border px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:border-gray-500/30 transition"
            >
              View Pricing
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-card-border">
                <p.icon className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Alignment Playground */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-sm text-neon-cyan mb-4">
            <Zap className="h-4 w-4" />
            Try It Now
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            See Brand Alignment <span className="text-gradient">in Action</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Paste any text, pick a tone, and watch Write3 optimize it for your Web3 community.
          </p>
        </div>

        <div className="rounded-2xl border border-card-border bg-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-card-border">
              <h3 className="text-sm font-semibold text-white mb-4">Your Input</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Select Tone</label>
                  <div className="flex gap-2">
                    {tones.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setPlaygroundTone(t.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition cursor-pointer ${
                          playgroundTone === t.id
                            ? "bg-electric-indigo/10 text-electric-indigo border-electric-indigo/20"
                            : "border-card-border text-gray-500 hover:text-white hover:border-gray-500/30"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Paste your text or use sample</label>
                  <textarea
                    value={playgroundText}
                    onChange={(e) => setPlaygroundText(e.target.value)}
                    placeholder="Paste a short announcement, update, or any text you want to optimize..."
                    rows={5}
                    className="w-full bg-deep-space border border-card-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-indigo/50 transition resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleOptimize}
                    disabled={isOptimizing || !playgroundText.trim()}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-premium px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                  >
                    {isOptimizing ? (
                      <><RefreshCw className="h-4 w-4 animate-spin" /> Aligning Style...</>
                    ) : (
                      <><Zap className="h-4 w-4" /> Optimize for Web3</>
                    )}
                  </button>
                  {Object.entries(sampleInputs).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPlaygroundText(val)}
                      className="px-3 py-2 rounded-lg border border-card-border text-xs text-gray-500 hover:text-white hover:border-gray-500/30 transition cursor-pointer"
                    >
                      Sample
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 relative">
              <div className="flex items-center gap-2 mb-4">
                <div className={`h-2 w-2 rounded-full ${isOptimizing ? "bg-neon-cyan animate-pulse" : playgroundText && optimizedText ? "bg-success" : "bg-gray-600"}`} />
                <h3 className="text-sm font-semibold text-white">
                  {isOptimizing ? "Aligning..." : optimizedText ? "Write3-Optimized" : "Preview"}
                </h3>
              </div>

              {isOptimizing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-premium flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-premium animate-ping opacity-20" />
                  </div>
                  <p className="text-sm text-gray-500">Applying style alignment...</p>
                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              ) : optimizedText ? (
                <div className="rounded-lg border border-success/20 bg-success/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-xs font-medium text-success">Style Aligned</span>
                  </div>
                  <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{optimizedText}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-gray-600">Enter text above and select a tone to see Write3's brand alignment in action</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Built for Web3 Communities
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Every feature designed to help community managers draft better content more efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-xl border border-card-border bg-card p-6 hover:border-electric-indigo/30 transition">
                <div className="p-2.5 rounded-lg bg-electric-indigo/10 w-fit mb-4">
                  <Icon className="h-5 w-5 text-electric-indigo" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why <span className="text-gradient">Write3</span>?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            See how Write3 compares to generic AI tools and traditional human writers for Web3 content creation.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="text-center px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ChatGPT (Generic)</th>
                  <th className="text-center px-5 py-4 text-xs font-semibold text-gradient uppercase tracking-wider">Write3 AI</th>
                  <th className="text-center px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Human Writer</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={row.feature} className={i < comparisons.length - 1 ? "border-b border-card-border" : ""}>
                    <td className="px-5 py-4 font-medium text-white">{row.feature}</td>
                    <td className="px-5 py-4 text-center text-gray-500">{row.chatgpt}</td>
                    <td className="px-5 py-4 text-center font-semibold text-neon-cyan">{row.write3}</td>
                    <td className="px-5 py-4 text-center text-gray-500">{row.human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Web3 Builders
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            See how teams use Write3 as their content drafting productivity tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((t, i) => (
            <div key={i} className="rounded-xl border border-card-border bg-card p-6 relative flex flex-col">
              <Quote className="h-6 w-6 text-electric-indigo/30 mb-3" />
              <p className="text-sm text-gray-300 mb-4 leading-relaxed flex-1">{t.quote}</p>
              <div className="border-t border-card-border pt-3 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
                    <span className="text-xs font-medium text-success">{t.result}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology & Transparency */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="rounded-2xl border border-card-border bg-card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-5 w-5 text-electric-indigo" />
                <h3 className="text-lg font-semibold text-white">AI Model Transparency</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Write3 leverages industry-leading large language models including <strong className="text-white">GPT-4o</strong>, <strong className="text-white">Claude 3.5 Sonnet</strong>, and <strong className="text-white">Google Gemini</strong> to deliver high-quality, contextually aware content generation. Our platform combines these foundation models with proprietary prompt engineering and style alignment technology.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-success" />
                <h3 className="text-lg font-semibold text-white">Safety & Moderation</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Write3 implements robust content moderation and filtering mechanisms leveraging advanced AI safety features to prevent prohibited content generation. We provide clear mechanisms for users to report misuse at <strong className="text-white">abuse@write3.io</strong>. All reports are investigated with appropriate action taken, including account termination for verified violations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="rounded-2xl border border-card-border bg-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/5 via-transparent to-neon-cyan/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Authentic Web3 Content?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Join hundreds of Web3 community managers already using Write3 as their content drafting productivity tool. Start free, no credit card required.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-premium px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start Creating Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
