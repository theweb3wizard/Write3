"use client";

import { useState } from "react";
import { getPaddle, openCheckout } from "@/lib/paddle/client";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface CheckoutButtonProps {
  plan: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  annual?: boolean;
}

export default function CheckoutButton({ plan, label, className, disabled, annual }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/paddle/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, annual }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to start checkout");

      const paddle = await getPaddle();
      if (!paddle) {
        toast.error("Payment system not available. Please try again later.");
        return;
      }

      openCheckout(paddle, json.data.priceId, json.data.customerId);
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer disabled:opacity-50 ${
        className || "bg-gradient-premium text-white hover:opacity-90"
      }`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
      {loading ? "Opening..." : (label || `Upgrade to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`)}
    </button>
  );
}
