"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  "Consulting the Web3 oracle...",
  "Analyzing on-chain vibes...",
  "Training the degen-to-institutional converter...",
  "Checking gas prices for your content...",
  "Warming up the narrative engine...",
  "Minting your content on-chain...",
  "GM, generating your content...",
];

export default function ContentGenerationLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-card-border bg-card p-8 flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative mb-6">
        <div className="h-16 w-16 rounded-xl bg-gradient-premium flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -inset-2 rounded-xl bg-gradient-premium opacity-20 animate-ping" />
      </div>
      <p className="text-sm text-white font-medium">{messages[messageIndex]}</p>
      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-electric-indigo animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
