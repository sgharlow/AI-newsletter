# AI Prod Weekly — Issue #11

**Subject Line:** Your weekly review is broken (here's the fix)

---

Hey,

Most weekly reviews fail for the same reason:

They depend on willpower.

Friday afternoon. You're tired. The week is a blur. You tell yourself you'll "reflect this weekend." Monday arrives. No reflection happened. Repeat.

The solution isn't more discipline. It's removing yourself from the equation.

This week, we're building a weekly review system that runs whether you feel like it or not.

---

## 1. AUTOMATION OF THE WEEK: The Weekly Review System

**The problem:** Weekly reviews are valuable but fragile. They require you to remember, find time, ask the right questions, and actually do the thinking—all when you're at your most depleted.

**The solution:** An automated system that gathers data, asks questions, and presents insights—so your only job is to read and decide.

**The system:**

```
Friday 3pm: System triggers
        |
   Data gathering
   (calendar, tasks, notes)
        |
   AI processing
   (patterns, wins, gaps)
        |
   Review document
   generated
        |
   Notification sent
   "Your review is ready"
        |
   You: 15 min to review
   and plan next week
```

**How to build it:**

**Step 1: Define your data sources**

Your weekly review pulls from wherever your work lives:

```
Calendar data:
- Meetings attended (count, total hours)
- Meeting types (internal, client, sales)
- Canceled/rescheduled meetings

Task data:
- Tasks completed
- Tasks carried over
- Tasks added mid-week

Notes/docs:
- Documents created
- Key decisions made
- Ideas captured

Communication:
- Emails sent (optional)
- Response time trends
```

**Step 2: Create your question framework**

Every review answers these five questions:

```
1. WINS: What went well?
   - Completed projects
   - Positive client feedback
   - Problems solved

2. GAPS: What didn't happen?
   - Missed deadlines
   - Postponed tasks
   - Avoided conversations

3. PATTERNS: What keeps recurring?
   - Same meeting every week (needed?)
   - Same task carried forward (blocked?)
   - Same type of fire drill (systemic?)

4. ENERGY: Where did time go vs. should go?
   - Hours in meetings vs. deep work
   - Reactive vs. proactive
   - High-value vs. low-value

5. NEXT WEEK: What matters most?
   - Top 3 priorities
   - One thing to stop
   - One experiment to try
```

**Step 3: Build the data gathering automation**

**Google Calendar + Todoist + Notion approach:**

```
Trigger: Every Friday at 3pm

Step 1: Get calendar events (Google Calendar API)
- Filter: This week only
- Extract: Title, duration, attendees

Step 2: Get completed tasks (Todoist API)
- Filter: Completed this week
- Extract: Task name, project, completion date

Step 3: Get incomplete tasks (Todoist API)
- Filter: Due this week, not completed
- Extract: Task name, original due date

Step 4: Get new notes (Notion API)
- Filter: Created this week
- Extract: Titles, tags

Step 5: Compile into structured JSON
```

**Step 4: Create your AI analysis prompt**

```
You are a productivity analyst reviewing someone's week.

Here is their data:
{{compiled_json}}

Generate a weekly review with these sections:

## This Week's Wins
List 3-5 accomplishments based on completed tasks and
meetings. Be specific about impact.

## Gaps & Carries
What didn't get done? Any patterns in what's being
postponed?

## Time Allocation
Break down where hours went:
- Meetings: X hours (X%)
- Deep work: estimated Y hours
- Admin/reactive: estimated Z hours

## Patterns I Notice
What's recurring? What might be worth questioning?

## Next Week Focus
Based on incomplete tasks and observed patterns,
suggest:
- Top 3 priorities
- One thing to consider stopping
- One small experiment

Keep the tone direct and actionable. No fluff.
```

**Step 5: Delivery and notification**

**Output options:**

```
Option A: Email
- Send formatted review to your inbox
- Subject: "Week of [date] Review"
- Easy to reference, searchable

Option B: Notion page
- Create new page in "Weekly Reviews" database
- Maintains history
- Easy to compare weeks

Option C: Slack message
- DM yourself the review
- Low friction, immediate visibility
- Good for quick action

Option D: All three
- Email for archive
- Notion for history
- Slack for immediate notification
```

**Step 6: The review ritual (your 15 minutes)**

The automation does 80%. You do 20%:

```
Minutes 1-5: Read the generated review
- Does the AI's summary match reality?
- What's missing that only you know?

Minutes 6-10: Edit and annotate
- Add context to wins
- Flag patterns you want to address
- Star priorities for next week

Minutes 11-15: Plan Monday
- Block time for top priority
- Identify first action for each priority
- Note anything to delegate
```

**Time to implement:** 90-120 minutes
**Time saved:** 45-60 minutes per week (and reviews actually happen)

---

## 2. AI INSIGHT: The Reflection Problem

Why do smart people skip weekly reviews?

It's not laziness. It's cognitive load.

A good review requires:
- Remembering what happened (hard on Friday)
- Gathering scattered data (tedious)
- Asking the right questions (easy to skip)
- Being honest about gaps (uncomfortable)
- Connecting patterns (requires energy)

By Friday, you've spent your willpower on the week itself.

Automation doesn't replace reflection. It creates the container for it.

When the data is gathered, questions are asked, and insights are suggested—your job shrinks from "conduct a review" to "respond to a review."

That's the difference between a system that works and a habit that doesn't.

---

## 3. TOOL OF THE WEEK: Make (formerly Integromat)

**Why Make for this automation:**
- Handles multiple API connections cleanly
- Built-in data transformation (no code needed)
- Scheduled triggers that actually work
- Free tier is generous enough for personal use

**Key Make features for weekly reviews:**
- HTTP modules for any API
- JSON parsing and manipulation
- OpenAI integration built-in
- Gmail, Notion, Slack native connections
- Visual flow for debugging

**Alternative stacks:**
- Zapier + GPT (simpler but less flexible)
- n8n self-hosted (free but requires setup)
- Pipedream (developer-friendly)

---

## 4. QUICK WIN (Under 2 Minutes)

**Set a recurring Friday 3pm calendar block called "Review Ready."**

Even without the full automation, this does two things:
1. Creates a trigger (calendar reminder)
2. Protects time (block is held)

Add this to the description:
```
Ask myself:
- What went well?
- What didn't happen?
- What's the ONE priority for next week?
```

That's a manual version you can run today. Automate it when you're ready.

---

## 5. WHAT'S NEXT

Next week: **The SOW Generator** — because writing scope documents from scratch is a waste of your expertise. We'll build a system that drafts SOWs from intake notes, saving hours on every new project.

---

See you Thursday,
Steve

P.S. Do you currently do weekly reviews? Be honest—I didn't for years. Reply and tell me what's worked and what hasn't. I'm building a collection of real approaches.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
