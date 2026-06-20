---
name: clickup
description: "Log tasks, mark tasks complete, create tasks, and check task status in ClickUp. Use whenever Bethany asks to do something, complete something, or track progress. Always log what was done in ClickUp."
allowed-tools: ["exec"]
---

# ClickUp Skill — Pyxsis 🦅

Automatically log and track everything in ClickUp so Bethany never forgets what was done.

## API Details
- **Base URL:** https://api.clickup.com/api/v2
- **Auth:** Authorization header with API key from secrets.json

## Get API Key
```bash
CU_KEY=$(python3 -c "import json,os; d=json.load(open(os.path.expanduser('~/.openclaw/secrets.json'))); print(d['clickup']['apiKey'])")
```

## Get Workspace & Lists
```bash
# Get teams/workspaces
curl -s https://api.clickup.com/api/v2/team \
  -H "Authorization: $CU_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); [print(t['id'], t['name']) for t in d['teams']]"
```

## Create a Task
```bash
curl -s -X POST https://api.clickup.com/api/v2/list/<LIST_ID>/task \
  -H "Authorization: $CU_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Task name", "description": "Details", "status": "to do"}'
```

## Mark Task Complete
```bash
curl -s -X PUT https://api.clickup.com/api/v2/task/<TASK_ID> \
  -H "Authorization: $CU_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "complete"}'
```

## Get All Tasks
```bash
curl -s https://api.clickup.com/api/v2/list/<LIST_ID>/task \
  -H "Authorization: $CU_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); [print(t['id'], t['name'], t['status']['status']) for t in d['tasks']]"
```

## Rules
- **Always log completed tasks in ClickUp** when Bethany says something is done
- **Create a task first** when Bethany assigns a new job
- **Mark complete** as soon as the task is finished
- Never expose the API key
- Always confirm with Bethany before deleting tasks
