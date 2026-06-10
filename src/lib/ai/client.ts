interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionOptions {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  response_format?: { type: "json_object" } | { type: "text" };
  max_tokens?: number;
  provider?: {
    order?: string[];
    allow_fallbacks?: boolean;
  };
}

interface ChatCompletionResponse {
  id: string;
  choices: {
    message: { content: string };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
}

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

function getApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("Missing OPENROUTER_API_KEY environment variable");
  }
  return key;
}

export async function generateChatCompletion(
  options: ChatCompletionOptions
): Promise<ChatCompletionResponse> {
  const apiKey = getApiKey();

  const body: Record<string, unknown> = {
    model: options.model,
    messages: options.messages,
    temperature: options.temperature ?? 0.7,
  };

  if (options.response_format) {
    body.response_format = options.response_format;
  }
  if (options.max_tokens) {
    body.max_tokens = options.max_tokens;
  }
  if (options.provider) {
    body.provider = options.provider;
  }

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://write3.app",
      "X-Title": "Write3",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorBody}`);
  }

  return response.json();
}

export async function generateJsonCompletion(
  options: ChatCompletionOptions
): Promise<ChatCompletionResponse> {
  return generateChatCompletion({
    ...options,
    response_format: { type: "json_object" },
  });
}
