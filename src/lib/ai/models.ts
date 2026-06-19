export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  description: string;
  supportsJsonMode: boolean;
}

export type ModelTier = "free" | "paid";

export interface ModelPoolEntry {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  description: string;
  supportsJsonMode: boolean;
  tier: ModelTier;
  costPerGen: number;
}

export const MODEL_POOL: ModelPoolEntry[] = [
  {
    id: "openrouter/free",
    name: "OpenRouter Free",
    provider: "OpenRouter",
    providerColor: "text-gray-400",
    description: "Free tier — best-effort quality, rate-limited",
    supportsJsonMode: false,
    tier: "free",
    costPerGen: 0,
  },
  {
    id: "~google/gemini-flash-latest",
    name: "Gemini Flash Latest",
    provider: "Google",
    providerColor: "text-blue-400",
    description: "Fast, cheap, great for short-form content",
    supportsJsonMode: true,
    tier: "free",
    costPerGen: 0,
  },
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek Chat",
    provider: "DeepSeek",
    providerColor: "text-yellow-400",
    description: "Very cheap, solid quality, great fallback",
    supportsJsonMode: true,
    tier: "free",
    costPerGen: 0.0003,
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    providerColor: "text-emerald-400",
    description: "Lightweight, smart, good all-rounder",
    supportsJsonMode: true,
    tier: "paid",
    costPerGen: 0.001,
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    providerColor: "text-orange-400",
    description: "Nuanced creative writing, best-in-class quality",
    supportsJsonMode: true,
    tier: "paid",
    costPerGen: 0.003,
  },
  {
    id: "google/gemini-2.5-pro-exp-03-25",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    providerColor: "text-blue-400",
    description: "Deep reasoning, long-form, analytical content",
    supportsJsonMode: true,
    tier: "paid",
    costPerGen: 0.002,
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerColor: "text-emerald-400",
    description: "Versatile, powerful, industry standard",
    supportsJsonMode: true,
    tier: "paid",
    costPerGen: 0.005,
  },
  {
    id: "anthropic/claude-opus-4",
    name: "Claude Opus 4",
    provider: "Anthropic",
    providerColor: "text-orange-400",
    description: "Maximum quality for mission-critical content",
    supportsJsonMode: true,
    tier: "paid",
    costPerGen: 0.015,
  },
];

export function getFreeModels(): ModelPoolEntry[] {
  return MODEL_POOL.filter(m => m.tier === "free");
}

export function getPaidModels(): ModelPoolEntry[] {
  return MODEL_POOL.filter(m => m.tier === "paid");
}

export function getModelById(id: string): ModelPoolEntry | undefined {
  return MODEL_POOL.find(m => m.id === id);
}

export function pickModelForTier(tier: "free" | "paid" | "degraded", preferred?: string): ModelPoolEntry {
  if (tier === "paid" && preferred) {
    const model = getModelById(preferred);
    if (model && model.tier === "paid") return model;
  }
  if (tier === "paid") {
    return getModelById("openai/gpt-4o-mini") || MODEL_POOL[3];
  }
  if (tier === "degraded") {
    return getModelById("deepseek/deepseek-chat") || MODEL_POOL[2];
  }
  return getModelById("~google/gemini-flash-latest") || MODEL_POOL[1];
}
