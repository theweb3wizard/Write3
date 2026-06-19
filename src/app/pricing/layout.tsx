import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start for free, no credit card required. Buy prepaid credits with USDC on Solana. Starter ($10 for 100 credits), Creator ($35 for 500 credits). Credits never expire.",
  openGraph: {
    title: "Write3 Pricing — Pay Once. Create Forever.",
    description:
      "Start free, no credit card required. Buy prepaid credits with USDC on Solana. Credits never expire.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
