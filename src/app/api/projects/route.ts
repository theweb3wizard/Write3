import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const CreateProjectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(1000).optional().default(""),
  project_type: z.enum(["defi", "nft", "dao", "infrastructure", "gamefi", "other"]),
  tone_setting: z.number().int().min(0).max(100).optional().default(50),
  platforms: z.array(z.enum(["twitter", "discord", "telegram", "blog", "newsletter", "farcaster"])).optional().default([]),
});

const UpdateProjectSchema = CreateProjectSchema.partial();

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (projectId) {
      const { data: project, error } = await supabase
        .from("projects")
        .select("*, voice_profiles(*)")
        .eq("id", projectId)
        .eq("user_id", user.id)
        .single();

      if (error) return NextResponse.json({ error: "Project not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: project });
    }

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*, voice_profiles(id, name, is_active)")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data: projects });
  } catch (err: any) {
    console.error("Projects fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
    const parsed = CreateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({
        error: "Invalid request body",
        details: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { data: project, error } = await supabase
      .from("projects")
      .insert({ ...parsed.data, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err: any) {
    console.error("Project creation error:", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");
    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = UpdateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({
        error: "Invalid request body",
        details: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const { data: project, error } = await supabase
      .from("projects")
      .update(parsed.data)
      .eq("id", projectId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: project });
  } catch (err: any) {
    console.error("Project update error:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
    const projectId = searchParams.get("id");
    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const contentIds = (await supabase.from("content_pieces").select("id").eq("project_id", projectId)).data?.map(c => c.id) || [];

    const voiceIds = (await supabase.from("voice_profiles").select("id").eq("project_id", projectId)).data?.map(v => v.id) || [];

    const allIds = [...contentIds, ...voiceIds];
    if (allIds.length > 0) {
      const { error: usageError } = await supabase
        .from("usage_logs")
        .delete()
        .in("resource_id", allIds);
      if (usageError) throw usageError;
    }

    const { error: contentError } = await supabase
      .from("content_pieces")
      .delete()
      .eq("project_id", projectId);
    if (contentError) throw contentError;

    const { error: voiceError } = await supabase
      .from("voice_profiles")
      .delete()
      .eq("project_id", projectId);
    if (voiceError) throw voiceError;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Project deletion error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
