import { useUserStore } from "@/stores/userStore";
import { canGenerate } from "@/lib/subscription/guards";
import { createClient } from "@/lib/supabase/client";
import { useCallback } from "react";

export function useSubscription() {
  const { user, status } = useUserStore();

  const creditBalance = user?.credit_balance ?? 0;
  const freeUsed = user?.free_generations_used ?? 0;
  const freeResetAt = user?.free_generations_reset_at ?? new Date().toISOString();

  const generationCheck = canGenerate({
    credit_balance: creditBalance,
    free_generations_used: freeUsed,
    free_generations_reset_at: freeResetAt,
  });

  const refreshBalance = useCallback(async () => {
    const supabase = createClient();
    const res = await supabase
      .from("users")
      .select("credit_balance, free_generations_used, free_generations_reset_at")
      .eq("id", user?.id)
      .single();
    if (res.data) {
      useUserStore.getState().setUser({
        ...useUserStore.getState().user!,
        ...res.data,
      });
    }
  }, [user?.id]);

  return {
    loading: status === "loading",
    creditBalance,
    freeUsed,
    freeRemaining: Math.max(0, 25 - freeUsed),
    canGenerate: status === "authenticated" && user ? generationCheck.allowed : false,
    cannotGenerateReason: generationCheck.reason,
    refreshBalance,
  };
}
