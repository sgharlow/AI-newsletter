# AI Prod Weekly — Issue #16

**Subject Line:** MCP is the USB-C of AI tools—here's how consultants are using it

---

Hey,

Remember when every device had its own charger? Phones, laptops, cameras—all incompatible.

Then USB-C arrived. One cable for everything.

**MCP (Model Context Protocol) is doing the same thing for AI tools.**

Instead of building custom integrations for every AI assistant + tool combination, MCP gives us one standard that works everywhere.

This week: how to set up MCP and 5 real consultant workflows that use it.

---

## 1. WHAT MCP ACTUALLY IS

**The simple explanation:**

MCP is how AI assistants (like Claude) connect to your tools—CRMs, databases, file systems, APIs—without custom code.

Before MCP:
```
Claude → Custom code → Salesforce
Claude → Different code → Notion
Claude → Yet more code → Postgres
```

After MCP:
```
Claude → MCP → Any tool with an MCP server
```

**The 3 things MCP exposes:**

| Concept | What It Is | Example |
|---------|-----------|---------|
| **Tools** | Actions the AI can take | "Create CRM contact", "Send email" |
| **Resources** | Data the AI can access | Database records, file contents |
| **Prompts** | Pre-built task templates | "Summarize this meeting", "Draft follow-up" |

Think of an MCP server as a translator between AI and your tools.

---

## 2. SETTING UP YOUR FIRST MCP SERVER

**Option A: Claude Desktop (easiest)**

Claude Desktop has native MCP support. Here's the setup:

1. Install an MCP server (example: Supabase)
```bash
npx @supabase/mcp-server-supabase
```

2. Add to Claude Desktop config (`~/.claude/settings.json`)
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "your-project-url",
        "SUPABASE_KEY": "your-service-key"
      }
    }
  }
}
```

3. Restart Claude Desktop. Now Claude can query your database.

**Option B: n8n + MCP Bridge (for automation)**

For workflows that run without you:
```
Trigger → n8n → HTTP to MCP Server → AI processing → Action
```

This is how you build "set it and forget it" automations.

---

## 3. FIVE CONSULTANT WORKFLOWS USING MCP

### Workflow 1: The Research Assistant

**Problem:** You spend 2 hours researching before every client call.

**MCP Setup:**
- SERP MCP (web search)
- Fetch MCP (read web pages)
- File System MCP (save results)

**How it works:**
```
Input: "Research [Company] before my call tomorrow"

Agent:
1. Searches news, LinkedIn, company site
2. Fetches and reads key pages
3. Synthesizes findings
4. Saves briefing to your Documents folder

Output: 2-page briefing ready for your commute
```

**Time saved:** 90+ minutes per client

---

### Workflow 2: The CRM Whisperer

**Problem:** Your CRM data is stale because updating it is tedious.

**MCP Setup:**
- CRM MCP (HubSpot, Salesforce, or custom)
- Email MCP (Gmail/Outlook)
- Calendar MCP

**How it works:**
```
Daily trigger at 6pm:

Agent:
1. Scans today's calendar for client meetings
2. Reads meeting notes (if transcribed)
3. Updates CRM with:
   - Last contact date
   - Meeting summary
   - Next action items
4. Creates follow-up tasks if needed

Output: CRM always current, no manual entry
```

**Time saved:** 30 minutes per day

---

### Workflow 3: The Proposal Pipeline

**Problem:** Writing proposals takes 4 hours each.

**MCP Setup:**
- CRM MCP (prospect data)
- Research MCP (company intel)
- File System MCP (templates and output)
- Notion MCP (past proposals for reference)

**How it works:**
```
Input: "Create proposal for [Prospect] based on our call"

Agent:
1. Pulls prospect data from CRM
2. Researches company context
3. Finds similar past proposals
4. Generates customized proposal draft
5. Saves to your Proposals folder

Output: 80% complete proposal in 10 minutes
```

**Time saved:** 3+ hours per proposal

---

### Workflow 4: The Invoice Tracker

**Problem:** Following up on unpaid invoices is awkward and easy to forget.

**MCP Setup:**
- Accounting MCP (QuickBooks, Xero, FreshBooks)
- Email MCP
- Slack MCP (optional, for your own alerts)

**How it works:**
```
Weekly trigger (Monday 9am):

Agent:
1. Pulls overdue invoices from accounting system
2. Checks days overdue
3. For each invoice:
   - 1-7 days: Gentle reminder email
   - 8-14 days: Firmer follow-up
   - 15+ days: Alert you via Slack for manual handling
4. Logs all communications

Output: Invoices get chased without you feeling awkward
```

**Time saved:** 2+ hours per month + faster collections

---

### Workflow 5: The Meeting Prep Machine

**Problem:** You show up to meetings underprepared.

**MCP Setup:**
- Calendar MCP
- CRM MCP
- File System MCP
- Email MCP

**How it works:**
```
Trigger: 30 minutes before any meeting

Agent:
1. Reads meeting details from calendar
2. Looks up attendees in CRM
3. Finds last interaction history
4. Scans recent emails with attendees
5. Generates 1-page briefing:
   - Who you're meeting
   - What you discussed last time
   - Open items/action items
   - Suggested talking points

Output: Briefing delivered to inbox 30 min before every meeting
```

**Time saved:** Never underprepared again

---

## 4. THE GOTCHAS

**Security first:**

MCP gives AI agents real power. Be smart:

- **Least privilege**: Only expose the tools the agent needs
- **Rate limits**: Cap how many actions can happen (prevents runaway costs)
- **Audit logging**: Track what agents do (you'll want this when something goes wrong)
- **Human checkpoints**: For anything sensitive, require approval

**Start small:**

Don't build all 5 workflows at once. Pick one:
1. Set up one MCP server
2. Test it manually with Claude
3. Add automation triggers once it works
4. Expand from there

**Maintenance matters:**

MCP servers need updates. API keys expire. Put "check MCP setup" on your monthly calendar.

---

## 5. THIS WEEK'S ACTION STEPS

**Today (15 min):**
- Pick ONE workflow from the 5 above
- Identify what MCP servers you'd need

**This week (1-2 hours):**
- Install your first MCP server (file system is easiest)
- Test it with Claude Desktop
- Make it do something useful

**This month (ongoing):**
- Add automation triggers (n8n or similar)
- Build the second workflow
- Document what works for future reference

---

## 6. PRO SECTION: Building Your Own MCP Server

For consultants with unique needs, here's a basic custom MCP server:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server";

const server = new Server({
  name: "my-consultant-tools",
  version: "1.0.0"
});

// Define a tool
server.tool("get_client_status", {
  description: "Get current project status for a client",
  parameters: {
    client_id: { type: "string", description: "Client identifier" }
  },
  handler: async ({ client_id }) => {
    // Your logic here — query your systems
    const status = await fetchFromYourSystems(client_id);
    return { status };
  }
});

server.start();
```

This is how you build integrations for:
- Your custom CRM
- Industry-specific databases
- Proprietary client systems

The SDK is open source: `@modelcontextprotocol/sdk`

---

## 7. RESOURCES

**Official:**
- [MCP Protocol Docs](https://modelcontextprotocol.io/)
- [Anthropic MCP Servers (GitHub)](https://github.com/anthropics)

**Pre-built servers:**
- Supabase, Postgres, SQLite (databases)
- Filesystem, Fetch, Puppeteer (file/web access)
- Slack, Notion, GitHub (productivity tools)

**For builders:**
- MCP SDK (TypeScript, Python)
- Claude Desktop as your testing environment

---

MCP is early but real. The consultants who learn it now will have an unfair advantage when everyone else catches up.

Next week: How to build a "digital twin" of your consulting practice that can answer client questions 24/7.

Stay automated,

Sam

P.S. — The 5 workflows above are templates, not prescriptions. Adapt them to your tools. The pattern is what matters: trigger → research → synthesize → act.

---

**Resources mentioned:**
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Anthropic MCP Announcement](https://www.anthropic.com/news/model-context-protocol)
- [MCP Server Examples](https://github.com/anthropics)
