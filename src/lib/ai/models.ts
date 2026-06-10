export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  minTier: "free" | "creator" | "pro" | "agency";
  description: string;
  supportsJsonMode: boolean;
}

const TIER_ORDER: Record<string, number> = {
  free: 0,
  creator: 1,
  pro: 2,
  agency: 3,
};

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: "google/gemini-2.0-flash-001",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    providerColor: "text-blue-400",
    minTier: "free",
    description: "Fast, cheap, great for short-form content",
    supportsJsonMode: true,
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    providerColor: "text-emerald-400",
    minTier: "free",
    description: "Lightweight, smart, good all-rounder",
    supportsJsonMode: true,
  },
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek Chat",
    provider: "DeepSeek",
    providerColor: "text-yellow-400",
    minTier: "free",
    description: "Very cheap, solid quality, great fallback",
    supportsJsonMode: true,
  },
  {
    id: "google/gemini-2.5-pro-exp-03-25",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    providerColor: "text-blue-400",
    minTier: "creator",
    description: "Deep reasoning, long-form, analytical content",
    supportsJsonMode: true,
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    providerColor: "text-orange-400",
    minTier: "pro",
    description: "Nuanced creative writing, best-in-class quality",
    supportsJsonMode: true,
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerColor: "text-emerald-400",
    minTier: "pro",
    description: "Versatile, powerful, industry standard",
    supportsJsonMode: true,
  },
  {
    id: "anthropic/claude-opus-4",
    name: "Claude Opus 4",
    provider: "Anthropic",
    providerColor: "text-orange-400",
    minTier: "agency",
    description: "Maximum quality for mission-critical content",
    supportsJsonMode: true,
  },
];

export function getModelsForTier(tier: string): AIModel[] {
  const userLevel = TIER_ORDER[tier] ?? 0;
  return AVAILABLE_MODELS.filter(m => {
    const modelLevel = TIER_ORDER[m.minTier] ?? 0;
    return modelLevel <= userLevel;
  });
}

export function getModelById(id: string): AIModel | undefined {
  return AVAILABLE_MODELS.find(m => m.id === id);
}

export function isModelAccessible(modelId: string, tier: string): boolean {
  const model = getModelById(modelId);
  if (!model) return false;
  const userLevel = TIER_ORDER[tier] ?? 0;
  const modelLevel = TIER_ORDER[model.minTier] ?? 0;
  return modelLevel <= userLevel;
}

export function getAutoModel(tier: string): string {
  if (tier === "free") return "google/gemini-2.0-flash-001";
  if (tier === "creator") return "openai/gpt-4o-mini";
  return "anthropic/claude-sonnet-4";
}
