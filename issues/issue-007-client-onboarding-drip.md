# AI Prod Weekly — Issue #7

**Subject Line:** The first 30 days that keep clients forever

---

Hey,

You closed the deal. Contracts signed. Payment received. Victory.

Now what?

Most freelancers and consultants move straight into the work. But here's the thing: the first 30 days set the tone for the entire relationship. Clients who feel informed, valued, and confident in their decision are the ones who become repeat buyers and referral sources.

The problem? You're busy doing the actual work. You don't have time to send check-in emails, share resources, and manage expectations.

That's exactly what automation is for.

---

## 1. AUTOMATION OF THE WEEK: The Client Onboarding Drip

**The problem:** New clients don't know what to expect. They're excited but also anxious. Without regular communication, that anxiety turns into "are they even working on my project?"

**The solution:** A 30-day email sequence that runs automatically after project kickoff. Keeps clients informed, sets expectations, and builds trust—without you writing a single email after setup.

**The sequence:**

```
Project starts
      |
 Day 0: Welcome + what's next
      |
 Day 3: How we work together
      |
 Day 7: First check-in
      |
 Day 14: Progress update template
      |
 Day 21: Resources + FAQ
      |
 Day 30: Feedback request
```

**How to build it:**

**Step 1: Set up the trigger**

When a new client starts:
- Add them to a "New Client" segment in your email tool
- Or trigger via webhook when their project status changes to "Active"
- Or simply add their email manually when you send the contract

**Step 2: Create the email sequence**

**Email 1 — Day 0 (Welcome + What's Next)**

Subject: Welcome aboard! Here's what happens next

```
Hi {{client_first_name}},

I'm excited to get started on {{project_name}}.

Here's what to expect over the next few weeks:

1. **This week:** I'll be diving into {{first_deliverable}}
2. **Check-ins:** You'll hear from me at least once a week
3. **Questions:** Reply to any email—I read everything

If you need anything before our first update, just reach out.

Looking forward to this,
{{your_name}}
```

**Email 2 — Day 3 (How We Work Together)**

Subject: Quick note on how I work

```
Hi {{client_first_name}},

Wanted to share a few things about how I work—so there are no surprises:

**Communication:** I respond to emails within 24 hours on business days. For urgent issues, text me at {{your_phone}}.

**Revisions:** {{revision_policy}}

**Timeline:** I'll flag any delays immediately. No surprises at deadline.

If you have a preferred communication style or expectations I should know about, let me know!

{{your_name}}
```

**Email 3 — Day 7 (First Check-in)**

Subject: Week 1 check-in

```
Hi {{client_first_name}},

Quick update on where we are:

**Completed:**
- {{completed_items}}

**In progress:**
- {{in_progress_items}}

**Coming up:**
- {{next_items}}

Everything is on track. Questions? Just reply.

{{your_name}}
```

**Email 4 — Day 14 (Progress Update)**

Subject: Two-week update on {{project_name}}

```
Hi {{client_first_name}},

We're two weeks in—here's the status:

**Progress:** {{progress_percentage}}% complete
**What's done:** {{summary_of_completed}}
**What's next:** {{next_milestone}}
**On schedule:** Yes / Slightly ahead / {{adjusted_timeline}}

Any questions or concerns? Now's a good time to flag them.

{{your_name}}
```

**Email 5 — Day 21 (Resources + FAQ)**

Subject: Some resources you might find helpful

```
Hi {{client_first_name}},

As we get closer to wrapping up, I wanted to share a few resources:

{{relevant_resources}}

Also, clients often ask:

**Q: What happens after delivery?**
A: {{post_delivery_support}}

**Q: Can I reach out later if I have questions?**
A: {{ongoing_support_policy}}

Let me know if you have questions I haven't covered.

{{your_name}}
```

**Email 6 — Day 30 (Feedback Request)**

Subject: Quick question about your experience

```
Hi {{client_first_name}},

It's been about a month since we started working together, and I'd love to hear how it's going.

Two quick questions:

1. What's working well?
2. What could be better?

Your feedback helps me improve. And if you're happy with the work, I'd be grateful for a testimonial or referral—but only if it feels right.

Thanks for trusting me with {{project_name}}.

{{your_name}}
```

**Step 3: Personalize the templates**

Before adding a client to the sequence, spend 5 minutes customizing:
- Project-specific details (deliverables, timelines)
- Your policies (revisions, communication)
- Relevant resources for their industry

This takes the sequence from "automated" to "thoughtful."

**Time to implement:** 60 minutes
**Time saved:** 2-3 hours per client over 30 days (plus relationship value)

---

## 2. AI INSIGHT: The Anxiety Timeline

New clients experience predictable anxiety spikes:

- **Day 1-3:** "Did I make the right choice?"
- **Day 7:** "Are they actually working on this?"
- **Day 14:** "Is this on track?"
- **Day 21-30:** "What happens when this ends?"

Your onboarding sequence addresses each spike before it becomes a problem. By the time they'd normally worry, they've already received reassurance.

This is proactive trust-building. It's not about sending more emails—it's about sending the *right* emails at the *right* time.

---

## 3. TOOL OF THE WEEK: Notion + Make (Power Combo)

**What it does:** Notion as your client database, Make as your automation engine.

**Why it works for onboarding:**
- Notion: Track client details, project status, and notes in one place
- Make: Trigger email sequences when Notion status changes
- Together: Update a client to "Active" in Notion → automatically starts the drip

**Setup overview:**
1. Create a Notion database with client info + "Status" column
2. Connect Make to watch for status changes
3. When status = "Active," trigger your email sequence

**Alternatives:**
- Airtable + Zapier (similar approach)
- HubSpot (all-in-one but more complex)
- Dubsado (built for client management)

---

## 4. QUICK WIN (Under 2 Minutes)

**Draft your "Day 0" welcome email right now.**

Open a doc and write:
1. One sentence of excitement
2. Three things they can expect
3. One clear next step

Save it. This is the foundation of your onboarding sequence.

---

## 5. WHAT'S NEXT

Next week: **The Content Repurposing Pipeline** — because that blog post you spent 4 hours writing should become 10 pieces of content, not one. We'll automate the transformation.

---

See you Thursday,
Steve

P.S. What's your current onboarding process for new clients? Do you have one, or do you just dive into the work? Reply and share—I'm always curious.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
