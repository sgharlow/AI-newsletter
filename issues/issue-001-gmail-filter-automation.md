# AI Productivity Weekly — Issue #1

**Subject Line:** The 15-minute Gmail cleanup that saves 3 hours/week

---

Hey,

Welcome to AI Productivity Weekly. Every Thursday: one automation, one insight, one tool. Let's dive in.

---

## 1. AUTOMATION OF THE WEEK: AI-Powered Gmail Triage

**The problem:** Your inbox is a mess. Client emails mixed with newsletters, receipts buried under LinkedIn notifications. You spend 20+ minutes daily just *finding* what matters.

**The solution:** A Gmail filter + AI classification system that auto-sorts incoming mail into 4 categories:

- **@Action** — Needs your response today
- **@Review** — Read when you have time
- **@Reference** — Receipts, confirmations, FYI
- **@Automated** — Newsletters, notifications, marketing

**How to build it (15 minutes):**

1. Create 4 Gmail labels: `@Action`, `@Review`, `@Reference`, `@Automated`
2. Set up filters for obvious categories:
   - `from:linkedin.com` → `@Automated`
   - `from:newsletter OR from:substack` → `@Review`
   - `subject:receipt OR subject:confirmation` → `@Reference`
3. For everything else, use Make.com or n8n to:
   - Trigger on new email
   - Send subject + sender to GPT-4 with this prompt:
   ```
   Classify this email: [subject] from [sender]
   Categories: Action (needs response), Review (read later), Reference (save), Automated (notifications)
   Reply with only the category name.
   ```
   - Apply the matching Gmail label

**Time to implement:** 15 minutes for basic filters, +30 min for AI classification
**Time saved:** 2-3 hours/week (conservative estimate)

---

## 2. AI INSIGHT: The 80/20 of Prompt Engineering

Most prompt advice is overthinking it. Here's what actually matters:

**Give examples.** One good example beats ten paragraphs of instructions. Show the AI what you want, don't just describe it.

```
Bad: "Write professional emails"
Good: "Write emails like this example: [paste your best email]"
```

That's it. Examples > instructions. Every time.

---

## 3. TOOL OF THE WEEK: Cleanshot X (Mac) / ShareX (Windows)

**What it does:** Screenshot + annotation + instant cloud upload

**Why it matters:** Stop wasting 5 minutes per screenshot doing File > Save > Open > Annotate > Export > Upload. One keystroke, done.

**The consultant use case:** Client asks "where do I click?" — capture, circle it, paste link. 10 seconds.

**Price:** Cleanshot $29 one-time / ShareX is free

---

## 4. QUICK WIN (Under 2 Minutes)

**Add this to your email signature:**

```
Prefer async? Book a time: [Calendly link]
Response time: 24-48 hours for non-urgent items.
```

This one line reduces "just checking in" follow-ups by 50%+. Clients stop wondering when you'll reply.

---

## 5. WHAT'S NEXT

Next week: **Meeting Notes to Action Items** — an automation that extracts tasks from your meeting transcripts and creates them in your task manager. No more forgotten follow-ups.

---

See you Thursday,
Steve

P.S. Know a consultant drowning in email? Forward this to them. They'll thank you.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
