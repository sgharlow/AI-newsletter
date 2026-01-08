# Issue #24: The Sales Pipeline Automator

**Subject Line:** Stop losing leads to follow-up failure

**Preview Text:** Build an automated sales pipeline in 90 minutes

---

## The Problem

You had a great discovery call. You sent the proposal. And then...

Silence.

You meant to follow up, but:
- Other clients needed attention
- You forgot which day you sent it
- You didn't want to seem pushy
- Life happened

Meanwhile, your prospect went with someone who did follow up.

This week's automation ensures no lead ever falls through the cracks.

---

## The Solution: Automated Sales Pipeline

Here's what we're building:

1. **Lead Scoring** - Automatically rank prospects by likelihood to close
2. **Smart Follow-ups** - Personalized sequences based on behavior
3. **Pipeline Health** - Real-time visibility into your deals
4. **Stale Deal Alerts** - Notifications before opportunities die
5. **Win/Loss Analysis** - Learn from every outcome

Total setup time: 90 minutes.

---

## Step 1: Define Your Pipeline Stages (10 minutes)

Before automation, clarity on stages:

**Standard Consulting Pipeline:**
```
1. Lead Captured (name, email, interest)
2. Discovery Scheduled (meeting booked)
3. Discovery Complete (needs understood)
4. Proposal Sent (offer delivered)
5. Negotiation (discussing terms)
6. Closed Won / Closed Lost
```

**For each stage, define:**
- Entry criteria (what triggers movement)
- Exit criteria (what moves to next stage)
- Maximum days before "stale"
- Required actions

---

## Step 2: Lead Scoring System (20 minutes)

Not all leads are equal. Score them automatically:

### Scoring Factors

**Fit Score (0-50 points):**
```
Budget mentioned: +15 points
Timeline mentioned: +10 points
Decision maker: +15 points
Right company size: +5 points
Right industry: +5 points
```

**Engagement Score (0-50 points):**
```
Replied to email: +10 points
Attended meeting: +20 points
Visited pricing page: +10 points
Downloaded resource: +5 points
Opened 3+ emails: +5 points
```

### The Scoring Prompt

```
Score this lead based on our criteria:

Lead Information:
- Name: [NAME]
- Company: [COMPANY]
- Source: [How they found us]
- Initial Message: [Their first contact]
- Interactions: [List of touchpoints]

Score on:
1. Budget signals (0-15)
2. Timeline urgency (0-10)
3. Decision authority (0-15)
4. Company fit (0-10)
5. Engagement level (0-50)

Return JSON:
{
  "total_score": X,
  "fit_score": X,
  "engagement_score": X,
  "priority": "hot|warm|cool",
  "recommended_action": "Specific next step",
  "key_signals": ["signal 1", "signal 2"],
  "missing_info": ["What we need to learn"]
}
```

---

## Step 3: Smart Follow-up Sequences (25 minutes)

### Post-Discovery Sequence

**Day 0 (after call):**
```
Subject: Great connecting, [Name] - next steps inside

Content:
- Thank them for time
- Recap 3 key points discussed
- Confirm next step agreed
- Attach any promised resources
```

**Day 2 (if no response):**
```
Subject: Quick question about [specific topic from call]

Content:
- Reference something specific they said
- Ask clarifying question
- Provide additional value (relevant article/insight)
```

**Day 5:**
```
Subject: [Resource] that addresses [their challenge]

Content:
- Share case study relevant to their situation
- Connect their problem to your solution
- Soft ask about timeline
```

### Post-Proposal Sequence

**Day 0 (proposal sent):**
```
Subject: Proposal for [Project Name] - [Company]

Content:
- Brief summary of what's included
- Key investment figure
- Clear next step
- Availability for questions
```

**Day 3 (if no response):**
```
Subject: Any questions on the proposal?

Content:
- Acknowledge they're busy
- Offer to jump on quick call
- Highlight one key benefit
```

**Day 7:**
```
Subject: Should I close your file?

Content:
- Non-pushy check-in
- Ask if priorities changed
- Offer to reconnect later if timing is off
```

### The Follow-up Generator Prompt

```
Generate a follow-up email for this situation:

Context:
- Prospect: [NAME] at [COMPANY]
- Stage: [Pipeline stage]
- Days since last contact: [X]
- Last interaction: [What happened]
- Their main challenge: [Problem they mentioned]
- Our solution: [What we proposed]

Previous emails sent: [List]

Generate an email that:
1. Feels personal, not templated
2. Provides new value
3. References specific conversation points
4. Has clear but soft CTA
5. Is under 150 words

Return:
{
  "subject_line": "...",
  "body": "...",
  "cta": "...",
  "best_send_time": "..."
}
```

---

## Step 4: Pipeline Health Dashboard (15 minutes)

### Key Metrics to Track

**Volume Metrics:**
- Leads this week/month
- Proposals sent
- Deals in each stage
- Conversion rate by stage

**Velocity Metrics:**
- Average days per stage
- Time to close (won)
- Time to close (lost)
- Stale deal count

**Value Metrics:**
- Pipeline value (weighted)
- Average deal size
- Win rate
- Revenue forecast

### Health Check Prompt

```
Analyze this pipeline snapshot:

Deals by Stage:
{{ pipeline_data }}

Historical Averages:
- Avg days in discovery: 5
- Avg days proposal→close: 14
- Win rate: 35%
- Avg deal size: $15,000

Identify:
1. Stale deals (over average time)
2. At-risk deals (negative signals)
3. Hot deals (positive momentum)
4. Pipeline gaps (missing stages)
5. Revenue forecast accuracy

Return:
{
  "health_score": 1-100,
  "stale_deals": [...],
  "at_risk_deals": [...],
  "hot_deals": [...],
  "forecast": {
    "expected_revenue_30d": "$X",
    "confidence": "high|medium|low"
  },
  "actions_needed": [...]
}
```

---

## Step 5: Stale Deal Alerts (10 minutes)

Automatic notifications when deals go cold:

### Alert Rules

```
Discovery stage > 7 days:
  → Alert: "Schedule discovery or disqualify"

Proposal stage > 10 days:
  → Alert: "Follow up or mark lost"

Any stage > 30 days:
  → Alert: "Deal likely dead - final outreach?"

No activity > 14 days:
  → Alert: "Prospect gone dark"
```

### Daily Pipeline Email

```
Generate a daily pipeline briefing:

Active Deals: {{ deals }}

Include:
1. Deals needing attention today
2. Follow-ups due
3. Proposals expiring
4. Wins/losses this week
5. One recommended focus deal

Keep under 200 words. Action-oriented.
```

---

## Step 6: Win/Loss Analysis (10 minutes)

Learn from every outcome:

### Post-Close Analysis Prompt

```
Analyze this closed deal:

Outcome: [Won/Lost]
Deal: [Company, value, duration]

Timeline:
{{ interaction_history }}

If Won:
- What worked well?
- Key turning points?
- Replicable tactics?

If Lost:
- Why did we lose?
- Where did we go wrong?
- What would we do differently?

For both:
- Ideal customer signals present?
- Process improvements needed?
- Competitor mentioned?

Return structured learnings for future deals.
```

### Monthly Win/Loss Review

```
Analyze this month's closed deals:

Won: {{ won_deals }}
Lost: {{ lost_deals }}

Identify:
1. Common patterns in wins
2. Common patterns in losses
3. Stage where most deals die
4. Highest converting lead sources
5. Pricing feedback patterns
6. Competitor displacement rate

Recommendations for next month:
- Process changes
- Messaging adjustments
- Qualification improvements
```

---

## The Complete n8n Workflow

```json
{
  "name": "Sales Pipeline Automator",
  "triggers": [
    "New lead captured (form/email)",
    "Pipeline stage change",
    "Daily schedule (8am)",
    "Deal closed (won/lost)"
  ],
  "lead_flow": [
    {
      "trigger": "New lead",
      "actions": [
        "Score lead",
        "Assign priority",
        "Add to CRM",
        "Queue welcome sequence",
        "Notify if hot lead"
      ]
    }
  ],
  "stage_flow": [
    {
      "trigger": "Stage changed",
      "actions": [
        "Update CRM",
        "Queue stage-appropriate sequence",
        "Set follow-up reminders",
        "Update pipeline metrics"
      ]
    }
  ],
  "daily_flow": [
    {
      "trigger": "8am daily",
      "actions": [
        "Check for stale deals",
        "Send follow-up reminders",
        "Generate pipeline briefing",
        "Alert on at-risk deals"
      ]
    }
  ],
  "close_flow": [
    {
      "trigger": "Deal closed",
      "actions": [
        "Run win/loss analysis",
        "Update metrics",
        "Add learnings to database",
        "Trigger appropriate sequence (onboarding/feedback)"
      ]
    }
  ]
}
```

---

## Real Results

After implementing this system:

**Before:**
- 40% of proposals never followed up properly
- Average close time: 45 days
- Win rate: 22%
- Lost deals to "went dark": 35%

**After:**
- 100% follow-up compliance
- Average close time: 28 days
- Win rate: 38%
- Lost to "went dark": 8%

The math: If you send 10 proposals/month at $10K average, improving win rate from 22% to 38% = **$16K additional revenue/month**.

---

## This Week's Action Items

**Hour 1:**
- [ ] Define your pipeline stages
- [ ] Create lead scoring criteria
- [ ] Set up CRM/spreadsheet tracker
- [ ] Build scoring automation

**Hour 2:**
- [ ] Write follow-up email templates
- [ ] Set up sequence triggers
- [ ] Create pipeline dashboard
- [ ] Configure stale deal alerts

**Ongoing (10 min/day):**
- [ ] Review daily pipeline briefing
- [ ] Execute recommended follow-ups
- [ ] Update deal stages
- [ ] Log win/loss learnings

---

## Template Downloads

Get the complete Sales Pipeline Automator:

- **Lead Scoring Calculator** - Spreadsheet with formulas
- **Follow-up Sequence Templates** - Copy-paste emails
- **Pipeline Dashboard Template** - Notion/Airtable
- **n8n Workflow JSON** - Importable automation

[Download Package] → aiprodweekly.com/templates/pipeline-automator

---

## Next Week Preview

**Issue #25: The Client Retention System**

Keep clients longer, increase lifetime value:
- Proactive check-in automation
- Satisfaction monitoring
- Renewal sequences
- Expansion opportunity detection

Acquisition is expensive. Retention is profitable.

---

*Thanks for reading AI Prod Weekly. Forward to a consultant who's losing deals to poor follow-up.*

*— The AI Prod Weekly Team*

---

**Links:**
- Pipeline Template: aiprodweekly.com/templates/pipeline-automator
- n8n Workflow: aiprodweekly.com/workflows/sales-pipeline
- Full guide: aiprodweekly.com/guides/pipeline-automation
