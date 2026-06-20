---
name: "finance-women-50-video"
description: "Turn a finance topic into a full video package for the Finance for Women 50+ YouTube channel: research, script, and a ready-to-use slide deck."
---

# Finance for Women 50+ — Video Builder

Turn a single finance topic into a complete, faceless-video-ready package for Bethany's **Finance for Women 50+** YouTube channel: research → script → slide deck → title/thumbnail/SEO.

## Audience (write to this person every time)

- Woman, 50+, planning or living retirement.
- Cares about: protecting savings, retirement income, Social Security, Medicare, debt, scams, simple investing, leaving a legacy.
- Tone: warm, plain-English, reassuring, no jargon, no hype. Never gives individual financial advice — educational only.

## Inputs

- A topic (e.g., "5 Social Security mistakes that cost women thousands").
- If no topic given, suggest 3 timely options first (use `web_search` for current finance headlines relevant to women 50+).

## Steps

1. **Research.** `web_search` the topic for current, accurate facts (figures, limits, dates). Pull from credible sources (SSA.gov, IRS.gov, AARP, reputable finance press). Capture working source URLs. Never invent numbers — accuracy over speed.
2. **Write the script** (~5–8 min video, ~800–1,200 words):
   - **Hook** (first 5–10 seconds) — a relatable pain or surprising stat.
   - **Promise** — what she'll learn.
   - **3–5 main points** — each with a plain explanation + one concrete example.
   - **Recap + CTA** — subscribe, and a soft affiliate/lead line if relevant.
   - Mark `[B-ROLL]` / `[ON-SCREEN]` cues for the editor.
3. **Build the slide deck.** Produce a clean, faceless slide deck the voiceover narrates over:
   - One slide per beat: title slide, hook, one slide per main point, recap, CTA/subscribe.
   - Large readable text (50+ audience), high contrast, minimal words per slide.
   - **Deliverable:** generate an HTML slide deck saved to `channels/youtube-ideas/finance-50/<slug>/slides.html` (use the `canvas` or `diagram-maker` skill for rendering). Also output a plain **slide-by-slide outline** (text + visual note) so she can rebuild in Canva if she prefers.
4. **Package for upload:**
   - 3 title options (curiosity + benefit, <60 chars).
   - Thumbnail concept (big text + visual).
   - Description with timestamps + 1–2 affiliate/resource link placeholders.
   - 10–15 SEO tags (TubeBuddy/VidIQ style).
5. **Save** all assets under `channels/youtube-ideas/finance-50/<slug>/` (script.md, slides.html, package.md).

## Fits Bethany's pipeline

Script → ElevenLabs (voiceover) → slides.html as the visual track → CapCut (assemble) → Canva (thumbnail) → TubeBuddy/VidIQ (SEO). Matches her Mon–Fri workflow.

## Output to chat

Keep the Telegram reply tight: topic, the hook line, slide count, and the 3 title options, then point to the saved files. Don't paste the whole script into chat.

## Guardrails

- Educational only — no individualized financial advice; add a brief disclaimer line in the description.
- Verify every figure and date against a current source; cite sources in script.md.
- Nothing is posted publicly — Bethany reviews and uploads herself (per SOUL.md).
