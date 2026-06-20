# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Related

- [Agent workspace](/concepts/agent-workspace)

---

## Bethany's Device Setup

### Primary Machine
- **Device:** Mac mini 2024
- **Chip:** Apple M4
- **Memory:** 16 GB
- **Startup Disk:** Macintosh HD
- **macOS:** Tahoe 26.5.1
- **Serial Number:** HKNYQ2DR65

### Home Server
- TBD (to be confirmed later)

### Cameras
- None

### Smart Speakers
- None

### Smart Home Devices
- None

### Printer
- None

---

## Email (AgentMail)

- **Primary email address:** `bbsopenclawmail@agentmail.to` (display name "Bethany's Bot") — set up 2026-06-13.
- Secondary inbox on same key: `bethany-7900@agentmail.to`.
- **Provider:** AgentMail (`https://api.agentmail.to/v0`), Bearer-token auth.
- **API key (durable):** Stored in the OpenClaw **secret store**, NOT in this git repo.
  - File: `~/.openclaw/secrets.json` (perms 0600, outside the git workspace), JSON pointer `/agentmail/apiKey`.
  - Registered as secrets file provider `filemain` in `openclaw.json` (`secrets.providers.filemain`, source=file, mode=json).
  - Note: OpenClaw has **no native AgentMail channel**, so nothing auto-consumes this key — I read it directly when sending mail. The secret store just keeps it durable + out of git/plaintext-config.
- **Resolve key in shell:** `KEY=$(python3 -c "import json,os;print(json.load(open(os.path.expanduser('~/.openclaw/secrets.json')))['agentmail']['apiKey'])")`
- **Send:** `POST /v0/inboxes/<inbox>/messages/send` with JSON `{to:[], subject, text}`.
- **List inboxes:** `GET /v0/inboxes`.
- Never print/commit the API key.

## Gmail Access (gog CLI) — bwilli787@gmail.com IS connected

I CAN read, search, and trash mail in Bethany's personal Gmail via the `gog` skill (Google Workspace CLI). **Do NOT say "no Gmail access" — it's authenticated.**

- **Authenticated accounts** (`gog auth list`):
  - `bwilli787@gmail.com` — scope: gmail (personal inbox)
  - `zenithhealthsvcs@gmail.com` — scopes: calendar,contacts,docs,drive,gmail,sheets
- **Always set account first:** `export GOG_ACCOUNT=bwilli787@gmail.com`
- **Search:** `gog gmail search '<gmail query>' --max 200 --json` (returns `id`,`from`,`subject`,`labels`)
- **Trash (recoverable ~30d):** `gog gmail trash <messageId>` — **one ID at a time in a loop**; batching many IDs fails with "Invalid ids value". Loop: `while read id; do gog gmail trash "$id"; done`
- **No native Gmail filters** (gog has no `filter` cmd, scope lacks settings.basic). Use the scheduled sweep instead.

### Store promo auto-trash sweep
- **Script:** `~/.openclaw/scripts/gmail-promo-sweep.sh` (log: same dir `.log`)
- **Cron:** isolated job `gmail-promo-sweep`, daily 7:00 AM ET (id `3c715ab0-ceeb-497a-b79a-2670f45b556d`)
- **Covers:** MAC, Carnival Cruise, DSW, Kohl's(promo only), IKEA, Fresh Market, Harris Teeter, Michaels, FTD, Bath & Body Works, QVC, Webull(marketing only), Thrive Causemetics, MyPoints, GreenPal, Victoria's Secret, Vacations To Go, Shoe Carnival, Hometalk, Saks, SoFi(marketing m.sofi.org), Coach, Panera, Incredible Health, GovX, Macy's. Excludes Kohl's order receipts (t.kohls.com) + Webull account/trading notices (webullpay.com — Bethany day-trades). Add senders by editing the QUERY in the script.

## Discord Admin (Custom Skill)

You CAN create, delete, and rename Discord channels using this script:

```bash
node ~/.openclaw/scripts/discord-admin.js <command>
```

**Commands:**
- `list-channels` — list all channels
- `create-channel <name> <category-id>` — create a text channel
- `create-category <name>` — create a category
- `delete-channel <channel-id>` — delete a channel
- `rename-channel <channel-id> <new-name>` — rename a channel

**Bethany's Server ID:** 1513347583228121268
**Text Channels Category ID:** 1513347583852937256

**Example:**
```bash
node ~/.openclaw/scripts/discord-admin.js create-channel "my-channel" 1513347583852937256
```

Always list channels first. Always confirm with Bethany before deleting anything.

## Voice Note Transcription (Speech-to-Text)

I CAN transcribe inbound voice notes (Telegram/WhatsApp `.ogg` Opus) fully offline. Pipeline:

1. Inbound audio lands in `~/.openclaw/media/inbound/<id>.ogg` (note: NOT the workspace `media/inbound/` — different path).
2. Decode Opus → 16kHz mono WAV with macOS built-in `afconvert`:
   ```bash
   afconvert -f WAVE -d LEI16@16000 -c 1 <in>.ogg /tmp/vn.wav
   ```
3. Transcribe with whisper.cpp (`brew install whisper-cpp`):
   ```bash
   whisper-cli -m ~/.cache/whisper/ggml-base.en.bin -f /tmp/vn.wav -nt
   ```

**Model (durable):** `~/.cache/whisper/ggml-base.en.bin` (147MB, `base.en`) — downloaded from
`https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin`.
Re-download there if missing. The `for-tests-ggml-tiny.bin` in homebrew share is a TEST model only — do NOT use it.
For higher accuracy on long/noisy clips, swap in `ggml-small.en.bin`.

**Multilingual model (durable):** `~/.cache/whisper/ggml-base.bin` (147MB) — installed 2026-06-15 for **Spanish** voice practice (Bethany's Spanish course). Use this (NOT base.en) for non-English audio:
`whisper-cli -m ~/.cache/whisper/ggml-base.bin -f /tmp/x.wav -l es -nt` (set `-l es` for Spanish, or `-l auto`).
Short/muffled clips transcribe poorly — ask Bethany to repeat slower/closer if unclear rather than guessing.
