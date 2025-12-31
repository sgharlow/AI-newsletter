# AI Prod Weekly — Issue #8

**Subject Line:** Turn one piece of content into ten (without extra work)

---

Hey,

You spent 4 hours writing that blog post. It's good. Maybe even great.

Then you posted it, shared it once on LinkedIn, and... moved on.

That post could have become:
- A Twitter/X thread
- 3 LinkedIn posts
- An email newsletter
- A YouTube script
- 5 short-form video clips
- A podcast talking point
- An infographic

But who has time to create all that?

You do. Because AI can do the transformation while you focus on the next idea.

---

## 1. AUTOMATION OF THE WEEK: The Content Repurposing Pipeline

**The problem:** Creating original content is hard. But most content only gets used once. You're leaving value on the table every time you write something good and don't repurpose it.

**The solution:** A system that automatically transforms one piece of content into multiple formats, each optimized for its platform.

**The pipeline:**

```
Original content (blog/article)
         |
    AI Transformation
         |
   +-----+-----+-----+-----+
   |     |     |     |     |
Thread  Posts Email Script Clips
(X)    (LI)  (NL)  (YT)  (TT/IG)
```

**How to build it:**

**Step 1: Create your source content**

Start with long-form content—a blog post, article, or detailed guide. This is your "content anchor." Everything else derives from it.

Ideal length: 1,000-2,000 words with clear sections.

**Step 2: Set up the transformation prompts**

Create a prompt template for each output format:

**Twitter/X Thread Prompt:**
```
Transform this article into a Twitter thread (8-12 tweets).

Rules:
- First tweet should hook the reader
- Each tweet should stand alone but flow together
- Include specific numbers or examples
- End with a call to action
- No hashtags in the thread itself

Article:
{{content}}
```

**LinkedIn Post Prompt:**
```
Transform this article into 3 separate LinkedIn posts.

Rules:
- Each post should focus on one key insight
- Use line breaks for readability
- Start with a hook (question, bold statement, or story)
- End with a question to drive comments
- 150-300 words each

Article:
{{content}}
```

**Email Newsletter Prompt:**
```
Transform this article into a newsletter email.

Rules:
- Casual, conversational tone
- Start with a relatable scenario
- Include 2-3 actionable takeaways
- Add a personal note or story
- Keep under 500 words
- End with a soft call to action

Article:
{{content}}
```

**YouTube Script Prompt:**
```
Transform this article into a YouTube video script (5-7 minutes).

Rules:
- Start with a hook (first 15 seconds critical)
- Use conversational language
- Include visual cues [B-ROLL: description]
- Add timestamps for sections
- End with clear CTA (subscribe, comment, etc.)

Article:
{{content}}
```

**Short-Form Video Clips Prompt:**
```
Extract 5 short-form video ideas from this article.

For each idea provide:
- Hook (first 3 seconds)
- Main point (30-45 seconds)
- Call to action (5 seconds)
- Total length: 45-60 seconds each

Article:
{{content}}
```

**Step 3: Automate the workflow**

Option A: **Manual batch (simplest)**
- Paste article into ChatGPT/Claude
- Run each prompt
- Copy outputs to respective platforms

Option B: **Zapier/Make automation**
- Trigger: New blog post published (RSS or webhook)
- Action: Send to AI (OpenAI/Anthropic)
- Action: Save outputs to Notion/Airtable
- Action: Schedule to social media tools

Option C: **Custom script**
```javascript
// Pseudocode for automation
const prompts = {
  twitter: "Transform into thread...",
  linkedin: "Transform into 3 posts...",
  email: "Transform into newsletter...",
  youtube: "Transform into script...",
  shorts: "Extract 5 short-form ideas..."
};

for (const [platform, prompt] of Object.entries(prompts)) {
  const result = await ai.complete(prompt + article);
  await saveToNotion(platform, result);
}
```

**Step 4: Review and schedule**

AI output isn't publish-ready. Budget 5-10 minutes per piece to:
- Fix awkward phrasing
- Add your voice/personality
- Check facts and links
- Schedule across the week

**Time to implement:** 60 minutes (setup)
**Time per article after setup:** 30 minutes (vs. 4+ hours manually)

---

## 2. AI INSIGHT: The 1:10 Content Rule

Great creators don't create more. They distribute more.

The math:
- 1 blog post/week = 52 pieces/year
- 1 blog post → 10 pieces = 520 pieces/year

Same creative effort. 10x the output.

But here's what most people miss: **each platform has different peak times and audiences.** Your LinkedIn followers aren't your Twitter followers. Your email subscribers aren't your YouTube viewers.

Repurposing isn't lazy. It's strategic. You're meeting people where they are.

---

## 3. TOOL OF THE WEEK: Castmagic

**What it does:** Records audio/video and automatically generates transcripts, show notes, social posts, and email content.

**Why it works for repurposing:**
- Upload one podcast episode or video
- Get 10+ content pieces automatically
- Outputs include timestamps, quotes, and summaries
- Works with any audio/video file

**Best for:** Podcasters, YouTubers, course creators

**Alternatives:**
- Descript — great for video editing + transcription
- Opus Clip — AI-powered short-form clip extraction
- Repurpose.io — cross-platform automation
- Typeshare — writing-focused, thread templates

---

## 4. QUICK WIN (Under 2 Minutes)

**Save your last blog post as a repurposing source.**

Right now:
1. Find your most recent blog post or article
2. Copy the full text
3. Save it in a "Content to Repurpose" folder

This week, run it through one transformation prompt. Just one. See how it feels.

---

## 5. WHAT'S NEXT

Next week: **The Meeting-Free Day System** — because your calendar shouldn't control your life. We'll automate the boundaries that protect your deep work time.

---

See you Thursday,
Steve

P.S. What's your current content repurposing process? Most people say "I don't have one." Reply and tell me—I'm curious if you're the exception.

---

*You're receiving this because you signed up at aiprodweekly.com. [Unsubscribe here](#)*
