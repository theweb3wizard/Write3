import { pickModelForTier, type ModelPoolEntry, getFreeModels, getPaidModels } from "./models";

export type GenerationTier = "free" | "paid" | "degraded";

export interface GenerationConfig {
  apiKey: string;
  model: ModelPoolEntry;
  tier: GenerationTier;
}

const DEGRADATION_CACHE = {
  degraded: false as boolean,
  lastChecked: 0 as number,
  ttl: 5 * 60 * 1000,
};

function getPaidApiKey(): string | null {
  return process.env.OPENROUTER_API_KEY || null;
}

function getFreeApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY_FREE || process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("Missing OPENROUTER_API_KEY or OPENROUTER_API_KEY_FREE");
  return key;
}

async function checkOpenRouterBalance(): Promise<number> {
  const apiKey = getPaidApiKey();
  if (!apiKey) return 0;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!response.ok) return 0;
    const data = await response.json();
    return data?.data?.credits ?? 0;
  } catch {
    return 0;
  }
}

export function isDegradationCached(): boolean {
  const now = Date.now();
  if (now - DEGRADATION_CACHE.lastChecked > DEGRADATION_CACHE.ttl) {
    return false;
  }
  return DEGRADATION_CACHE.degraded;
}

export function setDegradationCache(degraded: boolean): void {
  DEGRADATION_CACHE.degraded = degraded;
  DEGRADATION_CACHE.lastChecked = Date.now();
}

export async function resolveGenerationConfig(userCreditBalance: number): Promise<GenerationConfig> {
  const hasCredits = userCreditBalance > 0;

  if (!hasCredits) {
    return {
      apiKey: getFreeApiKey(),
      model: pickModelForTier("free"),
      tier: "free",
    };
  }

  if (isDegradationCached()) {
    return {
      apiKey: getFreeApiKey(),
      model: pickModelForTier("degraded"),
      tier: "degraded",
    };
  }

  const paidKey = getPaidApiKey();
  if (!paidKey) {
    return {
      apiKey: getFreeApiKey(),
      model: pickModelForTier("degraded"),
      tier: "degraded",
    };
  }

  const balance = await checkOpenRouterBalance();
  if (balance <= 0) {
    setDegradationCache(true);
    return {
      apiKey: getFreeApiKey(),
      model: pickModelForTier("degraded"),
      tier: "degraded",
    };
  }

  return {
    apiKey: paidKey,
    model: pickModelForTier("paid"),
    tier: "paid",
  };
}

export async function refreshDegradationStatus(): Promise<boolean> {
  const paidKey = getPaidApiKey();
  if (!paidKey) {
    setDegradationCache(true);
    return true;
  }

  const balance = await checkOpenRouterBalance();
  const degraded = balance <= 0;
  setDegradationCache(degraded);
  return degraded;
}
