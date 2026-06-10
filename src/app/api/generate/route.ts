import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateContent } from "@/lib/ai/content-generation";
import { canGenerate, canUseVoiceTraining, getGenerationLimit } from "@/lib/subscription/guards";
import { checkRateLimit } from "@/lib/rate-limit";
import { isModelAccessible } from "@/lib/ai/models";
import { z } from "zod";

const GenerateSchema = z.object({
  project_id: z.string().uuid(),
  template_id: z.string().uuid(),
  platform: z.enum(["twitter", "discord", "telegram", "blog", "newsletter", "farcaster"]),
  content_type: z.string().min(1),
  tone: z.number().int().min(0).max(100).optional().default(50),
  voice_profile_id: z.string().uuid().nullable().optional().default(null),
  topic: z.string().min(1).max(500),
  key_points: z.array(z.string().max(500)).max(10).optional().default([]),
  length: z.enum(["short", "medium", "long"]).optional().default("medium"),
  model: z.string().optional().default("auto"),
  include_hashtags: z.boolean().optional().default(true),
  include_cta: z.boolean().optional().default(true),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = GenerateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({
        error: "Invalid request body",
        details: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { project_id, template_id, platform, content_type, tone, voice_profile_id, topic, key_points, length, model, include_hashtags, include_cta } = parsed.data;

    const { data: userProfile } = await supabase
      .from("users")
      .select("subscription_tier, monthly_generation_count")
      .eq("id", user.id)
      .single();

    if (!userProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const tier = userProfile.subscription_tier || "free";

    if (!canGenerate(userProfile)) {
      const limit = getGenerationLimit(tier);
      return NextResponse.json({
        error: "Generation limit reached. Upgrade to continue generating.",
        limit,
        current: userProfile.monthly_generation_count,
      }, { status: 403 });
    }

    if (model !== "auto" && !isModelAccessible(model, tier)) {
      return NextResponse.json({
        error: `Model "${model}" is not available on your ${tier} plan. Upgrade to access it.`,
      }, { status: 403 });
    }

    const rateLimitResult = await checkRateLimit(`generate:${user.id}`, 20, 10);
    if (!rateLimitResult.success) {
      return NextResponse.json({
        error: "Rate limit exceeded. Please wait before generating again.",
        retryAfter: rateLimitResult.reset,
      }, { status: 429 });
    }

    const { data: project } = await supabase
      .from("projects")
      .select("id, user_id, name, description, project_type, tone_setting, voice_profile_id")
      .eq("id", project_id)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: template } = await supabase
      .from("templates")
      .select("*")
      .eq("id", template_id)
      .single();

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    if (voice_profile_id && !canUseVoiceTraining(tier)) {
      return NextResponse.json({ error: "Voice profiles are not available on the Free plan. Upgrade to use them." }, { status: 403 });
    }

    let voiceProfile = null;
    if (voice_profile_id) {
      const { data: vp } = await supabase
        .from("voice_profiles")
        .select("system_prompt, project_id")
        .eq("id", voice_profile_id)
        .single();
      if (vp && vp.project_id !== project_id) {
        return NextResponse.json({ error: "Voice profile does not belong to this project" }, { status: 403 });
      }
      voiceProfile = vp;
    }

    const variables: Record<string, string> = {
      project_name: project.name,
      project_description: project.description || "",
      topic,
      tone: tone.toString(),
      key_points: key_points.join("\n"),
      ...(template.variables as Record<string, string> || {}),
    };

    if (include_hashtags) variables.include_hashtags = "true";
    if (include_cta) variables.include_cta = "true";

    const generated = await generateContent({
      project: {
        name: project.name,
        description: project.description || "",
        project_type: project.project_type,
        tone_setting: typeof tone === "number" ? tone : project.tone_setting,
      },
      voiceProfile,
      template: {
        default_prompt: template.default_prompt,
        system_message: template.system_message || "",
        platform,
        content_type,
      },
      variables,
      model,
      tier,
      length,
    });

    const { data: contentPiece, error: insertError } = await supabase
      .from("content_pieces")
      .insert({
        project_id: project.id,
        template_id: template.id,
        platform,
        content_type,
        title: generated.title,
        body: generated.body,
        status: "draft",
        metadata: generated.metadata,
        ai_model_used: generated.model_used,
        tokens_used: generated.tokens_used,
      })
      .select()
      .single();

    if (insertError || !contentPiece) {
      console.error("Failed to save content piece:", insertError);
      return NextResponse.json({ error: "Failed to save content piece" }, { status: 500 });
    }

    const adminClient = createAdminClient();
    await adminClient.rpc("increment_generation_count", { user_id: user.id });

    await supabase.from("usage_logs").insert({
      user_id: user.id,
      action_type: "generate",
      resource_type: "content_piece",
      resource_id: contentPiece.id,
      tokens_used: generated.tokens_used,
      metadata: { platform, content_type, model: generated.model_used },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: contentPiece.id,
        title: generated.title,
        body: generated.body,
        platform,
        content_type,
        metadata: generated.metadata,
        tokens_used: generated.tokens_used,
        created_at: contentPiece.created_at,
      },
    });
  } catch (err: any) {
    console.error("Generation error:", err);
    return NextResponse.json({
      error: err.message || "Content generation failed. Please try again.",
    }, { status: 500 });
  }
}
