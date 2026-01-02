# AI Prod Weekly — Issue #19

**Subject Line:** How I write $50K+ proposals in under 2 hours (and close 70%)

---

Hey,

My proposals used to take forever.

8 hours of research.
4 hours of writing.
2 hours of formatting.
1 hour of second-guessing.

15 hours for a single proposal. Sometimes they won. Often they didn't.

Now? 2 hours. Sometimes less.

And my close rate went from 30% to 70%.

This week: the AI-augmented proposal workflow that changed my business.

---

## 1. THE PROPOSAL PARADOX

Here's what nobody tells you:

**Spending more time on proposals doesn't increase your close rate.**

It just increases your sunk cost.

The proposals that win have:
- Clear understanding of the problem
- Obvious fit between problem and solution
- Confidence in delivery
- Professional formatting

None of those require 15 hours.

All of them can be AI-augmented.

---

## 2. THE 2-HOUR PROPOSAL FRAMEWORK

My exact process:

### Hour 1: Discovery + Structure (60 minutes)

**First 15 minutes:** Client research.

Prompt to Claude:
```
Research this company and summarize:
1. Company overview (size, industry, revenue if public)
2. Recent news (last 6 months)
3. Key challenges in their industry
4. Their likely priorities right now
5. Competitors and market position

Company: [Name]
Website: [URL]
Industry: [Industry]
```

**Next 15 minutes:** Problem clarification.

After the discovery call, I speak my notes into a voice memo (see Issue #18).

Prompt:
```
From this discovery call summary, extract:
1. The core problem they described
2. The symptoms they mentioned
3. What success looks like to them
4. Any constraints (budget, timeline, resources)
5. Who makes the decision
6. What happens if they don't solve this

Summary:
[paste transcript]
```

**Next 15 minutes:** Solution mapping.

Prompt:
```
Given this problem and my service offerings, suggest:
1. Primary solution approach
2. Why this approach fits their specific situation
3. Key deliverables (3-5)
4. Timeline estimate
5. Potential risks and mitigations

Problem: [from above]
My services: [your service list]
```

**Final 15 minutes:** Price and scope.

I do this manually. AI gives options, I make decisions:
- What's the minimum viable engagement?
- What's the ideal engagement?
- What's the premium version?

I usually propose the ideal with mention of premium.

---

### Hour 2: Writing + Polish (60 minutes)

**First 30 minutes:** First draft.

The big prompt:
```
Write a consulting proposal with these sections:

1. EXECUTIVE SUMMARY (one paragraph)
Problem: [paste]
Solution: [paste]
Investment: [amount]
Timeline: [duration]

2. UNDERSTANDING YOUR SITUATION (half page)
Demonstrate understanding of their specific problem.
Reference their industry and challenges.
Show you've done the research.

3. PROPOSED APPROACH (one page)
High-level methodology.
Key activities and deliverables.
What they need to provide.

4. INVESTMENT AND TIMELINE
Pricing breakdown.
Payment terms.
Start date options.

5. WHY [YOUR COMPANY] (half page)
Brief credentials.
Relevant experience.
Why you're the right fit.

6. NEXT STEPS
Clear action to proceed.
Expiration date (creates urgency).
Contact for questions.

Use professional but conversational tone.
Include specific details from research.
Keep total length under 5 pages.
```

**Next 20 minutes:** Review and revision.

I read the draft once. Mark anything that:
- Sounds generic
- Doesn't match my voice
- Misses an important point
- Overpromises or underpromises

Prompt for revision:
```
Revise these sections:
[paste sections]

Issues:
- [your specific feedback]

Keep the structure. Fix the specifics.
```

**Final 10 minutes:** Format and send.

I paste into my proposal template (Google Docs or Notion).
Add my branding.
Generate PDF.
Write cover email.
Send.

Done.

---

## 3. THE PROMPTS THAT MAKE THE DIFFERENCE

Three prompts that dramatically improved quality:

### The Specificity Prompt

```
Make this section more specific to [CLIENT NAME].

Current text:
[paste generic text]

Add specific references to:
- Their company name
- Their industry challenges
- Details from our discovery call
- Their stated success metrics

Never use phrases like "companies like yours" or "in your industry."
Always use their actual situation.
```

This alone improves proposals 50%.

### The Objection Anticipator

```
What objections might [CLIENT NAME] have to this proposal?

Based on:
- Their company size and constraints
- The investment amount
- The timeline we proposed
- Their industry norms

For each objection, suggest a one-sentence response I could add to preempt it.
```

I add these preemptive answers to the proposal itself.

### The Confidence Calibrator

```
Rate this proposal on confidence (1-10) for each section:

[paste proposal]

For any section below 7:
- What's missing?
- What sounds uncertain?
- How can I make it more confident?

Confident proposals close. Uncertain proposals don't.
```

---

## 4. WHAT AI CAN'T DO (AND SHOULDN'T)

**Pricing decisions:** AI can suggest ranges. You decide the number.

**Relationship context:** AI doesn't know the chemistry from the call. You do.

**Risk assessment:** AI can list risks. You judge which matter.

**The close:** AI can write next steps. You deliver them with conviction.

The proposal is 50% document, 50% relationship.

AI handles the document. You handle the relationship.

---

## 5. THE PROPOSAL EMAIL

The proposal is half the battle. The email is the other half.

My template:
```
Subject: [PROJECT NAME] Proposal — [COMPANY NAME]

Hi [NAME],

Following our conversation, I'm excited to share a proposal for [brief problem description].

Key points:
• [Primary deliverable]
• [Timeline]
• [Investment]

Full proposal attached. I've included [specific detail they mentioned] based on what you shared about [their situation].

Quick next steps:
1. Review the proposal (10 minutes)
2. Let me know any questions
3. If it looks good, sign and return page 6

Happy to hop on a quick call if helpful. Otherwise, I'll follow up [day] if I haven't heard back.

Looking forward to working together.

[Your name]
```

Short. Specific. Clear action.

---

## 6. COMMON MISTAKES (I MADE ALL OF THEM)

**Mistake #1: Too long.**
Nobody reads a 20-page proposal.
Keep it under 5 pages.
If they need more detail, they'll ask.

**Mistake #2: Too generic.**
"We work with companies in your industry..."
No. You work with THEM on THIS problem.

**Mistake #3: Too much about you.**
They don't care about your methodology.
They care about their outcomes.

**Mistake #4: Buried pricing.**
Put the number on page 1 or 2.
If they're going to reject on price, let them do it fast.

**Mistake #5: No deadline.**
"This proposal is valid until..."
Creates urgency. Works every time.

---

## THIS WEEK'S ACTION

Take your last proposal and run it through this:

```
Critique this proposal:

[paste proposal]

Score 1-10 on:
1. Specificity to this client
2. Clarity of the problem statement
3. Confidence of the solution
4. Reasonableness of the investment
5. Ease of saying yes

For any score below 7, explain what's wrong and how to fix it.
```

Then rewrite it. See the difference.

---

## ONE AUTOMATION TO STEAL

**The Proposal Accelerator:**

**Trigger:** New entry in "Proposals" Airtable/Notion

**Inputs collected:**
- Client name and website
- Discovery call notes (voice or text)
- Approximate budget discussed
- Timeline mentioned
- Decision maker name

**Workflow:**
1. Research company (Claude)
2. Structure problem/solution (Claude)
3. Generate draft proposal (Claude)
4. Create Google Doc from template
5. Send notification: "Draft ready for review"

**Your role:** Review, refine, price, send.

**Time saved:** 6+ hours per proposal.

---

## WHAT'S NEXT

Next week: "The Weekly Review System" — My Friday ritual that keeps 15 projects on track without losing my mind.

Until then, may your proposals be short, specific, and signed.

Cheers,
AI Prod Weekly

---

P.S. The math: If this workflow helps you close one extra $20K project per year, it pays for itself 400x over. One project.

P.P.S. Know a consultant drowning in proposals? Forward this.
