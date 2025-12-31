# AI Prod Weekly — Issue #10

**Subject Line:** Stop chasing bad leads (let the system do it)

---

Hey,

You get an inquiry. Sounds promising. You schedule a call. Thirty minutes later, you realize they have no budget, no timeline, and no authority to hire you.

That's 30 minutes gone. Plus the 15 minutes of back-and-forth to schedule it.

Now multiply by every "just picking your brain" request you've fielded this year.

The solution isn't saying no to everyone. It's building a system that qualifies leads before they hit your calendar.

---

## 1. AUTOMATION OF THE WEEK: The Lead Qualification System

**The problem:** Every inquiry feels urgent. You don't want to miss a good opportunity, so you take every call. But most calls aren't opportunities—they're tire-kickers, budget mismatches, or people who aren't ready to commit.

**The solution:** An automated qualification flow that scores leads, asks the right questions upfront, and routes only qualified prospects to your calendar.

**The system:**

```
New inquiry arrives
        |
   Auto-response
   with intake form
        |
Form submitted → Score calculated
        |
   +----+----+----+
   |         |         |
Score < 40   40-70    Score > 70
   |         |         |
Auto-decline  Nurture   Direct to
with resources sequence  calendar
```

**How to build it:**

**Step 1: Create your intake form**

Every lead gets the same form. No exceptions. Include:

```
Required fields:
- What's your primary challenge? (open text)
- What's your timeline? (dropdown: This month / This quarter / Exploring)
- What's your budget range? (dropdown: <$1K / $1-5K / $5-10K / $10K+)
- Have you worked with a consultant before? (Yes/No)
- What's your role? (dropdown: Founder / Manager / Individual contributor)
```

**Step 2: Build your scoring algorithm**

Assign points to each response:

```
Timeline:
- This month = 30 points
- This quarter = 20 points
- Exploring = 5 points

Budget:
- $10K+ = 30 points
- $5-10K = 25 points
- $1-5K = 15 points
- <$1K = 0 points

Role:
- Founder/Owner = 20 points
- Manager = 15 points
- Individual contributor = 5 points

Previous consultant experience:
- Yes = 10 points
- No = 5 points

Challenge description (keyword scoring):
- Contains "urgent" or "ASAP" = +10
- Contains "budget approved" = +15
- Contains "just exploring" = -10
```

**Step 3: Set up routing rules**

```
Score 70+: HIGH PRIORITY
- Auto-send calendar link
- Notify you immediately
- Add to CRM as "Hot Lead"

Score 40-69: NURTURE
- Add to email sequence
- Send case study + resources
- Re-score after engagement

Score < 40: LOW PRIORITY
- Send polite decline template
- Offer free resources (blog, newsletter)
- No calendar access
```

**Step 4: Create your response templates**

**High Score (70+):**
```
Subject: Let's talk — I have availability this week

Hi {{first_name}},

Thanks for reaching out. Based on what you've shared, I think we could
be a great fit.

I've got a few slots open this week: {{calendar_link}}

Looking forward to connecting.
{{your_name}}
```

**Medium Score (40-69):**
```
Subject: Thanks for reaching out

Hi {{first_name}},

I appreciate you getting in touch. I want to make sure I'm the right
fit before we hop on a call.

I put together a few resources that might help clarify whether we
should work together:

- {{case_study_link}}
- {{process_overview_link}}

Take a look, and if it resonates, reply to this email and I'll
send over my calendar.

{{your_name}}
```

**Low Score (<40):**
```
Subject: Thanks for your interest

Hi {{first_name}},

Thanks for reaching out! Based on what you've shared, I don't think
I'm the right fit for your current situation.

That said, here are some resources that might help:
- {{free_guide_link}}
- {{newsletter_signup}}
- {{alternative_recommendations}}

Best of luck with your project.
{{your_name}}
```

**Step 5: Implement with your tools**

**Typeform + Zapier approach:**
```
Trigger: New Typeform submission
Action 1: Calculate score (Zapier Code step)
Action 2: Add to CRM with score
Action 3: Branch based on score
  - High: Send calendar email
  - Medium: Add to nurture sequence
  - Low: Send decline email
```

**Tally + Make approach:**
```
Trigger: New Tally submission
Module 1: Calculate score (JavaScript)
Module 2: Router based on score
  - Route 1: Calendly invite (high)
  - Route 2: ConvertKit tag (medium)
  - Route 3: Template email (low)
```

**Time to implement:** 60-90 minutes
**Time saved:** 2-4 hours per week (no more bad-fit calls)

---

## 2. AI INSIGHT: The Hidden Cost of "Maybe" Leads

The worst leads aren't the obvious nos.

They're the maybes.

The ones who seem interested but never commit. The ones who schedule calls, reschedule twice, then ghost. The ones who want "just a quick chat" that turns into an hour of free consulting.

A qualification system doesn't just filter out bad leads. It filters out the maybes who drain your energy and distort your pipeline.

When your calendar only shows qualified prospects, you close more deals—not because you're selling better, but because you're talking to people who are ready to buy.

---

## 3. TOOL OF THE WEEK: Typeform + Zapier

**Why this combo:**
- Typeform makes forms feel conversational (higher completion rates)
- Zapier handles the logic and routing
- Together, they replace a $500/month lead qualification tool

**Key Typeform features for qualification:**
- Logic jumps (skip questions based on answers)
- Hidden fields (track source, campaign)
- Calculator (basic scoring in-form)
- Partial submissions (capture even incomplete leads)

**Alternatives:**
- Tally (free, simpler) + Make
- JotForm + Zapier (more form fields)
- Fillout + n8n (self-hosted option)

---

## 4. QUICK WIN (Under 2 Minutes)

**Add one qualifying question to your contact form right now.**

If you don't have a full system yet, add this single question:

"What's your timeline for starting this project?"
- [ ] This month
- [ ] This quarter
- [ ] Next year
- [ ] Just exploring

That one question will tell you immediately who's serious.

---

## 5. WHAT'S NEXT

Next week: **The Weekly Review Automation** — because reflection without a system becomes procrastination. We'll build an automated weekly review that asks the right questions and surfaces insights automatically.

---

See you Thursday,
Steve

P.S. What's your current lead qualification process? "Gut feel" counts as an answer—most people are there. Reply and tell me. I'm curious how you currently filter.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
