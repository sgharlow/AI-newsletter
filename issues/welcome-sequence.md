# AI Prod Weekly — Welcome Email Sequence

**Purpose:** Onboard new subscribers over 5 days, build trust, demonstrate value
**Trigger:** Immediately upon signup, then timed delivery

---

## Email 1: Welcome (Immediate)
**File:** `issue-000-welcome.md` (already exists)

---

## Email 2: The Biggest Mistake (Day 2)

**Subject Line:** The #1 mistake consultants make with AI automation

**Preview Text:** (It's not what you think)

---

Hey,

Quick follow-up from yesterday's welcome email.

Before I started automating my workflow, I made a mistake that cost me months of wasted effort:

**I tried to automate everything at once.**

I bought Zapier. Set up 15 workflows. Connected every app I used. Felt productive.

Two weeks later? Every automation was broken, I had no idea what was doing what, and I went back to doing everything manually.

Here's what I learned:

**Automate one thing. Make it bulletproof. Then add another.**

That's the approach behind every issue of AI Prod Weekly. One automation per week. Simple enough to build in 30 minutes. Reliable enough to forget about.

---

## The 15-Minute Rule

If an automation takes longer than 15 minutes to set up, it's too complex for the first version. Strip it down. Get it working. Improve later.

This week's issue covers **Gmail triage** — the first automation I recommend to everyone. It takes 15 minutes and saves 2-3 hours weekly.

Watch your inbox Thursday.

— Steve

P.S. Still curious about your biggest time sink. Hit reply if you haven't already — I read every response.

---

## Email 3: Your AI Stack (Day 4)

**Subject Line:** The 4 tools I actually use every day

**Preview Text:** No affiliate links. No sponsored picks.

---

Hey,

People always ask what tools I use. Here's the honest answer — just 4 things:

**1. Claude (or ChatGPT)**
- For drafting, editing, brainstorming
- I prefer Claude for longer writing, ChatGPT for quick questions
- **Cost:** $20/month

**2. Make.com (or n8n)**
- For connecting apps and building automations
- Make is easier to start. n8n is more powerful (and self-hostable)
- **Cost:** $9/month (Make) or free (n8n)

**3. Notion**
- For docs, tasks, client portals
- Could be Obsidian, Roam, whatever you prefer
- **Cost:** Free for personal use

**4. Cal.com (or Calendly)**
- For scheduling
- Eliminates 90% of "when are you free?" emails
- **Cost:** Free tier is enough

That's it. Four tools. Under $30/month total.

---

## The Truth About Tool Stacks

The consultants doing best with AI aren't using 20 tools. They're using 3-4 tools really well.

Every tool you add is:
- Another login to manage
- Another integration to break
- Another thing to learn

Keep it minimal. Build skills, not stacks.

— Steve

P.S. Thursday's issue shows exactly how to connect these tools for automated email triage. Simple, practical, works.

---

## Email 4: What to Expect (Day 6)

**Subject Line:** Here's what you'll get every Thursday

**Preview Text:** Quick rundown before your first full issue

---

Hey,

Your first full issue of AI Prod Weekly lands Thursday. Here's what to expect:

**Every issue has 4 sections:**

1. **Automation of the Week** (5 min read, 15-30 min to build)
   - Step-by-step instructions
   - Tools needed
   - Time saved estimate

2. **AI Insight** (2 min read)
   - One concept that makes AI more useful
   - Not theory — practical mental models

3. **Tool Spotlight** (1 min read)
   - Something I actually use
   - Honest take, no affiliate BS

4. **Quick Win** (under 2 min to implement)
   - Something you can do right now
   - Immediate payoff

**Total read time:** 8-10 minutes
**Total implementation time:** 15-30 minutes (if you build the automation)

---

## How to Get the Most Value

**Option A: Just read it**
- You'll pick up ideas, tools, and mental models
- Zero effort, some benefit

**Option B: Build one automation per month**
- Pick the one that matches your biggest pain point
- 30 minutes/month → 5+ hours saved/month

**Option C: Build every automation**
- You'll have a fully automated workflow in 3 months
- This is what I did — it changed how I work

No pressure. Take what's useful, ignore what's not.

See you Thursday,
Steve

---

## Email 5: Before Thursday (Day 7, morning)

**Subject Line:** Your first issue drops tomorrow

**Preview Text:** Gmail triage automation incoming

---

Hey,

Quick heads up: Issue #1 lands in your inbox tomorrow morning.

**What it covers:**
- AI-powered Gmail triage
- Auto-sort every email into 4 categories
- 15 min to set up, 2-3 hours/week saved

**What you'll need:**
- Gmail account
- 15 minutes of focused time
- Optional: Make.com or n8n account (free tier works)

If you want to build the automation, block 30 minutes tomorrow. Friday email cleanup becomes instant.

Talk soon,
Steve

---

## Sequence Timing Summary

| Email | Send Time | Subject |
|-------|-----------|---------|
| 1 | Immediate | Welcome to AI Prod Weekly |
| 2 | Day 2, 9am | The #1 mistake consultants make |
| 3 | Day 4, 9am | The 4 tools I actually use |
| 4 | Day 6, 9am | Here's what you'll get every Thursday |
| 5 | Day 7, 9am | Your first issue drops tomorrow |

---

## Technical Notes

**Platform:** Supabase + Resend (or Buttondown)

**Sequence Logic:**
1. On signup → Send Email 1 immediately
2. Schedule Email 2 for signup_date + 48 hours
3. Schedule Email 3 for signup_date + 96 hours
4. Schedule Email 4 for signup_date + 144 hours
5. Schedule Email 5 for next_thursday - 24 hours (if applicable)

**After Sequence:**
- Move subscriber to main list
- Begin receiving Thursday issues

---

*Last updated: December 28, 2025*
