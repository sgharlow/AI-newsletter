# AI Prod Weekly — Issue #15

**Subject Line:** 85% of companies now have AI agents—but who's watching what they do?

---

Hey,

Here's what happened in 2025: **85% of organizations deployed AI agents in at least one workflow**.

That's not hype—that's the actual adoption rate. Agents are booking meetings, processing invoices, triaging support tickets, and making decisions that used to require human approval.

The problem? Most of these agents run on autopilot with zero oversight.

When (not if) an agent makes a bad decision, who's responsible? The person who deployed it? The person who prompted it? The vendor who built it?

This week, we're building an AI agent governance system that answers those questions before they become lawsuits.

---

## 1. AUTOMATION OF THE WEEK: AI Agent Governance Framework

**The problem:** AI agents are making hundreds of decisions per day. Some are trivial (schedule this meeting). Some are not (approve this refund, send this email, change this data). Without governance, you have no way to:
- Audit what decisions were made
- Understand why decisions were made
- Intervene when patterns go wrong
- Prove compliance if questioned

**The solution:** A lightweight governance layer that monitors agent decisions, flags anomalies, and maintains an audit trail.

**The system:**

```
AI Agent Decision
        |
    Decision Logger
        |
   Classification Engine
   (Routine / Significant / Critical)
        |
   +---------+---------+
   |         |         |
Routine  Significant Critical
   |         |         |
Log only  Flag for  Block until
          review    human approval
```

**The 4 governance pillars:**

| Pillar | Purpose | How to Implement |
|--------|---------|------------------|
| **Audit Trail** | Record every decision | Log inputs, outputs, context |
| **Classification** | Categorize by risk | Define thresholds per agent |
| **Human-in-the-Loop** | Gate critical decisions | Approval workflows |
| **Anomaly Detection** | Spot drift/errors | Pattern monitoring |

---

## 2. HOW TO BUILD IT

**Step 1: Create your Agent Registry**

Before you can govern agents, you need to know what they are:

```
AGENT REGISTRY (Airtable/Notion/Database)

For each agent:
- Agent ID
- Agent Name (e.g., "Invoice Processor")
- Description
- Deployed Date
- Owner (person responsible)
- Decision Types (what it's allowed to do)
- Risk Tier (Low/Medium/High/Critical)
- Approval Required? (Yes/No, by tier)
- Data Access (what systems it reads/writes)
- Fallback Procedure (what happens if disabled)
```

**Step 2: Decision Classification Matrix**

Define what counts as routine vs. critical for each agent:

```
INVOICE PROCESSOR AGENT:

ROUTINE (log only):
- Process invoice <$500
- Match PO to invoice (exact match)
- Send payment confirmation email

SIGNIFICANT (flag for review):
- Process invoice $500-$5000
- Partial PO match (>90%)
- Dispute resolution reply

CRITICAL (require approval):
- Process invoice >$5000
- No PO match
- Credit or refund issuance
- Vendor communication about payment terms

BLOCKED (never allow):
- Change bank details
- Approve new vendors
- Modify payment schedules
```

**Step 3: The Decision Logger**

Every agent action should log:

```javascript
// Decision Log Schema
{
  "timestamp": "2026-01-15T09:23:45Z",
  "agent_id": "invoice-processor-v2",
  "decision_type": "process_invoice",
  "classification": "routine",
  "inputs": {
    "invoice_id": "INV-2026-1234",
    "amount": 450.00,
    "vendor": "Office Supplies Co",
    "po_match": "PO-2026-567"
  },
  "decision": "approved",
  "reasoning": "Amount under $500, exact PO match, vendor on approved list",
  "outputs": {
    "payment_id": "PAY-2026-890",
    "scheduled_date": "2026-01-20"
  },
  "human_override": false,
  "flagged": false
}
```

**Step 4: Anomaly Detection Rules**

Set up alerts for patterns that need attention:

```
VOLUME ANOMALIES:
- Agent processes >150% of daily average → Flag
- Agent makes no decisions in 24 hours → Alert
- Decision type never seen before → Block + Alert

PATTERN ANOMALIES:
- Approval rate drops >20% vs. baseline → Review
- Average processing time doubles → Investigate
- Same error 3x in 1 hour → Disable + Alert

FINANCIAL ANOMALIES:
- Total approved spend >120% of budget → Flag
- Single transaction >95th percentile → Review
- Unusual vendor activity → Flag

BEHAVIORAL DRIFT:
- Decision reasoning inconsistent with policy → Review
- New data source accessed → Alert
- Output format changed → Flag
```

**Step 5: Human-in-the-Loop Workflow**

For critical decisions:

```
Critical Decision Detected
        |
   Create approval request
        |
   Route to designated approver
   (based on decision type)
        |
   Set SLA (e.g., 4 hours)
        |
   +-----------+-----------+
   |           |           |
Approved    Rejected    Timeout
   |           |           |
Continue    Log reason   Escalate
            for denial   to backup
```

---

## 3. THE MINIMAL VIABLE GOVERNANCE

Don't try to build everything at once. Start here:

**Week 1: Audit Trail**
- Add logging to your most active agent
- Store logs in Airtable/Supabase/your database
- Include: timestamp, inputs, outputs, reasoning

**Week 2: Classification**
- Define 3 tiers for that agent's decisions
- Add logic to classify each decision
- Flag "significant" and "critical" separately

**Week 3: Human Loop**
- Build approval workflow for "critical" tier
- Slack notification → Thread reply to approve
- Or: Email → Reply "approved" / "rejected"

**Week 4: Monitoring**
- Daily summary: decisions by classification
- Weekly review: any flagged decisions
- Monthly audit: pattern changes

---

## 4. REALITY CHECK

⚠️ **Governance is not about blocking agents.** It's about trust. The goal is to let agents handle more decisions over time, not fewer.

⚠️ **Start with your highest-risk agent.** The one that touches money, customer data, or external communications.

⚠️ **Logging isn't optional.** When something goes wrong (and it will), "we don't know what happened" is the worst answer.

⚠️ **Review the edge cases.** The decisions agents struggle with are the ones that define your governance maturity.

---

## 5. THIS WEEK'S ACTION STEPS

**Today (15 mins):**
- List all AI agents you have in production
- Identify which one makes the most decisions per day
- Note: do you have ANY audit trail for it?

**This week (2 hours):**
- Create your Agent Registry (even a simple spreadsheet)
- Define classification tiers for your top agent
- Add basic logging (timestamp, inputs, outputs)

**This month (ongoing):**
- Build approval workflow for critical decisions
- Set up weekly review of flagged decisions
- Document the governance framework

---

## 6. PRO SECTION: The Governance Dashboard

For teams running multiple agents, build a real-time governance dashboard:

```
AGENT GOVERNANCE DASHBOARD

Header Metrics:
┌─────────────────┬──────────────┬───────────────┐
│ Active Agents   │ Today's      │ Pending       │
│ 7/7 healthy     │ Decisions    │ Approvals     │
│                 │ 1,247        │ 3             │
└─────────────────┴──────────────┴───────────────┘

Decision Distribution (Today):
[████████████░░░░░░░░] Routine: 1,182 (94.8%)
[█░░░░░░░░░░░░░░░░░░░] Significant: 52 (4.2%)
[░░░░░░░░░░░░░░░░░░░░] Critical: 13 (1.0%)

Flags This Week:
🟡 Invoice-Agent: 2 significant decisions near threshold
🔴 Email-Agent: 3 blocked decisions (new recipient domain)
🟢 Scheduler-Agent: No flags

Recent Critical Decisions:
• [Pending] Refund $2,340 to customer #4521
• [Approved 2h ago] Vendor payment schedule change
• [Rejected 4h ago] Auto-reply to legal inquiry

Weekly Trend:
Approval Rate:   98% → 97% → 99% → 98% [stable]
Avg Response:    45s → 42s → 48s → 44s [stable]
Blocked Actions: 2 → 5 → 1 → 3 [normal]
```

**Building this:**

1. **Data layer:** All logs flow to a central database (Supabase, Postgres, or even Airtable)

2. **Aggregation:** Scheduled jobs (n8n/Zapier) calculate daily metrics

3. **Visualization:** Retool, Grafana, or custom Next.js dashboard

4. **Alerting:** Webhook to Slack/Teams when thresholds hit

The dashboard isn't just monitoring—it's the proof you need when someone asks "who approved this decision?"

---

## 7. THE COMPLIANCE ANGLE

If you're in a regulated industry (finance, healthcare, legal), governance isn't optional:

**What regulators want to see:**
- Clear ownership of each agent
- Documented decision criteria
- Audit trail for all actions
- Evidence of human oversight
- Incident response procedures

**What you should have ready:**
- Agent registry with risk classifications
- Policy documents defining boundaries
- Logs exportable for 7+ years
- Incident log with remediation notes
- Regular audit reports

This isn't about compliance theater. It's about being able to answer: "Your AI agent did X. Explain why." with something better than "I don't know."

---

The 85% adoption number means your competitors have agents. The governance question is: do they have control?

Next week: Auto-pilot to co-pilot—building agent interfaces that let humans course-correct in real-time.

Stay automated,

Sam

P.S. — The governance framework above is intentionally lightweight. Enterprise versions need more (role-based access, version control, model drift detection). But if you have zero governance today, this gets you to "reasonable" in a week.

---

**Resources mentioned:**
- [Salesforce AI Agent Adoption Report (85% stat)](https://www.salesforce.com/news/stories/ai-agents-report/)
- [MCP Protocol for Agent Standards](https://modelcontextprotocol.io/)
- [EU AI Act Governance Requirements](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
