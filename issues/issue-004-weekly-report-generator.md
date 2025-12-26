# The AI Reframe — Issue #4

**Subject Line:** Write client reports in 5 minutes (not 45)

---

Hey,

Friday afternoon. You need to send the weekly update. But you're staring at a blank email trying to remember what you even did this week.

Sound familiar?

---

## 1. AUTOMATION OF THE WEEK: The 5-Minute Weekly Report

**The problem:** Writing client updates takes 30-45 minutes. You're reconstructing the week from memory, switching between tabs, trying to make "fixed some bugs" sound professional.

**The solution:** A system that drafts your weekly report automatically from data you're already generating.

**The stack:**

```
Time tracking (Toggl/Clockify)
     +
Task completions (Todoist/Asana)
     +
Git commits (if technical)
     ↓
  AI Summary
     ↓
 Polished Report
```

**How to build it:**

**Step 1: Aggregate your week's data**

Create an n8n workflow or Make scenario that runs every Friday at 3pm:

1. Pull completed tasks from your task manager (API call)
2. Pull time entries from your time tracker (API call)
3. (Optional) Pull merged PRs from GitHub

**Step 2: Generate the draft**

Send the aggregated data to GPT-4 with this prompt:

```
Write a professional weekly client update based on this data.

Time tracked: {{time_entries}}
Tasks completed: {{completed_tasks}}

Format:
## This Week
- [2-3 bullet accomplishments, focus on outcomes not activities]

## In Progress
- [1-2 items actively being worked on]

## Next Week
- [1-2 planned priorities]

## Blockers (if any)
- [Only include if there are actual blockers]

Keep it under 150 words. Professional but not stiff.
Client name: {{client_name}}
```

**Step 3: Review and send**

The AI draft lands in your inbox or Slack. You spend 5 minutes tweaking, then send.

**Time to implement:** 30 minutes
**Time saved:** 30-40 minutes per client per week

**Bonus:** This also creates a paper trail. When clients ask "what have we accomplished in Q1?" you have receipts.

---

## 2. AI INSIGHT: The Input Quality Rule

Your AI output is capped by your input quality.

**Garbage in:**
- "Write a status update" → Generic fluff

**Gold in:**
- Actual tasks completed
- Time spent on each area
- Specific deliverables

This is why the automation above works: it feeds the AI *real data* instead of asking it to make things up.

The same applies to any AI workflow. Better inputs > better prompts.

---

## 3. TOOL OF THE WEEK: Toggl Track (Free Tier)

**What it does:** Dead-simple time tracking with solid reporting.

**Why it matters for the report automation:**
- API is well-documented
- Exports cleanly to CSV/JSON
- Tags let you categorize by client/project
- Free tier is genuinely usable

**The habit that makes it work:** Start the timer when you switch contexts. Stop when you switch again. That's it. Don't log after the fact—you'll forget.

---

## 4. QUICK WIN (Under 2 Minutes)

**Create a Friday recurring task: "Draft weekly updates"**

Set it for 3pm Friday with this checklist:
- [ ] Pull this week's completed tasks
- [ ] Run report automation (or draft manually)
- [ ] Review + personalize each report
- [ ] Send before 5pm

Consistency beats quality. A mediocre update sent on time is better than a perfect one sent Monday.

---

## 5. WHAT'S NEXT

Next week: **The Invoice Follow-Up Sequence** — stop chasing payments manually. A 3-email automation that gets you paid faster (and removes the awkwardness).

---

See you Thursday,
Steve

P.S. What report do you hate writing the most? Reply and tell me—I might automate it in a future issue.

---

*You're receiving this because you signed up at theaireframe.com. [Unsubscribe here](#)*
