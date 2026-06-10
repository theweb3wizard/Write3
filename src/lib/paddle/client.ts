import { initializePaddle } from "@paddle/paddle-js";

let paddleInstance: any = null;

export async function getPaddle() {
  if (paddleInstance) return paddleInstance;

  const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!clientToken) {
    console.warn("Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
    return null;
  }

  try {
    paddleInstance = await initializePaddle({
      token: clientToken,
      environment: process.env.APP_ENV === "production" ? "production" : "sandbox",
    });
    return paddleInstance;
  } catch (err) {
    console.error("Failed to initialize Paddle:", err);
    return null;
  }
}

export function openCheckout(paddle: any, priceId: string, userId: string) {
  if (!paddle) {
    console.error("Paddle not initialized");
    return;
  }

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    settings: {
      allowLogout: false,
      displayMode: "overlay",
      successUrl: `${window.location.origin}/settings?checkout=success`,
    },
    customer: {
      id: userId,
    },
  });
}
