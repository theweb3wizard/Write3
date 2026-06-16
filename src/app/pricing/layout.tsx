import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start for free, no credit card required. Upgrade to Creator ($29/mo), Pro ($69/mo), or Agency ($199/mo). Unlimited content generation, brand style profiles, and team access.",
  openGraph: {
    title: "Write3 Pricing — Simple Pricing, Unlimited Content",
    description:
      "Start free, no credit card required. Upgrade when you need more power, more profiles, and more control over your Web3 content.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
