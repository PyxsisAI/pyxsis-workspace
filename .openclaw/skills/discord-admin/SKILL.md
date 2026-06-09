---
name: discord-admin
description: "Manage Discord server: create, delete, rename channels and categories. Set permissions. Use when asked to create/delete/rename Discord channels or categories."
allowed-tools: ["exec"]
---

# Discord Admin Skill

Use this skill to manage Bethany's Discord server structure via the Discord API.

**Server ID:** 1513347583228121268
**Bot Token env:** DISCORD_BOT_TOKEN

## Create a Text Channel

```bash
node ~/.openclaw/scripts/discord-admin.js create-channel "channel-name" "CATEGORY_ID_OR_NONE"
```

## Create a Category

```bash
node ~/.openclaw/scripts/discord-admin.js create-category "Category Name"
```

## Delete a Channel

```bash
node ~/.openclaw/scripts/discord-admin.js delete-channel "CHANNEL_ID"
```

## Rename a Channel

```bash
node ~/.openclaw/scripts/discord-admin.js rename-channel "CHANNEL_ID" "new-name"
```

## List All Channels

```bash
node ~/.openclaw/scripts/discord-admin.js list-channels
```

## Rules
- Always list channels first before creating to avoid duplicates
- Channel names must be lowercase with hyphens (no spaces)
- Always confirm with Bethany before deleting anything
- Report back the channel ID after creating
