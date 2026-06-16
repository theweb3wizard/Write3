"use client";

import { useState } from "react";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { Check, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import CheckoutButton from "@/components/billing/CheckoutButton";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Explore Write3 and generate your first pieces.",
    tier: "free",
    features: [
      "50 content generations per month",
      "Basic templates",
      "Single platform output",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Creator",
    price: "$29",
    period: "/month",
    description: "For solo founders, influencers, and independent creators.",
    tier: "creator",
    features: [
      "500 content generations per month",
      "All platforms (Twitter, Discord, Telegram, Blog, Newsletter, Farcaster)",
      "1 brand style profile",
      "Basic analytics",
      "Priority support",
    ],
    cta: "Upgrade to Creator",
    popular: false,
  },
  {
    name: "Pro",
    price: "$69",
    period: "/month",
    description: "For professional community managers and small teams.",
    tier: "pro",
    features: [
      "2,000 content generations per month",
      "All platforms",
      "3 brand style profiles",
      "Advanced analytics",
      "Team access (3 seats)",
      "API access",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Agency",
    price: "$199",
    period: "/month",
    description: "For marketing agencies managing multiple clients.",
    tier: "agency",
    features: [
      "10,000 content generations per month",
      "All platforms",
      "10 brand style profiles",
      "Advanced analytics",
      "Team access (10 seats)",
      "API access",
      "White-label branding",
      "Multi-workspace",
      "Dedicated support",
    ],
    cta: "Upgrade to Agency",
    popular: false,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const [annual, setAnnual] = useState(false);

  const handleFree = () => {
    router.push("/auth/login");
  };

  return (
    <MarketingLayout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple Pricing,<br />
            <span className="text-gradient">Unlimited Content</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Start for free. Upgrade when you need more power, more profiles, and more control over your Web3 content.
          </p>

          <div className="inline-flex items-center gap-2 mt-8 p-1 rounded-lg bg-card border border-card-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${!annual ? "bg-electric-indigo/10 text-electric-indigo" : "text-gray-500 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${annual ? "bg-electric-indigo/10 text-electric-indigo" : "text-gray-500 hover:text-white"}`}
            >
              Annual
              <span className="ml-1.5 text-xs text-success font-semibold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const price = annual
              ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
              : plan.price;

            return (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  plan.popular
                    ? "border-electric-indigo/50 bg-electric-indigo/5"
                    : "border-card-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-premium text-xs font-semibold text-white whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{price}</span>
                  <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                </div>

                {plan.tier === "free" ? (
                  <button
                    onClick={handleFree}
                    className="w-full mb-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer border border-card-border text-gray-400 hover:text-white hover:border-gray-500/30"
                  >
                    Get Started
                  </button>
                ) : (
                  <CheckoutButton
                    plan={plan.tier}
                    label={plan.cta}
                    annual={annual}
                    className={`w-full mb-6 py-2.5 rounded-lg text-sm font-semibold ${
                      plan.popular
                        ? "bg-gradient-premium text-white hover:opacity-90"
                        : "bg-card-border/50 text-gray-300 hover:text-white hover:bg-card-border"
                    }`}
                    disabled={!user}
                  />
                )}

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-success/20 bg-success/5">
            <Shield className="h-5 w-5 text-success" />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">30-Day Money Back Guarantee</p>
              <p className="text-xs text-gray-500">Not satisfied? Full refund within 30 days, no questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
