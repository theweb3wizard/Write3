const FREE_MONTHLY_LIMIT = 25;

export function canGenerate(user: {
  credit_balance: number;
  free_generations_used: number;
  free_generations_reset_at: string;
}): { allowed: boolean; reason?: string; needsReset?: boolean } {
  const lastReset = new Date(user.free_generations_reset_at);
  const now = new Date();
  const daysSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceReset >= 30) {
    return { allowed: true, needsReset: true };
  }

  if (user.credit_balance > 0) return { allowed: true };
  if (user.free_generations_used < FREE_MONTHLY_LIMIT) return { allowed: true };

  return {
    allowed: false,
    reason: "You've used all 25 free generations. Purchase credits to continue.",
  };
}

export function resetFreeUsage(user: {
  credit_balance: number;
  free_generations_used: number;
  free_generations_reset_at: string;
}): { free_generations_used: number; free_generations_reset_at: string } {
  const lastReset = new Date(user.free_generations_reset_at);
  const now = new Date();
  const daysSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceReset >= 30) {
    return { free_generations_used: 0, free_generations_reset_at: now.toISOString() };
  }
  return {
    free_generations_used: user.free_generations_used,
    free_generations_reset_at: user.free_generations_reset_at,
  };
}

export function getCreditPrice(credits: number): number | null {
  const prices: Record<number, number> = {
    100: 10,
    500: 35,
  };
  return prices[credits] ?? null;
}
