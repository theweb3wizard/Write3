import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content_id } = body;

    if (!content_id) {
      return NextResponse.json({ error: "content_id required" }, { status: 400 });
    }

    const { data: content, error: contentError } = await supabase
      .from("content_pieces")
      .select("body, title, platform, project_id")
      .eq("id", content_id)
      .single();

    if (contentError || !content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", content.project_id)
      .single();

    if (!project || project.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: account } = await supabase
      .from("user_social_accounts")
      .select("discord_webhook_url")
      .eq("user_id", user.id)
      .eq("platform", "discord")
      .eq("is_connected", true)
      .single();

    if (!account || !account.discord_webhook_url) {
      return NextResponse.json({ error: "Discord webhook not configured. Set it up in Settings." }, { status: 400 });
    }

    const embed = {
      title: content.title || "New Content",
      description: content.body.slice(0, 2000),
      color: 0x6366F1,
      footer: { text: `Published via Write3` },
      timestamp: new Date().toISOString(),
    };

    const webhookPayload = {
      content: `**New ${content.platform.charAt(0).toUpperCase() + content.platform.slice(1)} post**`,
      embeds: [embed],
    };

    const webhookResponse = await fetch(account.discord_webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errText = await webhookResponse.text();
      console.error("Discord webhook failed:", errText);
      return NextResponse.json({ error: "Failed to send to Discord. Check your webhook URL." }, { status: 502 });
    }

    await supabase.rpc("publish_content", { content_id });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Discord publish error:", err);
    return NextResponse.json({ error: "Failed to publish" }, { status: 500 });
  }
}
