---
name: morning-briefing
description: "Daily morning briefing for Bethany delivered at 8AM EST to Telegram and Discord. Covers weather, AI news, stock market, health & wellness, personal finance for women 50+, YouTube video ideas, nursing news, and Virginia/Norfolk local news."
allowed-tools: ["web_fetch", "web_search", "message"]
---

# Morning Briefing Skill — Pyxsis 🦅

Deliver Bethany's daily morning briefing every day at 8:00 AM EST to both Telegram and Discord.

## Delivery Targets
- Telegram: Bethany (ID: 8394949531) — `target: "8394949531"`
- Discord: #general channel — use `target: "channel:1513347583852937258"` (NOT `channel:general`, which fails with "Invalid Form Body"). Guild ID: 1513347583228121268.
- Discord has a 2000-char message limit. The full briefing exceeds it — split into 2 messages (Sections 1–5, then 6–10). Telegram has no such limit; send as one message.

## Briefing Format

Start with:
```
🌅 Good morning, Bethany! Here's your Daily Briefing — [DATE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then cover each section below in order. Keep each section SHORT (2-4 bullet points max). Bethany can ask for more details on any section.

---

## Section 1 — 🌤️ Weather (Norfolk, VA)
- Search: "Norfolk Virginia weather today forecast"
- Include: Current temp, high/low, conditions, any alerts
- Source: weather.gov or similar

## Section 2 — 🤖 AI News
- Search: "AI news today artificial intelligence latest"
- Include: Top 2-3 stories, brief summary each
- Focus: OpenAI, Anthropic, Google, Meta AI, new models
- Source: Include URL for each story

## Section 3 — 📈 Stock Market & Trading
- Search: "S&P 500 NASDAQ market update today" + "latest IPO today" + "SpaceX stock news" + "Anthropic news"
- Include:
  - S&P 500 and NASDAQ current levels/movement
  - Latest IPO news
  - SpaceX updates
  - Anthropic news
- Source: Include URL

## Section 4 — 💪 Health & Wellness (Women 50+)
- Search: "health wellness women over 50 news today"
- Include: Top 2 stories relevant to women 50+
- Focus: menopause, fitness, nutrition, mental health, longevity
- Source: Include URL

## Section 5 — 💰 Personal Finance (Women 50+ in Workforce)
- Search: "personal finance women over 50 workforce retirement investing news"
- Include: Top 2 tips or news items
- Focus: retirement, investing, Social Security, income streams
- Source: Include URL

## Section 6 — 🎬 YouTube Video Ideas
- Based on Bethany's 5 channels generate 5 fresh video ideas:
  1. Finance for Women 50+
  2. Health & Wellness for Women 50+
  3. Lofi/Study Music
  4. Nature & Animals
  5. Nursing Decorum
- Format: "💡 [Channel]: [Video Title Idea]"

## Section 7 — 🏥 Nursing News
- Search: "nursing healthcare news today"
- Include: Top 2 stories
- Focus: nursing practice, healthcare policy, patient care, nursing careers
- Source: Include URL

## Section 8 — 🇺🇸 US News
- Search: "US news today top stories"
- Include: Top 2-3 national stories
- Focus: politics, economy, major events
- Source: Include URL

## Section 9 — 🌍 World News
- Search: "world news today international top stories"
- Include: Top 2-3 international stories
- Focus: major global events, geopolitics, international economy
- Source: Include URL

## Section 10 — 📍 Virginia & Norfolk News
- Search: "Norfolk Virginia news today" + "Virginia news today"
- Include: Top 2-3 local stories
- Source: Include URL

---

## End of Briefing
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 Reply with a section name for more details.
Have a productive day, Bethany! 🦅
```

## Rules
- Always include source URLs
- Keep it concise — Bethany can ask for more
- Send to BOTH Telegram and Discord
- If a search fails, skip that section and note it
- Never make up news — only report from verified sources
