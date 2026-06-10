import { generateJsonCompletion, generateChatCompletion } from "./client";
import { isModelAccessible, getAutoModel, getModelById } from "./models";

interface GenerateContentParams {
  project: {
    name: string;
    description: string;
    project_type: string;
    tone_setting: number;
  };
  voiceProfile?: {
    system_prompt?: string;
  } | null;
  template: {
    default_prompt: string;
    system_message?: string;
    platform: string;
    content_type: string;
  };
  variables: Record<string, string>;
  model: string;
  tier: string;
  length?: string;
}

interface GeneratedContentOutput {
  title: string;
  body: string;
  metadata: {
    hashtags: string[];
    mentions: string[];
    thread_count?: number;
  };
  model_used: string;
  tokens_used: number;
}

function getToneDescription(tone: number): string {
  if (tone <= 25) {
    return "Radically casual, raw degen crypto slang (uses gm, ser, wagmi, anon, frenzy emojis, lower-case, playful, high meme-density)";
  }
  if (tone <= 50) {
    return "Engaging Web3 native community voice (warm, friendly, emoji-aware, uses crypto terminology naturally, conversational, balanced memes)";
  }
  if (tone <= 75) {
    return "Professional but accessible Web3 brand (enthusiastic, clean formatting, explains concepts, credible but Web3-literate, minimal emojis)";
  }
  return "Institutional / Enterprise grade crypto communication (formal, precise, analytical, data-driven, zero memes, structured reports)";
}

function getPlatformFormattingRules(platform: string): string {
  switch (platform.toLowerCase()) {
    case "twitter":
      return "- Create a numbered thread if the content is long (e.g., 1/5, 2/5).\n- Each tweet MUST be under 280 characters.\n- Start with an engaging hook tweet.\n- Use blank lines between sentences for spacing.\n- Include at most 2 relevant hashtags at the very end of the thread.";
    case "discord":
      return "- Use clean markdown headers (###) and bullet points.\n- Keep it highly scannable with bold text.\n- Always end with a clear, separate call-to-action.\n- Avoid blocky paragraphs; use spacing.";
    case "telegram":
      return "- Concise and punchy. Avoid walls of text.\n- Use bullet points and emojis to structure the update.\n- End with a community engagement question.";
    case "farcaster":
      return "- Under 320 characters in total.\n- Conversational, degen-friendly builder vibes.\n- Do NOT use hashtags unless requested.\n- Keep it concise.";
    case "blog":
      return "- Structured markdown layout with #, ##, and ### headers.\n- Detailed explanations, paragraphs, and list blocks.\n- Technical but clear.";
    case "newsletter":
      return "- Warm, welcoming community digest style.\n- Start with a gm or friendly greeting.\n- Section blocks with bold headers.\n- Bulleted updates and links.";
    default:
      return "- Professional clean layout matching target channel conventions.";
  }
}

function buildSystemPrompt(params: GenerateContentParams): string {
  const { project, voiceProfile, template } = params;
  return [
    `You are an expert Web3 content strategist and community manager. You specialize in creating authentic, engaging content for ${project.project_type} projects.`,
    ``,
    `Your writing style details for this project:`,
    `- Project Name: ${project.name}`,
    `- Project Description: ${project.description}`,
    `- Tone style: ${getToneDescription(project.tone_setting)}`,
    `- Platform: ${template.platform}`,
    `- Content Type: ${template.content_type}`,
    ``,
    `Rules:`,
    `1. Use Web3 terminology naturally (e.g. DeFi, DAO, NFT, TVL, APY, LP, gas, etc.) fitting the project type.`,
    `2. Capture the exact tone settings. Do NOT sound like generic corporate B2B marketing. Avoid cliches like "revolutionizing the space" or "game changer". Be authentic to Web3 culture.`,
    `3. Follow these platform formatting rules for ${template.platform}:`,
    getPlatformFormattingRules(template.platform),
    `4. NEVER fabricate specific metrics, token prices, TVL numbers, partnership announcements, or launch dates. If a specific data point is needed, describe the concept generally. Only use facts explicitly provided in the user's key points.`,
    `5. NEVER claim a project "just launched," "is about to launch," or reference specific dates/timelines unless the user explicitly provided them.`,
    `6. NEVER mention investment advice, price predictions, or financial guarantees. This is marketing content, not financial advice.`,
    `7. If the user's topic or key points are ambiguous, ask for clarity through the content rather than guessing specifics.`,
    ``,
    template.system_message ? `Additional template rules:\n${template.system_message}` : "",
    voiceProfile?.system_prompt ? `Custom voice signature rules:\n${voiceProfile.system_prompt}` : "",
    ``,
    `You MUST respond with valid JSON only. Use this exact structure:`,
    `{`,
    `  "title": "Engaging title of the content piece",`,
    `  "body": "The actual formatted content body. If Twitter, this should contain the full thread with numbered tweets like 1/5, 2/5 separated by double newlines.",`,
    `  "metadata": {`,
    `    "hashtags": ["hashtag1", "hashtag2"],`,
    `    "mentions": ["@handle1"],`,
    `    "thread_count": 1`,
    `  }`,
    `}`,
  ].join("\n");
}

export async function generateContent(params: GenerateContentParams): Promise<GeneratedContentOutput> {
  const { project, template, variables, model: modelId, tier, length = "medium" } = params;

  if (!isModelAccessible(modelId, tier)) {
    throw new Error(`Model "${modelId}" is not available on your ${tier} plan`);
  }

  let resolvedModel = modelId === "auto" ? getAutoModel(tier) : modelId;

  for (const [key, value] of Object.entries(variables)) {
    variables[key] = value;
  }

  let userPrompt = template.default_prompt;
  Object.entries(variables).forEach(([key, value]) => {
    userPrompt = userPrompt.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  });

  const systemPrompt = buildSystemPrompt(params);

  let lastError: any = null;
  const maxRetries = 3;

  const fallbackModels = ["google/gemini-2.0-flash-001", "deepseek/deepseek-chat"];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const providerOrder = resolvedModel.includes("gemini")
        ? { order: ["Google", "DeepInfra", "Novita"], allow_fallbacks: true }
        : undefined;

      const response = await generateJsonCompletion({
        model: resolvedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        provider: providerOrder,
      });

      const responseText = response.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("Empty response from model");
      }

      const parsedOutput = JSON.parse(responseText);

      const hashtags = parsedOutput.metadata?.hashtags || [];
      const mentions = parsedOutput.metadata?.mentions || [];
      let thread_count = parsedOutput.metadata?.thread_count || 1;

      if (template.platform.toLowerCase() === "twitter" && thread_count === 1) {
        const matches = parsedOutput.body?.match(/\b\d+\/\d+\b/g);
        if (matches) {
          thread_count = new Set(matches).size;
        }
      }

      const tokensUsed = response.usage?.total_tokens || Math.round((systemPrompt.length + userPrompt.length + (responseText?.length || 0)) / 4);

      return {
        title: parsedOutput.title || `${project.name} ${template.content_type}`,
        body: parsedOutput.body || "",
        metadata: { hashtags, mentions, thread_count },
        model_used: response.model || resolvedModel,
        tokens_used: tokensUsed,
      };
    } catch (err: any) {
      console.error(`Generation attempt ${attempt} failed:`, err);
      lastError = err;

      if (attempt < maxRetries) {
        const isRateLimit = err.message?.includes("429") || err.message?.includes("rate_limit");
        const isOverloaded = err.message?.includes("503") || err.message?.includes("overloaded");

        if (isRateLimit || isOverloaded) {
          resolvedModel = fallbackModels[attempt - 1] || resolvedModel;
          console.warn(`Rate limit hit, falling back to ${resolvedModel} for retry`);
        }

        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw new Error(`Content generation failed after ${maxRetries} attempts. Last error: ${lastError?.message || lastError}`);
}
