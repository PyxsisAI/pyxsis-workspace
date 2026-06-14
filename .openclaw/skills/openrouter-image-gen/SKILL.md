---
name: openrouter-image-gen
description: "Generate images using Google Gemini via OpenRouter API. Use when asked to generate, create, or make images, photos, illustrations, or infographics."
allowed-tools: ["exec"]
---

# OpenRouter Image Generator — Pyxsis 🦅

Generate real AI images using Google Gemini 2.5 Flash Image via OpenRouter.

## API Details
- **Endpoint:** https://openrouter.ai/api/v1/chat/completions
- **Model:** google/gemini-2.5-flash-image
- **Key:** stored in ~/.openclaw/secrets.json as openrouter/apiKey

## Generate an Image

```bash
OR_KEY=$(python3 -c "import json,os; d=json.load(open(os.path.expanduser('~/.openclaw/secrets.json'))); print(d['openrouter']['apiKey'])")

curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OR_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"model\": \"google/gemini-2.5-flash-image\", \"messages\": [{\"role\": \"user\", \"content\": \"YOUR PROMPT HERE\"}]}" \
  | python3 -c "
import sys, json, base64
data = json.load(sys.stdin)
images = data['choices'][0]['message'].get('images', [])
if images:
    b64 = images[0]['image_url']['url'].split(',')[1]
    with open('/tmp/generated-image.png', 'wb') as f:
        f.write(base64.b64decode(b64))
    print('Image saved to /tmp/generated-image.png')
"
```

## Rules
- Always save images to ~/.openclaw/workspace/media/
- Show image to Bethany for approval before saving
- Never expose the API key
