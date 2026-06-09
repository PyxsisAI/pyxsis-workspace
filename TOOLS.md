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
