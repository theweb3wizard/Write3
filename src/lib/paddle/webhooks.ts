/**
 * Paddle webhook event types.
 * Reference: https://developer.paddle.com/webhooks/events
 */
export type PaddleWebhookEvent =
  | "subscription.created"
  | "subscription.updated"
  | "subscription.canceled"
  | "transaction.completed"
  | "transaction.past_due";

export interface PaddleSubscriptionData {
  id: string;
  customer_id: string;
  status: "active" | "trialing" | "past_due" | "paused" | "deleted";
  items: Array<{
    price: {
      name: string;
      product_id: string;
    };
  }>;
  current_billing_period?: {
    starts_at: string;
    ends_at: string;
  };
  scheduled_change?: {
    effective_at: string;
  } | null;
  custom_data?: {
    user_id?: string;
  };
}
