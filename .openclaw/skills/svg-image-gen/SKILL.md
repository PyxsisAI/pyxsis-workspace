---
name: svg-image-gen
description: "Generate free images and infographics using SVG — no API key, no billing, no external services needed. Use when asked to create images, infographics, illustrations, charts, avatars, or diagrams."
allowed-tools: ["exec"]
---

# SVG Image Generator Skill

Generate images 100% free using SVG + macOS built-in tools. No Gemini, no DALL-E, no billing required.

## How to Generate an Image

1. Create an SVG file in /tmp/
2. Convert to PNG using qlmanage:
```bash
qlmanage -t -s 600 -o /tmp/ /tmp/your-image.svg
```
3. Save to workspace:
```bash
cp /tmp/your-image.svg.png ~/.openclaw/workspace/media/your-image.png
```

## Rules
- Always save final images to ~/.openclaw/workspace/media/
- Use dark backgrounds (#1a1a2e) for infographics
- Use #FFD700 for titles and highlights
- Always show the image to Bethany for approval before saving
- Never use external image APIs unless Bethany explicitly asks

## Example — Infographic
```bash
cat > /tmp/infographic.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#1a1a2e" rx="15"/>
  <text x="300" y="45" font-size="28" fill="#FFD700" text-anchor="middle">Title</text>
</svg>
SVGEOF
qlmanage -t -s 600 -o /tmp/ /tmp/infographic.svg
```
