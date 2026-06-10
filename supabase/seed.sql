-- Seed initial content templates
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
  'A formatted server announcement with clear sections, bullet points, and an @everyone ping.',
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
  'Telegram - Quick Update',
  'A concise, informative Telegram update with high-impact key points and a community question.',
  'telegram',
  'quick_update',
  'General',
  'Write a Telegram message from {project_name} about {topic}.\n\nKey points:\n{key_points}\n\nEnd with a question to start a conversation in the channel.',
  'You are a Telegram moderator. Keep it punchy, use emojis, and keep the text short to avoid wall-of-text syndrome.',
  '{"project_name": {"label": "Project Name", "type": "text", "required": true}, "topic": {"label": "Topic", "type": "text", "required": true}, "key_points": {"label": "Key Points", "type": "textarea", "required": true}}'::jsonb,
  '⚡️ Quick update from the @DeFiAlpha team!\n\nOur latest security audit just came back clean. All smart contracts are fully verified and secure. 🛡\n\nWhich vault are you depositing into first? Let us know in the chat! 👇',
  false
),
(
  'Farcaster - Quick Cast',
  'A short, engaging cast optimized for the Farcaster ecosystem and its community.',
  'farcaster',
  'quick_cast',
  'General',
  'Write a cast for Farcaster about {topic}.\n\nInclude a Web3 cultural hook or call-to-action.',
  'You are an active Farcaster user. Keep it brief, conversational, and avoid excessive hashtags. Highlight genuine builder/degen vibes.',
  '{"topic": {"label": "Cast Topic / Key Idea", "type": "textarea", "required": true}}'::jsonb,
  'building yield-bearing vaults all weekend. who else is in developer mode? 🛠️\n\nwe are launching on Monday. drop your address if you want early access to testing.',
  false
),
(
  'DAO - Governance Proposal Draft',
  'A formal draft template for BIP/Governance proposals following standard DAO structures.',
  'blog',
  'governance_proposal',
  'DAO',
  'Create a governance proposal draft for {project_name} titled: {proposal_title}.\n\nSections required:\n- Executive Summary\n- Rationale & Motivation\n- Technical Specification\n- Financial/Token Impact\n\nDetails:\n{details}',
  'You are a governance researcher. Write in a formal, analytical, and objective tone. Use precise terminology and clear structural headings.',
  '{"project_name": {"label": "DAO Name", "type": "text", "required": true}, "proposal_title": {"label": "Proposal Title", "type": "text", "required": true}, "details": {"label": "Details & Implementation Details", "type": "textarea", "required": true}}'::jsonb,
  '# BIP-42: Proposal to Integrate USDC-LUSD Vaults\n\n## Executive Summary\nThis proposal outlines the integration of a new stablecoin yield vault...\n\n## Rationale\nCurrently, our protocol lacks diversified stablecoin pairs. Adding USDC-LUSD mitigates systemic risk...',
  true
),
(
  'DeFi - Yield Optimization Update',
  'A Twitter thread explaining yield optimization mechanics, gas savings, and vault parameters.',
  'twitter',
  'defi_yield_update',
  'DeFi',
  'Write a 4-tweet thread for {project_name} explaining the mechanics and APY breakdown of the {vault_name} vault.\n\nDetails:\n- APY: {apy_percentage}\n- Strategy: {strategy_description}\n- Fee structure: {fees}\n- Call to action: {cta}',
  'You are a DeFi analyst. Balance technical accuracy with marketing appeal. Use charts (e.g. 📈), metrics, and bold words.',
  '{"project_name": {"label": "DeFi Project", "type": "text", "required": true}, "vault_name": {"label": "Vault Name", "type": "text", "required": true}, "apy_percentage": {"label": "APY Percentage", "type": "text", "required": true}, "strategy_description": {"label": "Yield Strategy", "type": "textarea", "required": true}, "fees": {"label": "Vault Fees", "type": "text", "required": true}, "cta": {"label": "Call To Action Link", "type": "text", "required": true}}'::jsonb,
  '🧵 1/4 Yield optimization can be complex. Let''s break down how the @DeFiAlpha stablecoin vaults work to get you a stable 15.4% APY: 👇',
  true
),
(
  'NFT - Mint Launch Thread',
  'A Twitter hype thread for an upcoming NFT mint launch, detailing date, price, whitelist, and artwork sneak peeks.',
  'twitter',
  'nft_mint_thread',
  'NFT',
  'Write a 5-tweet hype thread for the {collection_name} NFT mint.\n\nDetails to include:\n- Mint Date & Time: {mint_date}\n- Price (public & whitelist): {mint_price}\n- Supply: {supply_count}\n- Utility/Perks: {utility}\n- Call to action: {cta}',
  'You are an NFT project marketer. Use vibrant, enthusiastic language ("WAGMI", "reveal", "minting"). Use visual cues and callouts.',
  '{"collection_name": {"label": "Collection Name", "type": "text", "required": true}, "mint_date": {"label": "Mint Date", "type": "text", "required": true}, "mint_price": {"label": "Mint Price", "type": "text", "required": true}, "supply_count": {"label": "Total Supply", "type": "text", "required": true}, "utility": {"label": "Holder Utility", "type": "textarea", "required": true}, "cta": {"label": "CTA Link", "type": "text", "required": true}}'::jsonb,
  '🎨 1/5 The wait is almost over. The @AlphaApes NFT mint starts on June 15th! Here is everything you need to prepare for mint day: 🧵👇',
  true
),
(
  'Educational - Explainer Post',
  'A detailed, educational blog post template that breaks down a complex Web3 topic for non-technical users.',
  'blog',
  'explainer',
  'Educational',
  'Write an educational explainer post about {web3_topic}.\n\nStructure:\n- Introduction (why it matters)\n- What is it (simple explanation)\n- How it works (real-world analogy)\n- Why it matters for Web3\n- Summary/Takeaways',
  'You are a Web3 technical writer. Write in a clear, friendly, and pedagogical tone. Use formatting to make it easy to read (bolding, lists, code blocks). Avoid jargon without explaining it first.',
  '{"web3_topic": {"label": "Topic (e.g. Zero Knowledge Proofs)", "type": "text", "required": true}}'::jsonb,
  '# Demystifying Zero Knowledge Proofs (ZKPs)\n\nZero Knowledge Proofs are one of the most exciting breakthroughs in modern cryptography. But what actually are they? Let''s break it down...',
  true
),
(
  'Newsletter - Weekly Roundup',
  'A structured weekly newsletter template summarizing protocol updates, governance votes, and community news.',
  'newsletter',
  'weekly_roundup',
  'General',
  'Write a weekly community newsletter for {project_name} for the week of {week_date}.\n\nSections:\n- GM & Headline\n- Protocol Updates (what did developers ship?)\n- Governance Update (active proposals)\n- Community Spotlights (AMAs, events)\n- Closing & Links\n\nDetails:\n{details}',
  'You are a marketing lead. Write in a warm, welcoming, professional, and community-aligned tone.',
  '{"project_name": {"label": "Project Name", "type": "text", "required": true}, "week_date": {"label": "Week/Date", "type": "text", "required": true}, "details": {"label": "Weekly Details", "type": "textarea", "required": true}}'::jsonb,
  'gm Alpha community! 🌞\n\nWelcome to our weekly recap. Here is what happened this week: protocol updates, new audits, and what is coming next...',
  true
);
