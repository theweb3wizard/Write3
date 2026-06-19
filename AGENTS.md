<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:mcp-tools -->
# MCP Tools Available

You have the following MCP servers configured. Use their tools automatically when relevant:

## Playwright MCP (`playwright_*`)
Browser automation for testing websites. Tools: `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_fill`, `browser_select`, `screenshot`, `browser_take_over`, etc.
- Use for: testing sites we build, browser-based research, visual verification, form testing
- Headless mode by default

## Freebird MCP (`freebird_search`, `freebird_fetch`, etc.)
Web search without API keys. DuckDuckGo-based. Tools: `freebird_search`, `freebird_fetch`, `web_search`, `news_search`, `image_search`, `video_search`
- Use for: deep web research when built-in `websearch` needs supplementing
- No API keys or config needed

## Grep by Vercel (`gh_grep_*`)
Search code across GitHub. Tools: `gh_grep_search`
- Use for: finding code patterns, real-world usage examples on GitHub
<!-- END:mcp-tools -->
