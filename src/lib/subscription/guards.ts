export function getGenerationLimit(tier: string): number {
  switch (tier) {
    case "free":
      return 50;
    case "creator":
      return 500;
    case "pro":
      return 2000;
    case "agency":
      return 10000;
    default:
      return 50;
  }
}

export function canGenerate(user: { subscription_tier: string; monthly_generation_count: number }): boolean {
  const limit = getGenerationLimit(user.subscription_tier || "free");
  return user.monthly_generation_count < limit;
}

export function canUseBrandStyleAlignment(tier: string): boolean {
  return tier !== "free";
}

export function getMaxVoiceProfiles(tier: string): number {
  switch (tier) {
    case "free":
      return 0;
    case "creator":
      return 1;
    case "pro":
      return 3;
    case "agency":
      return 10;
    default:
      return 0;
  }
}
