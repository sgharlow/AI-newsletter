# Issue #23: The Competitor Intelligence System

**Subject Line:** Your competitors publish every day. Are you watching?

**Preview Text:** Build automated competitor monitoring in 90 minutes

---

## The Problem

You're so busy serving clients that you forget to track your market.

Meanwhile, your competitors are:
- Publishing content weekly
- Adjusting their positioning
- Launching new services
- Changing their prices
- Winning your ideal clients

By the time you notice, you're already behind.

This week's automation fixes competitive blindness.

---

## The Solution: Automated Competitor Intelligence

Here's what we're building:

1. **Content Monitoring** - Track everything they publish
2. **Positioning Analysis** - Detect messaging changes
3. **Price Tracking** - Get alerts on pricing shifts
4. **Social Listening** - Monitor their engagement
5. **Weekly Brief** - AI-summarized intelligence report

Total setup time: 90 minutes.

---

## Step 1: Identify Your Competitors (10 minutes)

Start with your top 5 competitors. Be specific:

**Direct Competitors:**
- Same service, same market
- Clients would choose them OR you
- 2-3 companies max

**Adjacent Competitors:**
- Different service, same clients
- Or same service, different market
- 2-3 companies

**Aspirational Competitors:**
- Where you want to be in 2 years
- 1-2 companies to learn from

Write down:
- Company name
- Website URL
- Key social profiles (LinkedIn company, Twitter, etc.)
- Newsletter (if any)
- Key people to track

---

## Step 2: Content Monitoring (25 minutes)

### Blog/Website Changes

Use these tools to track new content:

**Option A: Visualping (Free tier available)**
```
Setup:
1. Add competitor's blog URL
2. Set to check daily
3. Alert on new posts detected
4. Forward to your monitoring email
```

**Option B: RSS + n8n**
```
Trigger: RSS feed updated
Filter: Only new items
Action:
- Store in database
- Send notification
- Queue for AI analysis
```

### Newsletter Tracking

Subscribe to every competitor newsletter with a dedicated email:

```
Setup: competitor-tracking@yourdomain.com
Rule: Auto-label by competitor name
Weekly: AI summarizes themes and tactics
```

### Social Content

**LinkedIn Company Pages:**
```
Tool: PhantomBuster or manual check
Frequency: Weekly
Track: Post frequency, engagement, topics
```

**Twitter/X:**
```
Tool: Tweetdeck list or n8n scraper
Track: All posts from competitor accounts
Alert: Posts with high engagement
```

---

## Step 3: The Analysis Prompt (20 minutes)

When new competitor content arrives, run this analysis:

```
Analyze this competitor content:

Competitor: [NAME]
Content Type: [blog post / social / newsletter / landing page]
URL: [LINK]
Content: [PASTE]

Extract:
1. **Main Message**: What are they trying to communicate?
2. **Target Audience**: Who is this for?
3. **Value Proposition**: What benefit are they promising?
4. **Proof Points**: What evidence do they cite?
5. **Call to Action**: What do they want readers to do?
6. **Tone Analysis**: Professional/casual/aggressive/educational?
7. **Keywords**: Main terms they're optimizing for
8. **Differentiation**: How are they positioning vs. alternatives?

Compare to their previous content:
- Is this a new direction?
- Consistent with brand or shift?
- Testing new messaging?

Return structured JSON for database storage.
```

---

## Step 4: Price & Service Monitoring (15 minutes)

### Pricing Page Tracking

```
Tool: Visualping or custom script
URL: Each competitor's pricing page
Check: Weekly
Alert: Any change detected
Archive: Screenshot before/after
```

### Service Offering Changes

Create a competitor service matrix:

| Competitor | Services | Prices | Packaging | Last Updated |
|------------|----------|--------|-----------|--------------|
| Competitor A | X, Y, Z | $$$ | Retainer | Jan 2026 |
| Competitor B | X, Y | $$ | Project | Jan 2026 |

Update monthly or on alerts.

### The Change Detection Prompt

When pricing/service pages change:

```
Compare these two versions of [Competitor] pricing page:

BEFORE:
[Previous version]

AFTER:
[Current version]

Analyze:
1. What specifically changed?
2. Are prices going up or down?
3. New services added or removed?
4. Packaging changes?
5. Positioning shifts?
6. Implications for our strategy?

Classify change as: Minor/Moderate/Major
Urgency: Informational/Review Soon/Action Needed
```

---

## Step 5: Social Listening Dashboard (10 minutes)

Track competitor mentions and sentiment:

### Brand Mentions

```
Tool: Google Alerts (free) or Mention (paid)
Query: "Competitor Name" -site:competitor.com
Frequency: Daily digest
Alert: High-authority mentions
```

### Engagement Tracking

Weekly, capture these metrics:

| Metric | Comp A | Comp B | You |
|--------|--------|--------|-----|
| LinkedIn followers | | | |
| LinkedIn engagement rate | | | |
| Newsletter opens (estimate) | | | |
| Content frequency | | | |
| Testimonials added | | | |

Trend over time to spot growth/decline.

---

## Step 6: The Weekly Intelligence Brief (10 minutes)

Every Sunday, AI generates your competitive intelligence report:

```
You are a competitive intelligence analyst.

Review this week's competitor activity:

[PASTE: All captured content, changes, social posts]

Generate a WEEKLY INTELLIGENCE BRIEF with:

## Executive Summary
2-3 key takeaways (what matters most)

## Content Activity
- What each competitor published
- Common themes across competitors
- Topics you should consider covering

## Positioning Changes
- Any messaging shifts detected
- New value propositions
- Audience targeting changes

## Pricing/Packaging
- Any changes detected
- Market pricing trends

## Social Trends
- Engagement patterns
- Topics getting traction
- Audience reactions

## Strategic Implications
- Threats to watch
- Opportunities to exploit
- Gaps in market coverage

## Recommended Actions
3-5 specific things to do or consider

Keep brief under 500 words. Focus on actionable insights.
```

---

## The Complete n8n Workflow

```json
{
  "name": "Competitor Intelligence System",
  "triggers": [
    "Visualping alert (new content)",
    "RSS new item",
    "Competitor newsletter received",
    "Weekly schedule (Sunday 8am)"
  ],
  "daily_flow": [
    {
      "name": "Content Capture",
      "action": "Store new content in database"
    },
    {
      "name": "Quick Analysis",
      "action": "Run basic categorization prompt"
    },
    {
      "name": "Alert Check",
      "action": "If major change, send immediate notification"
    }
  ],
  "weekly_flow": [
    {
      "name": "Aggregate Week",
      "action": "Pull all captured content from past 7 days"
    },
    {
      "name": "Deep Analysis",
      "action": "Run intelligence brief prompt"
    },
    {
      "name": "Generate Report",
      "action": "Format and send weekly brief email"
    },
    {
      "name": "Update Dashboard",
      "action": "Refresh metrics in Notion/Airtable"
    }
  ]
}
```

---

## Real Results

After running this system for 3 months:

**Caught:**
- A competitor pivoting to my niche (reacted in 2 weeks vs. 2 months)
- Pricing increases across the market (raised my prices confidently)
- Content gaps no one was filling (became the authority)
- A competitor struggling (picked up 2 of their clients)

**Time invested:** 15 minutes/week reviewing briefs
**Value created:** Incalculable strategic advantage

---

## This Week's Action Items

**Hour 1:**
- [ ] List top 5 competitors
- [ ] Set up Visualping for their blogs
- [ ] Create competitor tracking email
- [ ] Subscribe to their newsletters

**Hour 2:**
- [ ] Set up social monitoring
- [ ] Create competitor database (Notion/Airtable)
- [ ] Build weekly brief prompt
- [ ] Schedule first manual report

**Ongoing (15 min/week):**
- [ ] Review weekly intelligence brief
- [ ] Update competitor matrix
- [ ] Document strategic implications

---

## Template Downloads

Get my complete Competitor Intelligence setup:

- **Competitor Matrix Template** - Track all data in one place
- **Analysis Prompt Library** - All prompts from this guide
- **Weekly Brief Template** - Formatted report structure
- **n8n Workflow JSON** - Importable automation

[Download Package] → aiprodweekly.com/templates/competitor-intel

---

## Next Week Preview

**Issue #24: The Sales Pipeline Automator**

Never lose a lead to follow-up failure:
- Automatic lead scoring
- Personalized follow-up sequences
- Pipeline health monitoring
- Conversion optimization

From first contact to closed deal—systematized.

---

*Thanks for reading AI Prod Weekly. Forward to a consultant who's flying blind on competitors.*

*— The AI Prod Weekly Team*

---

**Links:**
- Competitor Intel Template: aiprodweekly.com/templates/competitor-intel
- n8n Workflow: aiprodweekly.com/workflows/competitor-monitoring
- Full guide: aiprodweekly.com/guides/competitive-intelligence
