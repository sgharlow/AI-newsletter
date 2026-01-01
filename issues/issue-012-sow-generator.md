# AI Prod Weekly — Issue #12

**Subject Line:** Stop writing SOWs from scratch (here's your template machine)

---

Hey,

Every new project starts the same way:

Open a blank document. Stare at it. Copy an old SOW. Delete half of it. Rewrite the scope. Forget to update the payment terms. Send it. Realize you missed something. Revise. Send again.

Two hours gone. And you've done this a hundred times.

The problem isn't the SOW. It's starting from scratch every time.

This week, we're building a system that drafts 80% of your scope documents automatically—from a 5-minute intake conversation.

---

## 1. AUTOMATION OF THE WEEK: The SOW Generator

**The problem:** Scope documents are critical but time-consuming. Each one requires translating client conversations into structured deliverables, timelines, and terms. Most consultants either over-engineer them or wing it.

**The solution:** An AI-powered system that takes intake notes and generates a professional SOW draft in minutes.

**The system:**

```
Client call / intake form
        |
   Structured notes
   (problem, goals, constraints)
        |
   AI processing
   (drafts scope, timeline, terms)
        |
   SOW document generated
   (your template, their details)
        |
   You: 10 min review
   and customize
```

**How to build it:**

**Step 1: Create your intake framework**

Every project discussion should capture these elements:

```
CLIENT CONTEXT:
- Company name
- Industry
- Contact name and role
- Current situation (what's happening now)

PROBLEM STATEMENT:
- What's broken or missing?
- What triggered this conversation?
- What have they already tried?

DESIRED OUTCOME:
- What does success look like?
- How will they measure it?
- When do they need it?

CONSTRAINTS:
- Budget range (if discussed)
- Timeline requirements
- Technical limitations
- Stakeholder approvals needed

SCOPE INDICATORS:
- Specific deliverables mentioned
- Out-of-scope items (explicitly)
- Dependencies on their side
```

**Step 2: Build your SOW template**

Your template should have these sections with placeholders:

```markdown
# Statement of Work

## Project Overview
{{project_summary}}

## Objectives
{{objectives_list}}

## Scope of Work

### In Scope
{{in_scope_deliverables}}

### Out of Scope
{{out_of_scope_items}}

## Timeline
{{timeline_with_milestones}}

## Deliverables
{{deliverables_table}}

## Investment
{{pricing_structure}}

## Terms
{{standard_terms}}

## Assumptions
{{project_assumptions}}

## Signatures
{{signature_block}}
```

**Step 3: Create your AI prompt**

```
You are a professional services consultant drafting a Statement
of Work. Based on the following client intake notes, generate
a complete SOW draft.

INTAKE NOTES:
{{intake_notes}}

Generate a SOW with these sections:

## Project Overview
Write 2-3 sentences summarizing the engagement. Include the
client's core problem and desired outcome.

## Objectives
List 3-5 measurable objectives. Each should be specific and
achievable within the project scope.

## Scope of Work - In Scope
List all deliverables as bullet points. Be specific about what
is included. Format: "Deliverable Name: Description"

## Scope of Work - Out of Scope
List 3-5 items explicitly excluded to prevent scope creep.
Be diplomatic but clear.

## Timeline
Create a milestone-based timeline. Use relative dates
(Week 1, Week 2, etc.). Include:
- Discovery/kickoff
- Key milestones
- Final delivery
- Revision period

## Deliverables Table
Create a table with columns: Deliverable | Description | Due Date

## Assumptions
List 3-5 assumptions the project depends on. Example:
"Client will provide access to X within Y days of kickoff."

Keep language professional but not stuffy. Be specific about
what's included. Flag any ambiguities that need client clarification.
```

**Step 4: Build the workflow**

**Option A: Form + Make/Zapier**

```
Trigger: Form submission (Typeform, Tally, Google Form)

Step 1: Parse form responses into structured JSON

Step 2: Send to OpenAI with SOW prompt
- Include your template structure
- Include pricing defaults

Step 3: Generate Google Doc / Notion page
- Use template with placeholders
- Insert AI-generated content

Step 4: Notify you
- Email with link to draft
- Ready for your review
```

**Option B: Voice memo + Transcription**

```
Record: 5-min voice memo after client call

Step 1: Transcribe with Whisper or Otter.ai

Step 2: Send transcription to Claude/GPT
- Extract intake framework elements
- Generate structured notes

Step 3: Same SOW generation as above

Step 4: Output to preferred format
```

**Option C: Notion + AI**

```
Intake: Fill out Notion database template
- Required fields for each section
- Dropdowns for common values

Trigger: New database entry

Step 1: Compile fields into prompt

Step 2: Generate SOW in connected page

Step 3: Ready for review and customization
```

**Step 5: Your review process (10-15 minutes)**

The AI draft is 80% there. Your job is the critical 20%:

```
Review checklist:

[ ] Project overview - Does it capture the real problem?
[ ] Objectives - Are they actually measurable?
[ ] In scope - Anything missing they mentioned?
[ ] Out of scope - Protect yourself from creep
[ ] Timeline - Is it realistic given their constraints?
[ ] Pricing - Apply your actual rates and structure
[ ] Assumptions - What could derail this?
[ ] Client-specific customization - Industry terms, preferences
```

**Time to implement:** 60-90 minutes for the full system
**Time saved:** 60-90 minutes per SOW (and better quality)

---

## 2. AI INSIGHT: The Documentation Trap

Why do consultants resist documenting scope?

It feels slow. The client is excited. You're excited. Writing it down seems like bureaucracy slowing things down.

But unclear scope is expensive:

- 40% of projects have scope creep (PMI data)
- Average scope creep adds 27% to project cost
- Most disputes come from "I thought it included..."

The SOW isn't bureaucracy. It's protection—for you and the client.

When AI writes the first draft, documentation stops feeling like overhead. It becomes a 10-minute review instead of a 2-hour writing session.

You're still the expert. You're just not the typist.

---

## 3. TOOL OF THE WEEK: Tally Forms

**Why Tally for intake:**
- Beautiful forms that clients actually fill out
- Free tier is generous (unlimited forms, responses)
- Native integrations with Notion, Make, Zapier
- Conditional logic for smart intake flows
- No Typeform branding on free tier

**Key features for SOW intake:**
- Required fields (no more missing info)
- File uploads (receive existing docs)
- Conditional sections (show/hide based on project type)
- Hidden fields (timestamp, source tracking)
- Webhooks for automation triggers

**Alternative tools:**
- Typeform (prettier, but expensive)
- Google Forms (free, but basic)
- Notion forms (if you're already in Notion)

---

## 4. QUICK WIN (Under 2 Minutes)

**Create a "Post-Call Notes" template in your notes app.**

Just these five fields:

```
Client:
Problem:
Success looks like:
Timeline:
Budget signal:
```

After every discovery call, fill this out in 2 minutes while it's fresh.

Even without the full automation, you've captured what you need for a SOW. The AI can work with this later.

---

## 5. WHAT'S NEXT

Next week: **The Client Update System** — because manually writing status emails is a waste of your billable hours. We'll build automated check-ins that keep clients informed without eating your time.

---

See you Thursday,
Steve

P.S. What's the longest you've ever spent on a single SOW? I once spent 4 hours on one that got changed twice after sending. Never again. Reply with your horror story.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
