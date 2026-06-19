import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateContent } from "@/lib/ai/content-generation";
import { resolveGenerationConfig, setDegradationCache } from "@/lib/ai/router";
import { canGenerate, resetFreeUsage } from "@/lib/subscription/guards";
import { z } from "zod";

const GenerateSchema = z.object({
  project_id: z.string().uuid(),
  template_id: z.string().uuid(),
  platform: z.enum(["twitter", "discord", "telegram", "blog", "newsletter", "farcaster", "reddit"]),
  content_type: z.string().min(1),
  tone: z.enum(["degen", "professional", "educational"]).optional().default("professional"),
  voice_profile_id: z.string().uuid().nullable().optional().default(null),
  topic: z.string().min(1).max(500),
  key_points: z.array(z.string().max(500)).max(10).optional().default([]),
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

    const { project_id, template_id, platform, content_type, tone, voice_profile_id, topic, key_points } = parsed.data;

    const { data: userProfile } = await supabase
      .from("users")
      .select("credit_balance, free_generations_used, free_generations_reset_at, total_generations")
      .eq("id", user.id)
      .single();

    if (!userProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const generationCheck = canGenerate(userProfile);
    if (!generationCheck.allowed) {
      return NextResponse.json({
        error: generationCheck.reason,
      }, { status: 403 });
    }

    const { data: project } = await supabase
      .from("projects")
      .select("id, user_id, name, description, project_type, tone_setting")
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
      tone,
      key_points: key_points.join("\n"),
      ...(template.variables as Record<string, string> || {}),
    };

    // Resolve model routing based on user's credit balance
    const genConfig = await resolveGenerationConfig(userProfile.credit_balance);

    const generated = await generateContent({
      project: {
        name: project.name,
        description: project.description || "",
        project_type: project.project_type,
        tone_setting: 50,
      },
      voiceProfile,
      template: {
        default_prompt: template.default_prompt,
        system_message: template.system_message || "",
        platform,
        content_type,
      },
      variables,
      model: genConfig.model,
      apiKey: genConfig.apiKey,
      length: "medium",
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
    const { free_generations_reset_at: resetTime } = resetFreeUsage(userProfile);
    const resetHappened = resetTime !== userProfile.free_generations_reset_at;
    const usingFree = userProfile.credit_balance <= 0;

    if (usingFree) {
      if (resetHappened) {
        await adminClient
          .from("users")
          .update({ free_generations_used: 1, free_generations_reset_at: resetTime, total_generations: userProfile.total_generations + 1, updated_at: new Date().toISOString() })
          .eq("id", user.id);
      } else {
        await adminClient.rpc("increment_free_usage", { user_id: user.id });
      }
    } else {
      await adminClient.rpc("deduct_credit", { user_id: user.id });
    }

    // If a paid user got degraded, log it so developer knows
    if (genConfig.tier === "degraded" && !usingFree) {
      console.warn(`Paid user ${user.id} served degraded model due to insufficient premium API balance`);
    }

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Content generation failed. Please try again.";
    console.error("Generation error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
