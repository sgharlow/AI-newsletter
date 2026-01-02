# AI Prod Weekly — Issue #18

**Subject Line:** Stop typing. Start talking. Voice-first workflows for consultants.

---

Hey,

I typed 847,000 words last year.

Meeting notes. Client updates. Documentation. Proposals.

This year I've typed maybe 200,000.

The difference? I stopped typing and started talking.

Voice-first workflows cut my documentation time by 70%. And the quality actually improved.

This week: how to replace your keyboard with your voice.

---

## 1. THE VOICE-FIRST STACK

**The old way:**
1. Attend meeting
2. Try to remember what happened
3. Type notes (30 min)
4. Edit for clarity (15 min)
5. Send to client (5 min)

**The voice-first way:**
1. Record meeting (automatic)
2. AI transcribes and summarizes (2 min)
3. Review and approve (5 min)
4. Auto-send to client (0 min)

Same output. 10% of the time.

**The stack I use:**

| Tool | Purpose | Cost |
|------|---------|------|
| Otter.ai or Fireflies | Meeting transcription | $15/mo |
| Claude API | Summary and action items | ~$0.10/meeting |
| n8n/Zapier | Automation glue | $20/mo |
| Your email | Delivery | Free |

Total: ~$35/month for unlimited meeting documentation.

---

## 2. BEYOND MEETINGS: VOICE FOR EVERYTHING

**The big unlock:** Treat voice as your primary input device.

**Morning brain dump:**
Record 5 minutes of stream-of-consciousness.
AI extracts: priorities, concerns, ideas, action items.
Output: Structured daily plan.

**Walking meetings with yourself:**
Take a walk. Talk through the problem.
AI captures the reasoning.
Output: Decision document with rationale.

**Client debrief:**
After a call, record your thoughts for 3 minutes.
AI structures: key takeaways, red flags, next steps.
Output: Internal notes you can reference later.

**Proposal dictation:**
Speak the proposal structure out loud.
AI formats and polishes.
You edit, not create from scratch.
Output: 80% done in 15 minutes instead of 2 hours.

---

## 3. THE VOICE-TO-CLAUDE WORKFLOW

Here's my actual setup:

**Step 1: Capture**
I use a voice memo app (iOS Voice Memos or Android's recorder).
Record anytime: in the car, on walks, between meetings.

**Step 2: Transcribe**
Upload to Whisper (free) or use a transcription service.
OpenAI's Whisper API: $0.006 per minute.
A 10-minute recording costs $0.06.

**Step 3: Transform**
Feed the transcript to Claude with a prompt:

```
You are my documentation assistant.

Convert this voice recording into:
1. Executive summary (3 sentences max)
2. Key decisions made
3. Action items with owners
4. Questions to follow up on
5. Any concerns or risks mentioned

Voice transcript:
[paste here]

Format as a professional meeting summary.
```

**Step 4: Deliver**
Automate with n8n:
- Watch for new transcripts in a folder
- Send to Claude API
- Format as email
- Send to specified recipients

Total hands-on time: 5 minutes for a 60-minute meeting.

---

## 4. QUALITY ACTUALLY IMPROVES

Counter-intuitive finding: Voice-first produces *better* documentation.

**Why:**

**1. You capture everything.**
When you type, you filter and forget.
When you record, you capture everything.
The AI filters, but nothing is lost.

**2. You're more natural.**
Typed notes are stilted.
Spoken thoughts flow.
AI polishes the flow, preserving your voice.

**3. You add context.**
Typing: "Discussed budget concerns."
Speaking: "John seemed really worried about the budget. His voice changed when we talked about Q3 projections. I think there's something he's not saying."

That context matters. Typing loses it.

---

## 5. COMMON OBJECTIONS (AND ANSWERS)

**"I can't record client meetings."**
You don't have to. Record your *debrief* after the meeting.
5 minutes of your recap captures the important parts.

**"The transcription is too messy."**
That's Claude's job. You speak naturally.
AI handles ums, ahs, tangents, and repetition.

**"I need structured formats."**
Define the format in your prompt.
AI will force any voice rambling into your template.

**"It feels weird to talk to myself."**
It did for me too. For about a week.
Now it feels weird to type.

---

## 6. ADVANCED: VOICE COMMANDS FOR CLAUDE

My power move: voice-activated Claude sessions.

**Setup:**
1. Dictation app with custom commands
2. Command triggers a script
3. Script sends to Claude API
4. Response is read back or displayed

**Example commands:**

"Claude, summarize my last three meetings."
→ Pulls transcripts, summarizes themes

"Claude, draft a follow-up email to Sarah."
→ Uses context from recent interactions

"Claude, what did we decide about the pricing model?"
→ Searches past meeting notes

Voice in, answer out. No typing required.

---

## THIS WEEK'S ACTION

Start simple:

1. **After your next meeting**, record a 3-minute voice memo summarizing what happened.

2. **Transcribe it** using Whisper or any transcription tool.

3. **Feed it to Claude** with the prompt from Section 3.

4. **Compare** to your usual meeting notes.

You'll get better notes in less time. Guaranteed.

---

## ONE AUTOMATION TO STEAL

**The Post-Meeting Auto-Summary:**

**Trigger:** New audio file in "Meetings" folder

**Step 1:** Transcribe via Whisper API

**Step 2:** Claude prompt:
```
Convert this meeting transcript into a professional summary.
Include: attendees, decisions, action items, next steps.
Format for client distribution.
```

**Step 3:** Email the summary
- To: Meeting attendees
- Subject: "[Meeting Name] - Summary and Action Items"
- CC: Your project folder

**Result:** Every meeting automatically summarized and distributed.

Setup time: 30 minutes.
Time saved per meeting: 30 minutes.
Payback: One meeting.

---

## WHAT'S NEXT

Next week: "The AI-Augmented Proposal" — How I write $50K+ proposals in under 2 hours using a structured AI workflow.

Until then, try talking more and typing less.

Cheers,
AI Prod Weekly

---

P.S. The irony: I dictated this entire newsletter in 12 minutes. Claude helped me format it. The whole process took 25 minutes instead of my usual 90.

P.P.S. Forward this to a consultant who types too much.
