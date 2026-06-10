import { useUserStore } from "@/stores/userStore";
import { getGenerationLimit, canGenerate, canUseVoiceTraining, getMaxVoiceProfiles } from "@/lib/subscription/guards";

export function useSubscription() {
  const { user, status } = useUserStore();
  const tier = user?.subscription_tier || "free";
  const generationCount = user?.monthly_generation_count || 0;

  return {
    loading: status === "loading",
    tier,
    generationCount,
    limit: getGenerationLimit(tier),
    canGenerate: status === "authenticated" && user ? canGenerate(user) : false,
    canUseVoiceTraining: canUseVoiceTraining(tier),
    maxVoiceProfiles: getMaxVoiceProfiles(tier),
    isFree: tier === "free",
    isCreator: tier === "creator",
    isPro: tier === "pro",
    isAgency: tier === "agency",
    usagePercent: Math.min((generationCount / getGenerationLimit(tier)) * 100, 100),
  };
}
