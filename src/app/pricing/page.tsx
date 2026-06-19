"use client";

import { useState } from "react";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { Check, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

const packs = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Try all features, no wallet needed.",
    credits: 25,
    tier: "free",
    features: [
      "25 content generations per month",
      "All platforms (Twitter, Discord, Telegram, Blog, Newsletter)",
      "Basic templates",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Starter",
    price: "$10",
    period: "one-time",
    description: "For occasional posts and testing the waters.",
    credits: 100,
    tier: "starter",
    features: [
      "100 content generations",
      "All platforms + Farcaster",
      "Brand voice training",
      "Credits never expire",
    ],
    cta: "Buy 100 Credits",
    popular: false,
  },
  {
    name: "Creator",
    price: "$35",
    period: "one-time",
    description: "Best value for regular content creators.",
    credits: 500,
    tier: "creator",
    features: [
      "500 content generations",
      "Everything in Starter, plus:",
      "Priority AI routing",
      "Best value — 7¢ per generation",
    ],
    cta: "Buy 500 Credits",
    popular: true,
  },
];

const pricingFaqs = [
  { q: "How does Write3 credit pricing work?", a: "Write3 uses prepaid credits instead of subscriptions. Free tier includes 25 generations per month. Paid packs start at $10 USDC for 100 credits. Each content generation costs 1 credit. Credits never expire." },
  { q: "Can I pay with a credit card?", a: "No. Write3 accepts USDC on the Solana blockchain only. Transaction fees are ~$0.0003 per payment — significantly less than credit card processing fees." },
  { q: "What happens when I run out of credits?", a: "You keep your account and generated content. Buy another credit pack anytime — credits never expire and roll over." },
  { q: "Is there a discount for buying more credits?", a: "The Creator pack (500 credits for $35) is the best value at $0.07 per generation, compared to $0.10 per generation in the Starter pack." },
];

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handleFree = () => {
    router.push("/auth/login");
  };

  const handleBuy = async (credits: number) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setLoading(`${credits}`);
    try {
      const res = await fetch("/api/payments/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credits }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      window.location.href = json.invoice_url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment failed";
      alert(message);
    }
    setLoading(null);
  };

  return (
    <MarketingLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }} />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Pay Once. <br />
            <span className="text-gradient">Create Forever.</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Buy credits in USDC on Solana. No subscriptions, no recurring charges.
            Credits never expire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className={`relative rounded-xl border p-6 flex flex-col ${
                pack.popular
                  ? "border-electric-indigo/50 bg-electric-indigo/5 scale-105"
                  : "border-card-border bg-card"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-premium text-xs font-semibold text-white whitespace-nowrap">
                  Best Value
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">{pack.name}</h3>
                <p className="text-sm text-gray-500">{pack.description}</p>
              </div>

              <div className="mb-2">
                <span className="text-4xl font-bold text-white">{pack.price}</span>
                <span className="text-gray-500 text-sm ml-1">{pack.period}</span>
              </div>

              <p className="text-sm text-electric-indigo mb-6 font-medium">
                {pack.credits.toLocaleString()} credits
              </p>

              {pack.tier === "free" ? (
                <button
                  onClick={handleFree}
                  className="w-full mb-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer border border-card-border text-gray-400 hover:text-white hover:border-gray-500/30"
                >
                  {pack.cta}
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(pack.credits)}
                  disabled={loading === `${pack.credits}`}
                  className={`w-full mb-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 ${
                    pack.popular
                      ? "bg-gradient-premium text-white hover:opacity-90"
                      : "bg-card-border/50 text-gray-300 hover:text-white hover:bg-card-border"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  {loading === `${pack.credits}` ? "Opening..." : pack.cta}
                </button>
              )}

              <ul className="space-y-3 flex-1">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-success/20 bg-success/5 mb-8">
            <Shield className="h-5 w-5 text-success" />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Pay with USDC on Solana</p>
              <p className="text-xs text-gray-500">~$0.0003 transaction fee. No credit card required.</p>
            </div>
          </div>
        </div>
        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-card-border bg-card p-5 group">
                <summary className="text-sm font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
