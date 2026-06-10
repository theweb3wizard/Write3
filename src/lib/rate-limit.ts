import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let ratelimit: Ratelimit | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Default rate limit prefix and analytics configuration
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "10 s"), // Max 20 requests per 10 seconds default
      analytics: true,
      prefix: "write3:ratelimit",
    });
  } else {
    console.warn("Upstash Redis credentials missing. Sliding window rate limiting is disabled.");
  }
} catch (err) {
  console.error("Failed to initialize Upstash Redis rate limiter:", err);
}

/**
 * Checks the rate limit for a specific identifier.
 * Returns a validation result with success status and limits.
 */
export async function checkRateLimit(
  identifier: string,
  requestsPerWindow = 60,
  windowSeconds = 60
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  if (!ratelimit) {
    // Return bypass mock
    return { success: true, limit: requestsPerWindow, remaining: requestsPerWindow, reset: 0 };
  }

  try {
    // Custom ratelimit configuration per check if needed, but the base instance handles sliding window limit
    const result = await ratelimit.limit(identifier);
    
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (err) {
    console.error("Rate limit check failed, bypassing:", err);
    return { success: true, limit: requestsPerWindow, remaining: requestsPerWindow, reset: 0 };
  }
}
