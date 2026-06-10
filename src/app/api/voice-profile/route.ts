import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateJsonCompletion } from "@/lib/ai/client";
import { canUseVoiceTraining, getMaxVoiceProfiles } from "@/lib/subscription/guards";
import { z } from "zod";

const CreateVoiceSchema = z.object({
  project_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  training_data: z.string().min(50).max(50000),
});

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("project_id");

    let query = supabase
      .from("voice_profiles")
      .select("*, projects!inner(user_id)")
      .eq("projects.user_id", user.id);

    if (projectId) query = query.eq("project_id", projectId);

    const { data: profiles, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;

    return NextResponse.json({ success: true, data: profiles });
  } catch (err: any) {
    console.error("Voice profiles fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch voice profiles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = CreateVoiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({
        error: "Invalid request body",
        details: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { project_id, name, training_data } = parsed.data;

    const { data: userProfile } = await supabase
      .from("users")
      .select("subscription_tier")
      .eq("id", user.id)
      .single();

    const tier = userProfile?.subscription_tier || "free";

    if (!canUseVoiceTraining(tier)) {
      return NextResponse.json({ error: "Voice training is not available on the Free plan. Upgrade to create voice profiles." }, { status: 403 });
    }

    const { count } = await supabase
      .from("voice_profiles")
      .select("*", { count: "exact", head: true })
      .eq("project_id", project_id);

    const maxProfiles = getMaxVoiceProfiles(tier);
    if ((count || 0) >= maxProfiles) {
      return NextResponse.json({ error: `Voice profile limit reached (${maxProfiles}). Upgrade to create more profiles.` }, { status: 403 });
    }

    const { data: project } = await supabase
      .from("projects")
      .select("id, user_id")
      .eq("id", project_id)
      .single();

    if (!project || project.user_id !== user.id) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const result = await generateJsonCompletion({
      model: "google/gemini-2.0-flash-001",
      messages: [{
        role: "user",
        content: `Analyze the following Web3 content and extract voice characteristics. Return a JSON object with:
- tone (string): Describe the overall tone (e.g., enthusiastic, technical, meme-aware, professional)
- vocabulary (string): Key terms, slang, and crypto jargon used
- sentence_length (string): Typical sentence structure
- emoji_usage (string): Frequency and style of emoji usage
- technical_depth (string): How technically detailed the content is
- writing_patterns (string): Distinctive writing patterns or structures
- system_prompt (string): A system prompt that would make an AI generate content matching this voice

Content to analyze:
${training_data.substring(0, 10000)}`,
      }],
      temperature: 0.3,
    });

    const analysisText = result.choices[0]?.message?.content || "{}";
    let characteristics;
    try {
      characteristics = JSON.parse(analysisText);
    } catch {
      characteristics = { raw_analysis: analysisText };
    }

    const systemPrompt = characteristics.system_prompt || `Write in a ${characteristics.tone || "natural"} voice. Use ${characteristics.vocabulary || "standard Web3 terminology"}. Keep sentences ${characteristics.sentence_length || "concise"}. Emoji usage: ${characteristics.emoji_usage || "moderate"}. Technical depth: ${characteristics.technical_depth || "moderate"}.`;

    const { data: profile, error } = await supabase
      .from("voice_profiles")
      .insert({
        project_id,
        name,
        training_data,
        characteristics,
        system_prompt: systemPrompt,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase.from("usage_logs").insert({
      user_id: user.id,
      action_type: "voice_train",
      resource_type: "voice_profile",
      resource_id: profile.id,
    });

    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (err: any) {
    console.error("Voice profile creation error:", err);
    return NextResponse.json({ error: "Failed to create voice profile" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("id");
    if (!profileId) {
      return NextResponse.json({ error: "Profile ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("voice_profiles")
      .delete()
      .eq("id", profileId)
      .in("project_id", (await supabase.from("projects").select("id").eq("user_id", user.id)).data?.map(p => p.id) || []);

    if (error) return NextResponse.json({ error: "Voice profile not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Voice profile deletion error:", err);
    return NextResponse.json({ error: "Failed to delete voice profile" }, { status: 500 });
  }
}
