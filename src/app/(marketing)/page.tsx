"use client";

import MarketingLayout from "@/components/layout/MarketingLayout";
import { Sparkles, ArrowRight, AtSign, MessageCircle, Send, Newspaper, BookOpen, Quote, Star, Shield, Zap, Globe, Brain } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Brain, title: "Web3-Native Content", description: "AI that understands DeFi, NFTs, DAOs, and blockchain culture. No more generic corporate copy." },
  { icon: Globe, title: "Multi-Platform Formatting", description: "One click formatting for Twitter threads, Discord announcements, Telegram updates, and more." },
  { icon: Zap, title: "Voice Training", description: "Train AI on your past content to generate in your project's unique community voice." },
  { icon: Star, title: "Premium Templates", description: "Purpose-built templates for product launches, governance proposals, AMAs, and market commentary." },
  { icon: Shield, title: "Enterprise Ready", description: "RLS-protected data, team collaboration, and white-label options for agencies." },
  { icon: Sparkles, title: "Unlimited Generations", description: "Upgrade to Creator and never worry about limits again. Generate as much as you need." },
];

const testimonials = [
  { quote: "Write3 saves us 15+ hours a week on content. The voice training is uncanny — it sounds exactly like our community.", author: "Alex Chen", role: "Community Lead, DeFi Protocol" },
  { quote: "Finally, an AI tool that doesn't sound like a corporate blog. The Telegram and Discord formatting is perfect.", author: "Sarah M.", role: "CMO, NFT Project" },
  { quote: "We manage 8 client projects. Write3's agency plan with voice training for each client is a game changer.", author: "Marcus Williams", role: "Founder, Web3 Marketing Agency" },
];

const platforms = [
  { icon: AtSign, name: "Twitter/X" },
  { icon: MessageCircle, name: "Discord" },
  { icon: Send, name: "Telegram" },
  { icon: Newspaper, name: "Blog" },
  { icon: BookOpen, name: "Newsletter" },
];

export default function LandingPage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-indigo/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-indigo/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 py-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-sm text-electric-indigo mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Web3 Content Generator
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI Content That<br />
            <span className="text-gradient">Actually Sounds Like Web3</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Generate authentic Discord announcements, Twitter threads, Telegram updates, and blog posts that capture your community's voice — not generic corporate marketing.
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

      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Built for Web3 Communities
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Every feature designed to make community managers more productive and content more authentic.
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

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Loved by Web3 Builders
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Community managers, founders, and agencies trust Write3.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl border border-card-border bg-card p-6">
              <Quote className="h-6 w-6 text-electric-indigo/30 mb-3" />
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{t.quote}</p>
              <div>
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="rounded-2xl border border-card-border bg-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/5 via-transparent to-neon-cyan/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Authentic Web3 Content?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Join hundreds of Web3 community managers already using Write3. Start free, no credit card required.
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
