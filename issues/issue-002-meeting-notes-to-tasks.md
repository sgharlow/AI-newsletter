# AI Prod Weekly — Issue #2

**Subject Line:** Never forget a meeting action item again (10-min setup)

---

Hey,

Last week we tackled email chaos. This week: the graveyard of good intentions—meeting notes.

---

## 1. AUTOMATION OF THE WEEK: Meeting Notes → Task Manager

**The problem:** You leave a meeting with 5 action items. You write them down. Then... nothing. Three weeks later, client asks "did you ever send that proposal?" Awkward.

**The solution:** An automation that:
1. Takes your meeting transcript (from Otter, Fireflies, or manual notes)
2. Extracts action items using AI
3. Creates tasks in your task manager with due dates

**How to build it:**

**Option A: Using Otter.ai + Zapier (Easiest)**
1. Otter.ai auto-generates meeting summaries with action items
2. Create a Zap: Otter "New Meeting" → Zapier AI "Extract tasks" → Todoist/Asana
3. Prompt for extraction:
```
Extract action items from this meeting summary.
Format each as: [Owner] - [Task] - [Due date if mentioned, else "TBD"]
Only include items that require action, not discussion points.
```

**Option B: Using n8n (Free, more control)**
1. Trigger: Webhook (paste notes) or Gmail (forward notes)
2. GPT-4 node with extraction prompt
3. Loop through results, create tasks in your tool of choice
4. Bonus: Send Slack summary to attendees

**The prompt that works:**

```
Analyze this meeting transcript. Extract:
1. Action items (who needs to do what)
2. Decisions made
3. Questions left unanswered

For action items, output as JSON:
[{"owner": "name", "task": "description", "due": "date or null"}]

Be specific. "Follow up" is not a task. "Send revised proposal to client by Friday" is.
```

**Time to implement:** 10-15 minutes
**Time saved:** 30 min/week + zero forgotten commitments

---

## 2. AI INSIGHT: The Specificity Principle

Vague inputs = vague outputs. This applies to:
- Prompts you write
- Tasks you assign
- Goals you set

**Bad task:** "Follow up with client"
**Good task:** "Send John the revised SOW with updated timeline by Thursday 5pm"

The second one can be done by an AI. The first one requires you to think again later. Don't make future-you do that work.

---

## 3. TOOL OF THE WEEK: Tana (or Notion + AI)

**What it does:** A note-taking tool where every piece of information is a node you can tag, link, and query.

**Why it matters for meeting notes:** Tag notes with `#meeting`, `#action-item`, `#client/acme`. Then query: "Show all open action items for Acme Corp from the last 30 days."

**The catch:** Steeper learning curve than Notion. Worth it if you have 5+ active clients.

**Alternative:** Notion AI now extracts action items from pages. Less powerful but zero setup.

---

## 4. QUICK WIN (Under 2 Minutes)

**Add this line to your meeting invites:**

```
Notes will be shared within 24 hours with action items and owners.
```

This does three things:
1. Sets expectation that actions will be tracked
2. Gives you accountability to actually follow through
3. Positions you as organized (clients notice this)

---

## 5. WHAT'S NEXT

Next week: **The Client Onboarding Sequence** — automate the first 7 days after a new client signs. Welcome email, kickoff prep, and expectations—all hands-free.

---

See you Thursday,
Steve

P.S. Reply and tell me: what's your biggest time sink as a consultant? I might feature your problem (and solution) in a future issue.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
