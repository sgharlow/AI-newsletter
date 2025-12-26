# Newsletter Embed Snippets

Ready-to-use signup forms for embedding in all 8 products.

**Buttondown Username:** `aiprodweekly` (update when account created)

---

## 1. Basic HTML Form (Universal)

Works anywhere. Minimal styling—inherits from parent site.

```html
<form
  action="https://buttondown.email/api/emails/embed-subscribe/aiprodweekly"
  method="post"
  target="popupwindow"
  class="newsletter-form"
>
  <input type="email" name="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe Free</button>
  <p class="newsletter-note">Weekly AI productivity tips. Unsubscribe anytime.</p>
</form>
```

---

## 2. React Component (Next.js Projects)

For: learningai, second-brain, ai-automation-recipes

```tsx
// components/NewsletterSignup.tsx
'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://buttondown.email/api/emails/embed-subscribe/aiprodweekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter-success">
        <p>Check your email to confirm your subscription.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        disabled={status === 'loading'}
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
      </button>
      {status === 'error' && (
        <p className="newsletter-error">Something went wrong. Try again.</p>
      )}
      <p className="newsletter-note">Weekly AI productivity tips. Unsubscribe anytime.</p>
    </form>
  );
}
```

---

## 3. Inline CTA Block (Markdown/MDX)

For: premium-claude-code-recipes, ai-control-framework READMEs

```markdown
---

## Stay Updated

Get weekly AI productivity tips, automations, and insights.

**[Subscribe to AI Productivity Weekly →](https://aiprodweekly.com)**

*One email every Thursday. No spam.*

---
```

---

## 4. Footer Widget (All Products)

Compact version for site footers:

```html
<div class="footer-newsletter">
  <p><strong>AI Productivity Weekly</strong></p>
  <p>Weekly tips for working smarter with AI.</p>
  <form action="https://buttondown.email/api/emails/embed-subscribe/aiprodweekly" method="post">
    <input type="email" name="email" placeholder="Email" required>
    <button type="submit">→</button>
  </form>
</div>
```

CSS:
```css
.footer-newsletter {
  max-width: 300px;
}
.footer-newsletter form {
  display: flex;
  gap: 8px;
}
.footer-newsletter input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.footer-newsletter button {
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

---

## 5. Exit Intent Popup (Optional)

For high-traffic pages. Use with libraries like `react-exit-intent` or vanilla JS:

```html
<div id="exit-popup" class="popup hidden">
  <div class="popup-content">
    <button class="popup-close">&times;</button>
    <h3>Before you go...</h3>
    <p>Get weekly AI automation tips for free.</p>
    <form action="https://buttondown.email/api/emails/embed-subscribe/aiprodweekly" method="post">
      <input type="email" name="email" placeholder="you@example.com" required>
      <button type="submit">Subscribe Free</button>
    </form>
  </div>
</div>
```

---

## Integration Checklist by Product

| Product | Location | Type | Status |
|---------|----------|------|--------|
| learningai | Footer + Course pages | React | [ ] |
| second-brain | Settings + Footer | React | [ ] |
| ai-automation-recipes | Homepage + Blog | React | [ ] |
| premium-claude-code-recipes | README + Lemon Squeezy | Markdown | [ ] |
| ai-control-framework | README + Docs | Markdown | [ ] |
| adapt-learn | Landing page | HTML | [ ] |
| ender-ai-leadership | Book website | HTML | [ ] |
| AI-newsletter | Landing page | HTML | [x] Done |

---

## Tracking Sources

Add `?source=` parameter to track where subscribers come from:

```html
<input type="hidden" name="tag" value="learningai">
```

Or append to the form action:
```
action="https://buttondown.email/api/emails/embed-subscribe/aiprodweekly?tag=learningai"
```

---

## Testing Checklist

Before going live:
- [ ] Create Buttondown account with username `aiprodweekly`
- [ ] Verify form submission works (test with your email)
- [ ] Check confirmation email is sent
- [ ] Test on mobile devices
- [ ] Verify analytics/tracking works
