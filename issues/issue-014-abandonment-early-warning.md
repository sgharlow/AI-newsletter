# AI Prod Weekly — Issue #14

**Subject Line:** 42% of AI projects get abandoned—here's how to spot yours before it's too late

---

Hey,

Here's a stat that should scare every consultant: **42% of AI projects were abandoned in 2025**.

That's up from 17% in 2024—a 147% increase in project abandonment.

The scary part? Most teams don't realize their project is dying until it's already dead. The warning signs are there—scattered across Slack, email, project tools, and meeting notes—but no one's watching for them.

This week, we're building an early warning system that spots dying projects before they flatline.

---

## 1. AUTOMATION OF THE WEEK: Project Abandonment Early Warning System

**The problem:** Projects don't fail suddenly. They die slowly from a thousand small signals—delayed responses, missed milestones, enthusiasm fade, decision paralysis. By the time someone calls the death, it's been on life support for weeks.

**The solution:** An automated monitoring system that scores project health daily and alerts you when a project shows abandonment patterns.

**The system:**

```
Multiple data sources
(Slack, Email, Calendar, PM Tool)
        |
   Daily health check (6am)
        |
   AI analyzes 7 abandonment signals
        |
   Calculates Project Health Score (0-100)
        |
   If score drops >15 points → ALERT
   If score <50 for 3 days → CRITICAL
```

**The 7 abandonment signals:**

Research from S&P Global and project post-mortems reveals consistent patterns before project death:

| Signal | What to Track | Warning Threshold |
|--------|---------------|-------------------|
| Response Lag | Client response time | >3 days average |
| Decision Paralysis | Open decisions waiting | >5 decisions, >2 weeks old |
| Meeting Cancellations | Canceled/rescheduled rate | >30% in 2 weeks |
| Stakeholder Silence | Key people going quiet | No touchpoint in 10+ days |
| Scope Conversations | "Maybe we should..." discussions | 3+ scope changes proposed |
| Budget Mentions | Unexpected cost discussions | Any unplanned budget talk |
| Enthusiasm Fade | Emoji/exclamation use declining | 50% decrease from baseline |

Yes, that last one is real. Research shows communication tone predicts project outcomes.

**How to build it:**

**Step 1: Create your signal tracking database**

In Airtable, Notion, or your preferred tool:

```
PROJECT HEALTH TRACKER

Project Info:
- Project name
- Client name
- Project stage (discovery, build, launch, maintenance)
- Baseline health score
- Current health score
- Last alert date

Daily Signals:
- Date
- Avg response time (hours)
- Open decisions count
- Meetings scheduled
- Meetings canceled
- Last stakeholder contact (days)
- Scope change mentions
- Budget mentions
- Communication tone score (1-10)
```

**Step 2: Automated signal collection**

Use Zapier/Make to pull signals automatically:

```
Slack Integration:
- Trigger: New message in project channel
- Action: Log message timestamp, sender, word count
- Action: AI sentiment analysis → tone score

Email Integration:
- Trigger: Email with project tag received
- Action: Calculate response time from previous email
- Action: Flag if >72 hours

Calendar Integration:
- Trigger: Event modified/canceled
- Action: Log if project-related meeting
- Action: Track cancellation rate

PM Tool Integration:
- Trigger: Decision/blocker marked open
- Action: Add to open decisions count
- Action: Calculate days open
```

**Step 3: Daily health calculation**

Run this every morning:

```
Health Score Formula (100 points total):

Response Speed (20 pts):
- <24h avg = 20
- 24-48h = 15
- 48-72h = 10
- >72h = 5

Decision Velocity (20 pts):
- 0-2 open decisions = 20
- 3-5 = 15
- 6-10 = 10
- >10 = 5

Meeting Stability (15 pts):
- <10% cancel rate = 15
- 10-20% = 10
- 20-30% = 5
- >30% = 0

Stakeholder Engagement (15 pts):
- Contact in 3 days = 15
- 4-7 days = 10
- 8-14 days = 5
- >14 days = 0

Scope Stability (15 pts):
- No scope talk = 15
- 1 mention = 10
- 2-3 mentions = 5
- >3 mentions = 0

Budget Confidence (10 pts):
- No concerns = 10
- Minor mentions = 5
- Active discussions = 0

Tone Trend (5 pts):
- Stable/improving = 5
- Declining <20% = 3
- Declining >20% = 0
```

**Step 4: Alert automation**

```
Alert Rules:

YELLOW ALERT (notification):
- Score drops 10-15 points in 24 hours
- Any single signal at warning threshold
- Score below 70

RED ALERT (urgent):
- Score drops >15 points in 24 hours
- 3+ signals at warning threshold
- Score below 50 for 3 consecutive days

Action:
- Slack/email notification
- Auto-draft "check-in" email to client
- Add to weekly 1:1 agenda
```

---

## 2. VARIATIONS

**Consultant version (you're the vendor):**

Track your client's signals to catch problems early. Proactive saves are the best kind—"I noticed our response times have slipped, want to schedule a sync?" beats discovering the project is dead.

**Internal team version (you're the client):**

Track your internal project health. Useful for managers who need to know which AI initiatives are at risk before the quarterly review reveals the damage.

**Agency version (multiple projects):**

Run health scores across all active projects. Weekly dashboard showing: 3 green, 2 yellow, 1 red. Focus energy where it matters.

---

## 3. REALITY CHECK

⚠️ **False positives happen.** Holiday weeks tank scores. Clients go quiet during crunch periods. Don't panic over one bad day.

⚠️ **The automation suggests, you decide.** A low score is a prompt for investigation, not proof of failure.

⚠️ **Some projects should die.** Not every project is worth saving. The value is knowing early so you can plan, not forcing resurrections.

---

## 4. THIS WEEK'S ACTION STEPS

**Today (10 mins):**
- Identify your 3 most at-risk projects (gut feel is fine)
- Note which signals you're already tracking vs. guessing

**This week (2 hours):**
- Set up basic signal tracking in your PM tool
- Create one Zap for email response time tracking
- Calculate baseline health scores for active projects

**This month (ongoing):**
- Refine weights based on your projects' actual patterns
- Build the daily alert automation
- Track saves: projects you rescued because of early warning

---

## 5. PRO SECTION: Rescue Protocol Automation

When a project hits yellow or red, what do you actually do?

Here's an automated rescue protocol:

```
YELLOW ALERT → Auto-draft check-in email:
"Hey [Client],

Quick pulse check on [Project]. I noticed we've had
a few delayed decisions. Want to jump on a 15-min
call to unblock things?

Alternatively, if priorities have shifted, let me know
and we can adjust the timeline.

[Your name]"

RED ALERT → Auto-create rescue meeting:
- Find first available 30-min slot
- Draft agenda: Project health, blockers, go/no-go
- Include decision: continue, pause, or pivot
- CC relevant stakeholders

CRITICAL (3+ days red) → Auto-escalate:
- Draft stakeholder summary
- Calculate sunk cost vs. completion cost
- Prepare pause/termination language
- Schedule internal debrief
```

The goal isn't to save every project. It's to make death a decision, not a surprise.

---

That's the system. 42% abandonment rate is an industry problem—but it doesn't have to be your problem.

Next week: Building the perfect project kickoff sequence (with n8n workflow template).

Stay automated,

Sam

P.S. — The 42% stat comes from S&P Global's Q4 2025 report. The 95% pilot failure rate? That's MIT. Both should be plastered on every AI project kickoff deck.

---

**Resources mentioned:**
- [S&P Global AI Abandonment Report](https://www.spglobal.com/ratings/en/research/articles/251118-economic-outlook-asia-pacific-q1-2026)
- [MIT/Fortune AI Pilot Failure Study](https://fortune.com/2025/10/05/most-enterprise-ai-pilots-fail-move-to-production/)
