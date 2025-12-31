# Newsletter Embed Snippets

Ready-to-use signup forms for embedding in all 8 products.

**Backend:** Supabase (mindtempo project)
**Domain:** aiprodweekly.com

---

## 1. Basic HTML Form (Universal)

Works anywhere. Requires the JavaScript snippet below.

```html
<form class="newsletter-form" onsubmit="return handleNewsletterSignup(event, this)">
  <input type="email" name="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe Free</button>
  <p class="newsletter-note">Weekly AI productivity tips. Unsubscribe anytime.</p>
</form>

<script>
const SUPABASE_URL = 'https://xitfncljhfdqvnzakbwl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdGZuY2xqaGZkcXZuemFrYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM0ODYsImV4cCI6MjA4MDAzOTQ4Nn0.-p64B2Qjn_vOzy-QKIGoNgGFcfysm-7ozTUl_zgspcQ';

async function handleNewsletterSignup(event, form) {
  event.preventDefault();
  const email = form.querySelector('input[type="email"]').value;
  const button = form.querySelector('button');
  const source = form.dataset.source || window.location.hostname;
  
  button.disabled = true;
  button.textContent = 'Subscribing...';
  
  try {
    const response = await fetch(SUPABASE_URL + '/rest/v1/newsletter_subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email, source })
    });
    
    if (response.ok || response.status === 201) {
      form.innerHTML = '<p style="color: #16a34a;">You're in! Check your inbox Thursday.</p>';
    } else if (response.status === 409) {
      form.innerHTML = '<p style="color: #2563eb;">You're already subscribed!</p>';
    } else {
      throw new Error('Failed');
    }
  } catch (e) {
    button.disabled = false;
    button.textContent = 'Try Again';
  }
  return false;
}
</script>
```

---

## 2. React/Next.js Component

For: learningai, second-brain, ai-automation-recipes

```tsx
// components/NewsletterSignup.tsx
'use client';

import { useState } from 'react';

const SUPABASE_URL = 'https://xitfncljhfdqvnzakbwl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdGZuY2xqaGZkcXZuemFrYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM0ODYsImV4cCI6MjA4MDAzOTQ4Nn0.-p64B2Qjn_vOzy-QKIGoNgGFcfysm-7ozTUl_zgspcQ';

interface Props {
  source?: string;
}

export function NewsletterSignup({ source = 'website' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'exists' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email, source })
      });

      if (res.ok || res.status === 201) {
        setStatus('success');
      } else if (res.status === 409) {
        setStatus('exists');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-green-600 font-semibold">You're in! Check your inbox Thursday.</p>;
  }
  
  if (status === 'exists') {
    return <p className="text-blue-600">You're already subscribed!</p>;
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
      {status === 'error' && <p className="text-red-600">Something went wrong. Try again.</p>}
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

**[Subscribe to AI Prod Weekly →](https://aiprodweekly.com)**

*One email every Thursday. No spam.*

---
```

---

## 4. Tracking Sources

Add `data-source` attribute to track where subscribers come from:

```html
<form class="newsletter-form" data-source="learningai" onsubmit="return handleNewsletterSignup(event, this)">
```

Available sources:
- `aiprodweekly.com` (landing page)
- `learningai` 
- `second-brain`
- `ai-automation-recipes`
- `premium-claude-code-recipes`
- `ai-control-framework`
- `adapt-learn`
- `ender-book`

---

## Integration Checklist by Product

| Product | Location | Type | Status |
|---------|----------|------|--------|
| AI-newsletter | Landing page | HTML | [x] Done |
| learningai | Footer + Course pages | React | [ ] |
| second-brain | Settings + Footer | React | [ ] |
| ai-automation-recipes | Homepage + Blog | React | [ ] |
| premium-claude-code-recipes | README + Lemon Squeezy | Markdown | [ ] |
| ai-control-framework | README + Docs | Markdown | [ ] |
| adapt-learn | Landing page | HTML | [ ] |
| ender-ai-leadership | Book website | HTML | [ ] |

---

## Supabase Tables

### newsletter_subscribers
Subscribers are stored in: `mindtempo` project → `newsletter_subscribers` table

Columns:
- `id` (uuid)
- `email` (text, unique)
- `source` (text)
- `subscribed_at` (timestamptz)
- `confirmed_at` (timestamptz, nullable)
- `unsubscribed_at` (timestamptz, nullable)
- `tags` (text[])
- `metadata` (jsonb)

### newsletter_analytics
Tracks embed form interactions for conversion analysis.

Columns:
- `id` (uuid)
- `event` (text) - view, focus, submit, success, error, exists
- `source` (text) - which product the form is on
- `page_url` (text) - full URL where form was shown
- `referrer` (text) - where user came from
- `user_agent` (text) - browser info
- `metadata` (jsonb) - additional context
- `created_at` (timestamptz)

**Analytics Events:**
| Event | Description |
|-------|-------------|
| `view` | Form rendered on page |
| `focus` | User clicked into email input |
| `submit` | Form submitted |
| `success` | Signup completed |
| `error` | Signup failed |
| `exists` | Email already subscribed |

**Example Query - Conversion Funnel:**
```sql
SELECT
  source,
  COUNT(*) FILTER (WHERE event = 'view') as views,
  COUNT(*) FILTER (WHERE event = 'focus') as engaged,
  COUNT(*) FILTER (WHERE event = 'submit') as attempts,
  COUNT(*) FILTER (WHERE event = 'success') as signups,
  ROUND(100.0 * COUNT(*) FILTER (WHERE event = 'success') /
        NULLIF(COUNT(*) FILTER (WHERE event = 'view'), 0), 2) as conversion_rate
FROM newsletter_analytics
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY source
ORDER BY signups DESC;
```
