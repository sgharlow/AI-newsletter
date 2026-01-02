# Issue #22: AI-Powered Knowledge Base Curation

**Subject Line:** Your knowledge is scattered. Here's how AI fixes it.

**Preview Text:** Build a self-organizing second brain in 2 hours

---

## The Problem

Every consultant I know has the same issue:

Knowledge lives everywhere:
- Notes in 5 different apps
- Files across folders
- Emails with key insights
- Bookmarks never revisited
- Conversations forgotten

When you need something, you can't find it.

When clients ask questions, you recreate answers from scratch.

This week's automation fixes the knowledge chaos.

---

## The Solution: AI-Curated Knowledge Base

Here's what we're building:

1. **Central Capture** - Everything flows to one place
2. **Auto-Categorization** - AI tags and organizes on intake
3. **Smart Linking** - Related items connect automatically
4. **Retrieval System** - Find anything in seconds
5. **Freshness Tracking** - Flag outdated knowledge

Total setup time: 2 hours.

---

## Step 1: Choose Your Hub (10 minutes)

Pick ONE tool as your knowledge hub:

**Best Options:**
- **Notion** - Best for structure + AI integration
- **Obsidian** - Best for local-first + linking
- **Capacities** - Best for object-based thinking
- **Roam** - Best for networked thought

The tool matters less than commitment to ONE tool.

I use Notion. This guide works with any option.

---

## Step 2: Create Intake Channels (30 minutes)

Set up automatic capture from:

### Email → Knowledge Base
```
Trigger: Email tagged "save" or forwarded to specific address
Action: Create note with:
- Subject as title
- Body as content
- Sender and date as metadata
- AI-generated tags
```

### Bookmarks → Knowledge Base
```
Tool: Readwise Reader or Pocket
Trigger: Any highlight or save
Action: Sync to knowledge base with:
- Source URL
- Key highlights
- AI-generated summary
- Auto-tags based on content
```

### Voice Notes → Knowledge Base
```
Tool: Otter.ai or your phone's recorder
Trigger: Voice memo completed
Action: Transcribe and create note with:
- AI-cleaned transcript
- Extracted action items
- Topic classification
```

### Meeting Notes → Knowledge Base
```
Tool: Fireflies, Otter, or Fathom
Trigger: Meeting ends
Action: Create note with:
- Meeting summary
- Key decisions
- Action items
- Linked to project/client
```

---

## Step 3: The Auto-Categorization Prompt (20 minutes)

When new content arrives, run it through this AI classification:

```
You are a knowledge management assistant. Analyze this content and return JSON:

{
  "title": "Concise, descriptive title",
  "type": "article|note|email|meeting|idea|reference|procedure",
  "topics": ["primary topic", "secondary topic"],
  "projects": ["relevant project names"],
  "people": ["mentioned people"],
  "actionItems": ["any tasks to extract"],
  "summary": "2-3 sentence summary",
  "keyInsights": ["main takeaways"],
  "relatedConcepts": ["terms to link to other notes"],
  "freshness": "evergreen|monthly|quarterly|dated",
  "confidentiality": "public|internal|confidential"
}

Content to analyze:
[PASTE CONTENT]
```

Use this to auto-populate metadata on every new item.

---

## Step 4: Smart Linking System (30 minutes)

### Bi-Directional Links
When AI identifies `relatedConcepts`, check if those notes exist:
- If yes: Create two-way link
- If no: Create stub for future

### Automatic Clusters
Weekly, run this analysis on your knowledge base:

```
Analyze these [50] most recent notes.
Identify:
1. Emerging themes (topics appearing 3+ times)
2. Missing connections (notes that should link but don't)
3. Knowledge gaps (referenced topics with no notes)
4. Outdated content (contradictions or stale info)

Format as action items for knowledge base maintenance.
```

### Project Context Links
Every client/project gets a "context" note that links to:
- All communications
- Deliverables
- Meeting notes
- Key decisions
- Lessons learned

---

## Step 5: The Retrieval System (20 minutes)

### Quick Search Prompt
Create a saved prompt for finding anything:

```
I need to find information in my knowledge base about: [TOPIC]

Search for:
- Direct mentions of this topic
- Related concepts that might contain relevant info
- Previous client work on similar topics
- Procedures or templates that apply
- Lessons learned from similar situations

Return the most relevant 5 items with:
- Note title
- Why it's relevant
- Key excerpt
- Link to full note
```

### Question-Answering System
For complex queries:

```
Based on my knowledge base, answer this question: [QUESTION]

Requirements:
- Only use information from my documented knowledge
- Cite specific notes for each claim
- Flag if information might be outdated
- Identify gaps where I have no documented knowledge
- Suggest what I should add to my knowledge base
```

---

## Step 6: Freshness Tracking (10 minutes)

### Auto-Flag System
Set review reminders based on content type:

| Content Type | Review Frequency |
|--------------|------------------|
| Procedures/SOPs | Quarterly |
| Tool guides | Monthly |
| Client info | On engagement start |
| Industry insights | Monthly |
| Evergreen principles | Annually |

### Decay Detection
Monthly, run this audit:

```
Review my knowledge base for:
1. Notes not accessed in 6+ months - archive candidates
2. Notes with outdated dates in content
3. Links to deprecated tools or dead URLs
4. Contradicting information between notes
5. Duplicate content that should be merged

Generate maintenance task list.
```

---

## The Complete n8n Workflow

Here's a simplified version of my actual workflow:

```json
{
  "name": "Knowledge Base Curator",
  "triggers": [
    "Email received with 'save' label",
    "Readwise sync webhook",
    "Meeting transcript available",
    "Manual note submission"
  ],
  "steps": [
    {
      "name": "Content Extraction",
      "action": "Parse incoming content into standard format"
    },
    {
      "name": "AI Classification",
      "action": "Run categorization prompt",
      "model": "Claude Haiku (fast, cheap)"
    },
    {
      "name": "Create Note",
      "action": "Add to Notion with all metadata"
    },
    {
      "name": "Find Links",
      "action": "Search for related existing notes"
    },
    {
      "name": "Create Connections",
      "action": "Add bi-directional links"
    },
    {
      "name": "Notify",
      "action": "Optional: Slack/email confirmation"
    }
  ]
}
```

---

## Real Results

After implementing this system:

**Before:**
- 30+ minutes searching for past work
- Recreating proposals from scratch
- Forgetting client context between calls
- Losing insights from articles I read

**After:**
- Any information found in < 2 minutes
- Proposals built from existing blocks
- Full client context before every call
- Insights automatically connected to relevant projects

The knowledge compounds. Every piece added makes the whole more valuable.

---

## This Week's Action Items

**Hour 1:**
- [ ] Choose your knowledge hub
- [ ] Set up email-to-knowledge capture
- [ ] Create categorization prompt

**Hour 2:**
- [ ] Configure bookmark sync
- [ ] Set up meeting note automation
- [ ] Run first linking session

**Ongoing (10 min/day):**
- [ ] Review AI-categorized items
- [ ] Fix any misclassifications
- [ ] Add manual links as you notice connections

---

## Template Download

Get my complete Notion Knowledge Base template with:
- Pre-built databases
- Categorization properties
- Saved search views
- Weekly review prompts

[Download Template] → aiprodweekly.com/templates/knowledge-base

---

## Next Week Preview

**Issue #23: The Competitor Intelligence System**

Track competitor moves automatically:
- Monitor their content output
- Track pricing changes
- Analyze their positioning shifts
- Get weekly intelligence briefs

Your knowledge base will soon include external intelligence too.

---

*Thanks for reading AI Prod Weekly. Forward to a consultant who's drowning in scattered notes.*

*— The AI Prod Weekly Team*

---

**Links:**
- Knowledge Base Template: aiprodweekly.com/templates/knowledge-base
- n8n Workflow: aiprodweekly.com/workflows/knowledge-curator
- Full guide: aiprodweekly.com/guides/knowledge-management
