-- Seed content templates (5 core templates)
INSERT INTO public.templates (name, description, platform, content_type, category, default_prompt, system_message, variables, example_output, is_premium)
VALUES 
(
  'Twitter/X - Product Launch Thread',
  'A 5-tweet announcement thread for launching a new feature or protocol.',
  'twitter',
  'launch_thread',
  'Product',
  'Create a 5-tweet announcement thread for {project_name} launching {feature_name}.\n\nKey points to include:\n{key_points}\n\nFormat as a Twitter thread with numbered tweets (e.g., 1/5) and make sure it has:\n- A hook tweet that grabs attention\n- A problem/solution narrative\n- Feature highlights with bullet points\n- Call-to-action with links',
  'You are an expert Web3 content strategist. Always keep tweets under 280 characters, use bullet points, and write in an engaging, crypto-native tone.',
  '{"project_name": {"label": "Project Name", "type": "text", "required": true}, "feature_name": {"label": "Feature Name", "type": "text", "required": true}, "key_points": {"label": "Key Points (one per line)", "type": "textarea", "required": true}}'::jsonb,
  '🧵 1/5 Big day for @DeFiAlpha! We are officially launching yield-bearing stablecoin vaults today. Lower gas, higher APY, 100% decentralized. Here is what you need to know: 👇',
  false
),
(
  'Discord - Server Announcement',
  'A formatted server announcement with section headers, bullet points, and a clear call-to-action.',
  'discord',
  'server_announcement',
  'General',
  'Write a Discord server announcement for {project_name} about {announcement_topic}.\n\nKey details:\n{details}\n\nInclude section headers, emoji bullet points, and a clear call-to-action.',
  'You are a community manager. Write in a warm, informative, and engaging tone. Use markdown headers (###) and bold text to make it easily scannable.',
  '{"project_name": {"label": "Project Name", "type": "text", "required": true}, "announcement_topic": {"label": "Announcement Topic", "type": "text", "required": true}, "details": {"label": "Details", "type": "textarea", "required": true}}'::jsonb,
  '### 📢 Community Update: Yield Vaults are Live!\n\nHey @everyone, we are thrilled to announce that our new vaults are officially open for deposits! \n\n🚀 **Highlights:**\n• Over 15% variable APY\n• Audited by CertiK\n• Zero withdrawal fees for the first week\n\n👉 Deposit here: https://defialpha.com/vaults',
  false
),
(
  'Reddit - Community Discussion Post',
  'An authentic, community-first Reddit post optimized for Web3 subreddits.',
  'reddit',
  'community_discussion',
  'General',
  'Write a Reddit post for {project_name} about {topic}.\n\nKey points:\n{key_points}\n\nWrite in an authentic, degen voice. Share real experiences. Be transparent about biases. Use 'I' and 'we'. No corporate speak, no 'revolutionary'. Never promotional.',
  'You are a long-time Redditor in crypto communities. Write conversationally. Include specific numbers. Admit uncertainty. Engage skeptics naturally. One corporate sentence and the thread is cooked.',
  '{"project_name": {"label": "Project Name", "type": "text", "required": true}, "topic": {"label": "Topic", "type": "text", "required": true}, "key_points": {"label": "Key Points", "type": "textarea", "required": true}}'::jsonb,
  'Been testing the new vaults on @DeFiAlpha for about 2 weeks now. APY is sitting around 15-16% which is solid for a stablecoin pool.\n\nSome honest thoughts:\n- UI is clean, no complaints\n- Gas was ~$0.30 to deposit (Solana, so expected)\n- Audited by CertiK which is a green flag\n\nWhat''s everyone else seeing?',
  false
),
(
  'Blog - Educational Explainer Post',
  'A clear, structured explainer that breaks down complex Web3 topics for non-technical readers.',
  'blog',
  'explainer',
  'Educational',
  'Write an educational explainer post about {web3_topic}.\n\nStructure:\n- Introduction (why it matters)\n- What is it (simple explanation)\n- How it works (real-world analogy)\n- Why it matters for Web3\n- Summary/Takeaways',
  'You are a Web3 technical writer. Write in a clear, friendly, and pedagogical tone. Use formatting to make it easy to read. Avoid jargon without explaining it first.',
  '{"web3_topic": {"label": "Topic (e.g. Zero Knowledge Proofs)", "type": "text", "required": true}}'::jsonb,
  '# Demystifying Zero Knowledge Proofs (ZKPs)\n\nZero Knowledge Proofs are one of the most exciting breakthroughs in modern cryptography. But what actually are they? Let''s break it down...',
  true
),
(
  'Newsletter - Weekly Roundup',
  'A structured weekly newsletter summarizing protocol updates, governance votes, and community news.',
  'newsletter',
  'weekly_roundup',
  'General',
  'Write a weekly community newsletter for {project_name} for the week of {week_date}.\n\nSections:\n- GM & Headline\n- Protocol Updates\n- Governance Update\n- Community Spotlights\n- Closing & Links\n\nDetails:\n{details}',
  'You are a marketing lead. Write in a warm, welcoming, professional, and community-aligned tone.',
  '{"project_name": {"label": "Project Name", "type": "text", "required": true}, "week_date": {"label": "Week/Date", "type": "text", "required": true}, "details": {"label": "Weekly Details", "type": "textarea", "required": true}}'::jsonb,
  'gm Alpha community! 🌞\n\nWelcome to our weekly recap. Here is what happened this week: protocol updates, new audits, and what is coming next...',
  true
);
