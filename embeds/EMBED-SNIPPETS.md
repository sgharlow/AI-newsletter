# Newsletter Embed Snippets

Ready-to-use embed codes for all 7 products in the AI productivity ecosystem.

---

## How It Works

1. Add the embed container `<div>` where you want the signup form
2. Include the script at the bottom of your page
3. Subscribers are tagged with the source product for segmentation

---

## Configuration Options

| Attribute | Description | Default |
|-----------|-------------|---------|
| `data-source` | Product identifier for segmentation | `"embed"` |
| `data-theme` | `"light"` or `"dark"` | `"light"` |
| `data-compact` | `"true"` for smaller form | `"false"` |
| `data-headline` | Custom headline text | `"Get AI productivity tips weekly"` |
| `data-button` | Custom button text | `"Subscribe Free"` |

---

## 1. LearningAI365 (learningai)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="learningai"
  data-theme="light"
  data-headline="Get weekly AI learning tips in your inbox">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** Footer of course discovery page, after course detail pages

---

## 2. Adapt-Learn (adapt-learn)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="adapt-learn"
  data-theme="dark"
  data-headline="Level up your AI learning journey weekly">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** After completing a lesson, bottom of learning path page

---

## 3. MindTempo (second-brain)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="mindtempo"
  data-theme="light"
  data-headline="Weekly AI productivity tips for knowledge workers">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** Dashboard sidebar, after task completion

---

## 4. AI Automation Recipes (ai-automation-recipes)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="ai-automation-recipes"
  data-theme="light"
  data-headline="Get a new automation recipe every week">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** Below recipe list, end of individual recipe pages

---

## 5. Premium Claude Code Recipes (premium-claude-code-recipes)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="claude-code-recipes"
  data-theme="dark"
  data-headline="Weekly Claude tips and AI coding insights">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** Recipe preview page, checkout confirmation

---

## 6. AI Control Framework (ai-control-framework)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="ai-control-framework"
  data-theme="light"
  data-compact="true"
  data-headline="Weekly AI development best practices">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** GitHub README (as image link to landing page), documentation footer

---

## 7. The Foreign Mind (ender-ai-leadership)

```html
<!-- AI Prod Weekly Newsletter Signup -->
<div id="aipw-signup"
  data-source="foreign-mind"
  data-theme="light"
  data-headline="Weekly AI leadership insights">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

**Suggested placement:** Book landing page, chapter preview pages

---

## Compact Inline Version

For sidebars or narrow spaces:

```html
<div id="aipw-signup"
  data-source="YOUR_PRODUCT"
  data-compact="true"
  data-button="Join">
</div>
<script src="https://aiprodweekly.com/embeds/newsletter-embed.js" defer></script>
```

---

## Self-Hosted Version

If you prefer to host the script yourself:

1. Copy `newsletter-embed.js` to your static assets
2. Update the script src to your hosted URL
3. The script works independently with no external dependencies

---

## Segmentation in Supabase

All subscribers are stored in `newsletter_subscribers` with:
- `email`: Subscriber email
- `source`: Product identifier
- `created_at`: Signup timestamp

Query subscribers by source:
```sql
SELECT * FROM newsletter_subscribers WHERE source = 'learningai';
```

Count by source:
```sql
SELECT source, COUNT(*) FROM newsletter_subscribers GROUP BY source;
```

---

## Testing

To test locally, create a test HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Newsletter Embed Test</title>
</head>
<body>
  <h1>Test Page</h1>

  <h2>Light Theme</h2>
  <div id="aipw-signup" data-source="test-light" data-theme="light"></div>

  <h2>Dark Theme</h2>
  <div data-aipw-signup data-source="test-dark" data-theme="dark"></div>

  <h2>Compact</h2>
  <div id="aipw-signup" data-source="test-compact" data-compact="true"></div>

  <script src="newsletter-embed.js"></script>
</body>
</html>
```

---

*Created: December 30, 2025*
