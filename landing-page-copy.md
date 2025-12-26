# AI Productivity Weekly — Landing Page Copy

**Domain:** aiprodweekly.com
**Purpose:** Email capture for newsletter subscribers
**Style:** Clean, minimal, professional — no hype

---

## Hero Section

### Headline (H1)
```
Work smarter with AI.
Every Thursday.
```

### Subheadline
```
One automation you can implement. One insight worth knowing.
No fluff. Just practical AI productivity for consultants and knowledge workers.
```

### Email Signup
```
[Email input field: "you@example.com"]
[Button: "Subscribe Free"]
```

### Trust line
```
Join 500+ consultants and knowledge workers. Unsubscribe anytime.
```
*(Update number as list grows)*

---

## What You'll Get Section

### Section Header
```
Every Thursday in your inbox:
```

### Three Columns

**Column 1: Automation**
```
🔧 One Automation

A specific workflow you can implement today.
n8n templates, Zapier alternatives, and
step-by-step guides.
```

**Column 2: Insight**
```
🧠 One AI Insight

A concept that changes how you think
about AI at work. No theory—just
practical mental models.
```

**Column 3: Tool**
```
🛠️ One Tool or Resource

Apps, prompts, and resources worth
your time. Tested and vetted.
```

---

## Social Proof Section (Optional — Add After Launch)

### Testimonial Format
```
"Finally, an AI newsletter that respects my time.
Every issue has something I can actually use."

— [Name], [Role] at [Company]
```

### Logos Row (Future)
```
Featured in: [Logo] [Logo] [Logo]
```

---

## Sample Issue Preview

### Section Header
```
Here's what a typical issue looks like:
```

### Preview Box
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI PRODUCTIVITY WEEKLY — Issue #7

🔧 THIS WEEK'S AUTOMATION: Invoice Follow-Up Sequence

The problem: Chasing unpaid invoices is awkward.
The solution: A 3-email sequence that runs automatically
when invoices hit 7, 14, and 30 days overdue.

Time to implement: 45 minutes
Time saved: 1-2 hours/month (plus faster payments)

→ Get the full template...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## About Section

### Section Header
```
Who writes this?
```

### Bio
```
I'm Steve, and I've spent the last year building AI productivity
tools for consultants and knowledge workers.

I got tired of AI newsletters that were either:
• Too hyped ("AGI is coming!")
• Too vague ("AI will transform everything!")
• Too long (3,000 words of nothing)

So I made one that's actually useful.

Every issue is something I'd want to receive.
```

---

## FAQ Section (Optional)

### Q: How often will I hear from you?
```
Once a week, every Thursday. That's it.
No "special offers" or surprise emails.
```

### Q: Is this really free?
```
Yes. I'll occasionally mention tools I've built,
but the newsletter itself is free forever.
```

### Q: Can I unsubscribe?
```
Anytime, one click. No guilt trips.
```

---

## Footer CTA (Repeat Signup)

```
Ready to work smarter?

[Email input field: "you@example.com"]
[Button: "Subscribe Free"]

No spam. Unsubscribe anytime.
```

---

## Footer

```
AI Productivity Weekly
A weekly newsletter for consultants and knowledge workers.

[Privacy Policy] [Unsubscribe]

© 2025
```

---

# Technical Implementation Notes

## Recommended Stack

| Component | Tool | Why |
|-----------|------|-----|
| Hosting | Vercel or Cloudflare Pages | Free, fast, simple |
| Email | Buttondown | Already integrated, clean |
| Framework | Single HTML or Next.js | Keep it simple |
| Analytics | Plausible or none | Privacy-friendly |

## Form Integration

Buttondown embed code:
```html
<form
  action="https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME"
  method="post"
  target="popupwindow"
  class="embeddable-buttondown-form"
>
  <input type="email" name="email" placeholder="you@example.com" required />
  <button type="submit">Subscribe Free</button>
</form>
```

## Page Structure (HTML Outline)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>AI Productivity Weekly — Work smarter with AI</title>
  <meta name="description" content="Weekly AI automation tips, insights, and tools for consultants and knowledge workers. One email, every Thursday.">
</head>
<body>
  <header>
    <!-- Logo + Nav (minimal) -->
  </header>

  <main>
    <section id="hero">
      <!-- Headline + Signup -->
    </section>

    <section id="what-you-get">
      <!-- Three columns -->
    </section>

    <section id="sample">
      <!-- Issue preview -->
    </section>

    <section id="about">
      <!-- Bio -->
    </section>

    <section id="cta">
      <!-- Repeat signup -->
    </section>
  </main>

  <footer>
    <!-- Links + Copyright -->
  </footer>
</body>
</html>
```

---

# SEO Metadata

```html
<title>AI Productivity Weekly — Work smarter with AI</title>
<meta name="description" content="Weekly AI automation tips, insights, and tools for consultants and knowledge workers. One email, every Thursday. Free.">
<meta name="keywords" content="AI newsletter, productivity, automation, consultants, n8n, AI tools">

<!-- Open Graph -->
<meta property="og:title" content="AI Productivity Weekly">
<meta property="og:description" content="One automation. One insight. Every Thursday.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://aiprodweekly.com">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AI Productivity Weekly">
<meta name="twitter:description" content="Weekly AI automation tips for consultants. No fluff.">
```

---

# Alternative Headlines to Test

## Option A (Current)
```
Work smarter with AI.
Every Thursday.
```

## Option B (Problem-focused)
```
Stop drowning in admin work.
Start automating with AI.
```

## Option C (Outcome-focused)
```
Get 10 hours back every week.
AI automation for consultants.
```

## Option D (Curiosity)
```
The AI newsletter that
respects your time.
```

## Option E (Direct)
```
AI Productivity Weekly
One automation. One insight. Every Thursday.
```

---

*Copy ready for implementation. Adjust tone/details as needed.*
