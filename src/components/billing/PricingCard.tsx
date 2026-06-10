"use client";

import { Check, Sparkles } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  currentPlan?: boolean;
  onCta: () => void;
}

export default function PricingCard({
  name, price, period, description, features, cta, popular, currentPlan, onCta,
}: PricingCardProps) {
  return (
    <div className={`relative rounded-xl border p-6 flex flex-col ${
      popular ? "border-electric-indigo/50 bg-electric-indigo/5" : "border-card-border bg-card"
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-premium text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-500 text-sm ml-1">{period}</span>
      </div>

      <button
        onClick={onCta}
        disabled={currentPlan}
        className={`w-full mb-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
          currentPlan
            ? "bg-card-border/30 text-gray-500 cursor-not-allowed"
            : popular
            ? "bg-gradient-premium text-white hover:opacity-90"
            : "border border-card-border text-gray-400 hover:text-white hover:border-gray-500/30"
        }`}
      >
        {currentPlan ? "Current Plan" : cta}
      </button>

      <ul className="space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
