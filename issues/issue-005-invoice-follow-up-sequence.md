# AI Prod Weekly — Issue #5

**Subject Line:** Stop chasing invoices (let automation do it)

---

Hey,

Invoice sent 14 days ago. Still unpaid. You're drafting the follow-up email for the third time this month, trying to sound firm but not aggressive.

"Just circling back on this..."

Meanwhile the client has probably just forgotten. They're not avoiding you—they're drowning in their own inbox.

Here's how to fix that without any awkward conversations.

---

## 1. AUTOMATION OF THE WEEK: The Invoice Follow-Up Sequence

**The problem:** Chasing payments is uncomfortable, time-consuming, and often delayed because you're putting it off. Late payments hurt your cash flow and your mood.

**The solution:** A 3-email sequence that runs automatically when invoices go overdue. Professional, persistent, and you never have to think about it.

**The sequence:**

```
Invoice due date passes
        ↓
   Day 3: Friendly nudge
        ↓
   Day 10: Clear reminder
        ↓
   Day 21: Final notice
        ↓
   (Optional) Day 30: Personal outreach trigger
```

**How to build it:**

**Step 1: Set up the trigger**

Use your invoicing tool's webhook or Zapier/Make integration:
- Stripe: "Invoice becomes overdue"
- QuickBooks: "Invoice past due"
- FreshBooks: "Payment overdue"

Or simpler: create a "Past Due" status in your invoice tracker and trigger when that's applied.

**Step 2: Create the email sequence**

**Email 1 — Day 3 (Friendly Nudge)**

Subject: Quick reminder: Invoice #{{invoice_number}}

```
Hi {{client_first_name}},

Just a quick note—Invoice #{{invoice_number}} for ${{amount}} was due on {{due_date}}.

If you've already sent payment, please disregard this. Otherwise, here's the invoice link for convenience: {{invoice_link}}

Let me know if you have any questions!

Best,
{{your_name}}
```

**Email 2 — Day 10 (Clear Reminder)**

Subject: Invoice #{{invoice_number}} — 10 days overdue

```
Hi {{client_first_name}},

Following up on Invoice #{{invoice_number}} for ${{amount}}, now 10 days past due.

Could you let me know when I can expect payment? If there's an issue with the invoice or you need to discuss payment terms, I'm happy to chat.

Invoice link: {{invoice_link}}

Thanks,
{{your_name}}
```

**Email 3 — Day 21 (Final Notice)**

Subject: Final notice: Invoice #{{invoice_number}}

```
Hi {{client_first_name}},

This is a final reminder for Invoice #{{invoice_number}} (${{amount}}), now 21 days past due.

Please process payment within the next 7 days to avoid any disruption to our work together.

If there's a reason for the delay, please let me know—I'd rather work something out than let this linger.

Invoice link: {{invoice_link}}

Best,
{{your_name}}
```

**Step 3: Add a personal outreach trigger (optional)**

If Day 30 arrives with no payment, don't send another automated email. Instead:
- Send yourself a Slack/email notification
- Add a task to your to-do list: "Call {{client_name}} about overdue invoice"

At this point, personal intervention is more effective than more automation.

**Time to implement:** 45 minutes
**Time saved:** 15-20 minutes per overdue invoice (plus the mental load)

---

## 2. AI INSIGHT: The Escalation Ladder

Notice the tone progression in those emails:
- Email 1: "Just a reminder" — assumes good faith
- Email 2: "Following up" — requests confirmation
- Email 3: "Final notice" — sets a deadline

This is the **escalation ladder**. Each step is slightly more direct, but none are aggressive.

You can apply this pattern to any sequence:
- Support ticket follow-ups
- Proposal reminders
- Project deadline warnings

Start soft. Escalate slowly. Let the sequence do the uncomfortable work.

---

## 3. TOOL OF THE WEEK: Bento (Free for Small Lists)

**What it does:** Email automation platform built for creators and small businesses.

**Why it works for payment follow-ups:**
- Easy to set up drip sequences
- Merge fields for personalization
- Can trigger from webhooks
- Simple, clean UI (not enterprise bloat)

**Alternatives:**
- Loops.so — developer-friendly, good free tier
- ConvertKit — if you're already using it for newsletter
- Make/Zapier + Gmail — if you want to DIY

The tool matters less than having the sequence. Start with whatever you already use.

---

## 4. QUICK WIN (Under 2 Minutes)

**Create an "Overdue" tag or status in your invoice tracker.**

Right now, open your invoicing tool and:
1. Create a tag/label called "Overdue - Needs Follow-up"
2. Apply it to any currently unpaid invoices past due date

This is the foundation. Even without automation, you now have a filtered view of who needs a nudge.

---

## 5. WHAT'S NEXT

Next week: **The Proposal Follow-Up System** — because "just checking in on that proposal" is the second-most awkward email you send. We'll automate that too.

---

See you Thursday,
Steve

P.S. What's your current system for tracking unpaid invoices? Reply and tell me—I'm curious how people handle this before automation.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
