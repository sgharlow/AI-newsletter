# AI Prod Weekly — Issue #17

**Subject Line:** Your consulting practice doesn't need you 24/7—build a digital twin instead

---

Hey,

I've been getting the same questions from clients for 15 years.

"What's the status of my project?"
"Can you explain that framework again?"
"How should I approach this problem?"

Good questions. But they don't require *me* to answer them.

Last month I built a digital twin of my practice—an AI assistant trained on my methods, frameworks, and past work. It handles 80% of routine questions while I sleep.

This week: how to build your own.

---

## 1. WHAT A DIGITAL TWIN ACTUALLY IS

**Not a chatbot.** Chatbots are dumb. They follow scripts.

**A digital twin is:**
- Trained on YOUR frameworks and methodologies
- Aware of YOUR client context and project history
- Able to reason through problems the way YOU would
- Honest about when it needs to escalate to you

**The result:**
```
Client (11pm): "How should we prioritize these features?"

Your Twin:
1. Applies your prioritization framework
2. References past conversations
3. Gives actionable recommendation
4. Flags anything uncertain for your review

You (9am): Review the transcript, approve or adjust
```

Clients get faster responses. You get your evenings back.

---

## 2. THE THREE COMPONENTS

### Component 1: Your Knowledge Base

Everything that makes your practice *yours*:

| Content Type | Example | Purpose |
|-------------|---------|---------|
| **Frameworks** | Your pricing model, project phases, decision matrices | How you think |
| **Deliverables** | Past proposals, templates, reports | Your style |
| **FAQs** | Common client questions + your answers | Your voice |
| **Policies** | Boundaries, escalation criteria, out-of-scope topics | Your limits |

**Start simple:** 20 documents is enough. You can add more later.

### Component 2: The Context Layer

Your twin needs to know WHO it's talking to:

```
For each client, capture:
- Company name and industry
- Current project/engagement
- Key stakeholders
- Project status and recent updates
- Past interactions summary
```

This turns generic answers into personalized ones.

### Component 3: The Guardrails

What your twin should NEVER do:
- Promise new scope
- Discuss other clients
- Make up technical details
- Give legal/financial/medical advice
- Pretend to be you without disclosure

**Disclosure example:**
```
"I'm [Your Name]'s AI assistant. I can help with questions
about your project and our frameworks. For anything complex,
I'll flag it for [Your Name] to review personally."
```

Transparency builds trust.

---

## 3. BUILDING IT (TECHNICAL SETUP)

### Option A: Claude Projects (Simplest)

Best for: Solo consultants who want this working TODAY

```
1. Create a Claude Project
2. Upload your knowledge base (PDFs, docs, frameworks)
3. Write a system prompt defining your twin's behavior
4. Share project link with select clients
```

**System prompt template:**
```
You are an AI assistant for [Your Name]'s consulting practice.

ROLE:
- Help clients understand our frameworks and methodologies
- Answer questions about active projects (context provided below)
- Direct complex or sensitive questions to [Your Name]

KNOWLEDGE:
- You have access to [Your Name]'s frameworks and past work
- You can reference these to answer questions
- Be specific about which framework you're applying

BOUNDARIES:
- Never promise new scope or make commitments
- Never discuss other clients
- Always disclose you're an AI assistant
- Flag anything you're uncertain about

TONE:
- [Describe your communication style]
- Use practical examples over abstract theory
- Be direct but not abrupt
```

### Option B: Custom RAG Setup (More Control)

Best for: Tech-comfortable consultants with multiple clients

```
Stack:
- Vector database (Pinecone, Supabase, Weaviate)
- Embedding model (OpenAI, Voyage)
- Chat interface (custom or existing)
- MCP for live data access

Flow:
Client question →
  Retrieve relevant docs →
  Inject client context →
  Generate response →
  Log for your review
```

**Benefits over Option A:**
- Automatic client context injection
- Better separation between clients
- Full audit trail
- Integration with your other tools

### Option C: n8n + Claude (Best of Both)

Best for: Automation-focused consultants

```
Trigger: Client emails you
Flow:
  1. Classify: Is this a twin-appropriate question?
  2. If yes: Inject context + query Claude
  3. Draft response in your inbox (not auto-sent)
  4. You review and click Send
  5. If no: Notify you to handle personally
```

This keeps humans in the loop while doing 90% of the work.

---

## 4. REAL EXAMPLES

### Example 1: Framework Explainer

**Client:** "Can you remind me how the prioritization quadrant works?"

**Your Twin:**
```
Happy to explain! [Your Name]'s prioritization quadrant maps
features on two axes:

**Y-axis: Business Impact**
- High: Revenue-generating or risk-reducing
- Low: Nice-to-have or internal optimization

**X-axis: Effort**
- Low: Less than a week of work
- High: More than a sprint

**Quadrants:**
1. High Impact + Low Effort = Do First
2. High Impact + High Effort = Plan Carefully
3. Low Impact + Low Effort = Quick Wins (do if capacity)
4. Low Impact + High Effort = Don't Do

Based on your current list, I'd classify them as:
[AI applies framework to their actual features]

Want me to walk through the reasoning for any specific item?
```

### Example 2: Status Update

**Client:** "What's happening with the API integration?"

**Your Twin:**
```
Here's the current status as of [date]:

**API Integration - Phase 2**
- Auth flow: Complete
- Data sync: In testing (80% done)
- Error handling: Pending

**Recent Updates:**
- [Dev] fixed the rate limiting issue on Dec 28
- [You] approved the retry logic design last call

**Next Steps:**
- Testing completes end of this week
- Review meeting scheduled for [date]

Is there a specific aspect you want me to dig into?
```

### Example 3: Escalation

**Client:** "We're thinking of changing the project scope significantly."

**Your Twin:**
```
Thanks for bringing this up. Scope changes are something
[Your Name] handles personally since they affect timeline
and budget.

I've flagged this for [their] attention and [they'll] reach
out to schedule a call—likely within 24 hours.

In the meantime, would it help if I pulled together a summary
of the current scope for reference? That might make the
conversation more productive.
```

---

## 5. THE GOTCHAS

### Data Hygiene

Your twin is only as good as what you feed it.

**Bad input:**
```
"Our process involves several steps that vary by context..."
```

**Good input:**
```
"Step 1: Discovery call (60 min)
 Step 2: Written proposal (delivered within 48hrs)
 Step 3: Contract and deposit
 Step 4: Kickoff meeting
 Step 5: [etc]"
```

Specific > vague. Your twin can't mind-read.

### Client Acceptance

Some clients love it. Some don't.

**Position it as:**
- "24/7 access to our team's knowledge"
- "Faster answers on routine questions"
- "No waiting for business hours"

**Not:**
- "Replacement for working with me"
- "Cheaper option"

### Hallucination Risk

Even good AI can make things up. Mitigations:

1. **Source grounding**: "Based on [document], the answer is..."
2. **Uncertainty disclosure**: "I'm not 100% sure, let me flag this"
3. **Regular audits**: Read twin transcripts weekly
4. **Feedback loop**: Clients can rate answers

---

## 6. THIS WEEK'S ACTION STEPS

**Today (30 min):**
- List 10 questions clients ask repeatedly
- Write your ideal answers to each
- This becomes your starter knowledge base

**This week (2 hours):**
- Set up a Claude Project with those 10 Q&As
- Write your system prompt
- Test with a trusted colleague

**This month:**
- Pilot with ONE client who would appreciate it
- Gather feedback and iterate
- Decide whether to expand

---

## 7. PRO SECTION: Advanced Configuration

**Dynamic context injection:**

```typescript
// Fetch client context before each query
async function getClientContext(clientId: string) {
  const client = await db.clients.get(clientId);
  const recentInteractions = await db.interactions
    .where('client_id', clientId)
    .orderBy('date', 'desc')
    .limit(5);
  const activeProjects = await db.projects
    .where('client_id', clientId)
    .where('status', 'active');

  return `
    CLIENT: ${client.name} (${client.industry})
    CONTACT: ${client.primaryContact}
    ACTIVE PROJECTS: ${activeProjects.map(p => p.name).join(', ')}
    RECENT CONTEXT: ${summarize(recentInteractions)}
  `;
}
```

**Escalation routing:**

```typescript
// After each response, check if escalation needed
const escalationTriggers = [
  /scope change/i,
  /budget/i,
  /contract/i,
  /cancel/i,
  /competitor/i,
  /unhappy|frustrated|disappointed/i,
];

function shouldEscalate(message: string, response: string): boolean {
  return escalationTriggers.some(trigger =>
    trigger.test(message) || trigger.test(response)
  );
}
```

---

The goal isn't to replace yourself. It's to handle the 80% that doesn't need you, so you can focus on the 20% that does.

Next week: Automated client health scoring—spot churn risk before they tell you.

Stay automated,

Sam

P.S. — My twin handles about 15 client questions per week now. That's 5+ hours I've reclaimed. Start with 10 FAQs. See what happens.

---

**Resources mentioned:**
- [Claude Projects](https://claude.ai/projects)
- [RAG Pattern Explained](https://www.anthropic.com/research/retrieval-augmented-generation)
- [MCP for Real-time Data](https://modelcontextprotocol.io/)
