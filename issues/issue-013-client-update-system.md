# AI Prod Weekly — Issue #13

**Subject Line:** Stop writing status emails (automated updates your clients will love)

---

Hey,

Every Friday afternoon, the same ritual:

Open email. Start typing. "Hi [Client], here's where we are..."

List what you did. List what's next. Soften the blockers. Make it sound professional. Hit send. Repeat for the next client.

By the time you're done, it's 6 PM and you've spent two hours on emails instead of billable work.

Here's the math that hurts: If you bill $200/hour and spend 2 hours weekly on status updates, that's $400/week—$20,000/year—on typing what your project management tool already knows.

This week, we're building a system that writes your client updates automatically.

---

## 1. AUTOMATION OF THE WEEK: The Client Update System

**The problem:** Clients need regular updates to feel confident. But manually writing status emails for every project every week is a time sink that scales poorly. Skip it and clients get anxious. Do it and you lose hours.

**The solution:** An automated system that pulls your project data, drafts personalized updates, and queues them for your quick review and send.

**The system:**

```
Project management data
(Notion, Asana, Monday, Todoist)
        |
   Weekly trigger (Friday 2pm)
        |
   AI drafts update email
   (tasks done, coming up, blockers)
        |
   You: 2-min review per client
        |
   Auto-send or quick edit + send
```

**How to build it:**

**Step 1: Structure your project data**

The automation needs consistent data to work with. In your project management tool:

```
For each active project, track:

BASIC INFO:
- Client name
- Project name
- Your contact name (who gets the email)
- Project status (active, on hold, wrapped)

THIS WEEK:
- Tasks completed (just titles)
- Key deliverables shipped
- Hours logged (optional)

NEXT WEEK:
- Tasks planned
- Milestones approaching
- Dependencies (what you need from them)

FLAGS:
- Blockers (what's stuck)
- Risks (what might get stuck)
- Wins (what went especially well)
```

**Step 2: Create your update template**

Your email should follow a consistent structure:

```markdown
Subject: [Project Name] Weekly Update — [Date]

Hi [Contact Name],

Quick update on [Project Name]:

## Completed This Week
{{completed_items}}

## Coming Up Next Week
{{planned_items}}

{{#if blockers}}
## Needs Your Attention
{{blockers_with_asks}}
{{/if}}

{{#if wins}}
## Quick Wins
{{wins}}
{{/if}}

Let me know if you have questions or want to jump on a quick call.

Best,
[Your name]
```

**Step 3: Build the AI prompt**

```
You are a professional consultant writing a weekly status update
to a client. Keep the tone warm but efficient. The client is busy
and appreciates brevity.

PROJECT DATA:
{{project_data}}

Generate an email update with these guidelines:

## Completed This Week
- Turn task titles into client-friendly descriptions
- Focus on outcomes, not activities
- Example: "Built the dashboard" → "Completed analytics dashboard showing your key revenue metrics"
- List 3-5 items maximum (combine smaller items)

## Coming Up Next Week
- List 3-4 planned items
- Include any milestones with dates
- Be specific about what they'll see/receive

## Needs Your Attention (only if blockers exist)
- Be direct but diplomatic about what's stuck
- Include a specific ask with deadline
- Example: "We need the logo files by Wednesday to stay on schedule"

## Quick Wins (only if wins exist)
- Celebrate something that went well
- Connect it to business value
- Keep it brief (one line)

Overall guidelines:
- Keep total email under 200 words
- Use bullet points, not paragraphs
- No jargon—write for a busy executive
- Sound human, not robotic
- If there are issues, acknowledge them but stay solutions-focused
```

**Step 4: Build the workflow (n8n or Make)**

```
Trigger: Schedule (Every Friday at 2pm)

Step 1: Get Active Projects
- Query Notion/Asana/Monday for projects where status = "active"
- Filter to projects with activity this week

Step 2: For Each Project

  Step 2a: Get Project Data
  - Pull tasks completed this week
  - Pull tasks planned next week
  - Pull any flagged items

  Step 2b: Generate Email Draft
  - Send to OpenAI/Claude with your prompt
  - Include project context
  - Receive formatted email

  Step 2c: Save Draft
  - Option A: Create Gmail draft
  - Option B: Add to Notion "outbox" page
  - Option C: Send to Slack for review

Step 3: Notify You
- "You have X client updates ready to review"
- Links to each draft
```

**Step 5: Your review process (2 minutes per client)**

```
For each draft:

[ ] Quick scan — Does it sound like you?
[ ] Accuracy — Any tasks listed that didn't happen?
[ ] Tone — Appropriate for this client?
[ ] Blockers — Softening needed? Or be more direct?
[ ] Personal touch — Add a line about something specific
[ ] Send or schedule
```

**Pro tips:**

1. **Different clients, different styles.** Add a "communication style" field to your project data. Some clients want bullet points. Others want context. Let the AI adapt.

2. **Attach something when possible.** "See attached updated Gantt chart" beats "we're on track." Visual evidence builds trust.

3. **Vary the cadence.** Not every project needs weekly updates. Add a "update_frequency" field: weekly, biweekly, monthly.

4. **CC strategically.** Include a "CC list" field for stakeholders who need visibility but aren't your primary contact.

**Time to implement:** 90 minutes
**Time saved:** 90+ minutes per week (and better client relationships)

---

## 2. AI INSIGHT: The Communication Tax

Most consultants undercharge because they forget the communication overhead.

For every hour of "real work," you spend:
- 15 minutes on client updates
- 10 minutes on internal notes
- 10 minutes answering questions
- 5 minutes on scheduling

That's 40 minutes of unbillable time per billable hour.

If you bill 30 hours/week, you're doing 20 hours of communication.

Automating updates doesn't just save time. It changes the economics of your practice.

When a status email takes 2 minutes instead of 15, you can:
- Take on more clients without burning out
- Provide more frequent updates (better relationships)
- Spend that time on work that actually moves projects forward

The most profitable consultants aren't better at the work. They're better at the communication around the work.

---

## 3. TOOL OF THE WEEK: Notion + Make/n8n Integration

**Why this combo works:**

Notion as your project database gives you:
- Flexible schema (add fields as needed)
- Client-ready views (share read-only)
- API access for automation
- Relation fields (link projects to clients)

Make/n8n as your automation layer gives you:
- Scheduled triggers
- OpenAI/Claude integration
- Email composition and sending
- Error handling

**The Notion setup:**

Create a "Projects" database with:
```
Project Name (title)
Client (relation to Clients database)
Status (select: active, on hold, complete)
Update Frequency (select: weekly, biweekly, monthly, none)
Communication Style (select: brief, detailed, formal, casual)
Last Update Sent (date)
```

Create a "Tasks" database with:
```
Task Name (title)
Project (relation to Projects)
Status (select: todo, in progress, done)
Completed Date (date)
Include in Update (checkbox)
```

**Alternative: Asana/Monday.com**

Both have robust APIs. The workflow is similar:
- Pull projects by status
- Pull tasks by completion date
- Feed to AI
- Create drafts

---

## 4. QUICK WIN (Under 2 Minutes)

**Create a text expander shortcut for status email openers.**

Set up these shortcuts in TextExpander, Raycast, or Alfred:

```
;suhi → "Hi [name], quick update on [project]:"

;sudone → "What we wrapped up this week:"

;sunext → "What's coming up next:"

;sublock → "One thing we need from your side:"

;suend → "Let me know if you have questions or want to jump on a quick call. Best, [your name]"
```

Even without full automation, you've cut your typing by 60%. The structure is consistent. You just fill in the bullets.

---

## 5. WHAT'S NEXT

Next week: **The Contract Renewal Pipeline** — because chasing expiring contracts manually means lost revenue and awkward conversations. We'll build a system that surfaces renewals 60 days early and drafts the conversation for you.

---

See you Thursday,
Steve

P.S. What's the longest you've gone without updating a client? I once went three weeks on a project (everything was on track, I was heads-down). The client started CC'ing my "supervisor" on emails. Never again. Reply with your communication fail stories.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
