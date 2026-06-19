import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

async function getOwnedProjectIds(supabase: SupabaseClient, userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", userId);
  if (error) throw error;
  return data?.map(p => p.id) || [];
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("project_id");
    const platform = searchParams.get("platform");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20") || 20));
    const offset = (page - 1) * limit;

    const projectIds = await getOwnedProjectIds(supabase, user.id);

    let query = supabase
      .from("content_pieces")
      .select("*, projects!inner(name, project_type)", { count: "exact" })
      .in("project_id", projectIds);

    if (projectId) query = query.eq("project_id", projectId);
    if (platform) query = query.eq("platform", platform);
    if (status) query = query.eq("status", status);
    if (search) {
      query = query.or(`title.ilike.%${search}%,body.ilike.%${search}%`);
    }

    switch (sort) {
      case "oldest": query = query.order("created_at", { ascending: true }); break;
      case "title": query = query.order("title", { ascending: true }); break;
      default: query = query.order("created_at", { ascending: false });
    }

    const { data: content, count, error } = await query.range(offset, offset + limit - 1);
    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: content,
      pagination: { page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit) },
    });
  } catch (err: any) {
    console.error("Content fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
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
    const contentId = searchParams.get("id");
    if (!contentId) {
      return NextResponse.json({ error: "Content ID required" }, { status: 400 });
    }

    const body = await request.json();
    const allowedFields = ["title", "body", "status", "metadata"] as const;
    const validStatuses = ["draft", "published", "scheduled", "archived"];

    const updates: Record<string, any> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        if (key === "status" && !validStatuses.includes(body[key])) {
          return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, { status: 400 });
        }
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const projectIds = await getOwnedProjectIds(supabase, user.id);

    const { data: contentPiece, error } = await supabase
      .from("content_pieces")
      .update(updates)
      .eq("id", contentId)
      .in("project_id", projectIds)
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Content not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: contentPiece });
  } catch (err: any) {
    console.error("Content update error:", err);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
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
    const contentId = searchParams.get("id");
    if (!contentId) {
      return NextResponse.json({ error: "Content ID required" }, { status: 400 });
    }

    const projectIds = await getOwnedProjectIds(supabase, user.id);

    const { error } = await supabase
      .from("content_pieces")
      .delete()
      .eq("id", contentId)
      .in("project_id", projectIds);

    if (error) return NextResponse.json({ error: "Content not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Content deletion error:", err);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}

// Duplicate/clone a content piece (remix)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "clone") {
      const body = await request.json();
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: "Content ID required" }, { status: 400 });
      }

      const projectIds = await getOwnedProjectIds(supabase, user.id);

      const { data: original, error: fetchError } = await supabase
        .from("content_pieces")
        .select("*")
        .eq("id", id)
        .in("project_id", projectIds)
        .single();

      if (fetchError || !original) {
        return NextResponse.json({ error: "Content not found" }, { status: 404 });
      }

      const { data: clone, error: insertError } = await supabase
        .from("content_pieces")
        .insert({
          project_id: original.project_id,
          template_id: original.template_id,
          platform: original.platform,
          content_type: original.content_type,
          title: `${original.title || "Untitled"} (remix)`,
          body: original.body,
          status: "draft",
          metadata: original.metadata,
          ai_model_used: original.ai_model_used,
          tokens_used: 0,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return NextResponse.json({ success: true, data: clone }, { status: 201 });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    console.error("Content operation error:", err);
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}
