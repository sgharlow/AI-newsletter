# A/B Testing Guide for Email Subject Lines

This guide explains how to use the A/B testing feature to optimize your newsletter subject lines.

## Overview

The A/B testing system allows you to:
- Test multiple subject line variants simultaneously
- Automatically track open rates for each variant
- Determine a statistically significant winner
- Send the winning subject to remaining subscribers

## Setup

1. Run the migration to create the required tables:
   ```bash
   npx supabase db push --project-ref xitfncljhfdqvnzakbwl
   ```

2. Deploy the A/B test Edge Function:
   ```bash
   npx supabase functions deploy ab-test --project-ref xitfncljhfdqvnzakbwl
   ```

## Usage

### Step 1: Create an A/B Test

```bash
curl -X POST 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/ab-test?action=create' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{
    "name": "Issue #24 Subject Test",
    "variants": [
      {
        "name": "A",
        "subject_line": "Stop losing leads to follow-up failure",
        "preview_text": "Your sales pipeline needs automation"
      },
      {
        "name": "B",
        "subject_line": "The sales automation system I wish I had earlier",
        "preview_text": "Never miss a follow-up again"
      },
      {
        "name": "C",
        "subject_line": "How I automated my entire sales pipeline",
        "preview_text": "From first contact to closed deal"
      }
    ],
    "test_percentage": 20,
    "min_sample_size": 100
  }'
```

**Parameters:**
- `name`: Description of the test
- `variants`: 2-4 subject line variations (each needs name, subject_line, optional preview_text)
- `test_percentage`: % of subscribers to include in test (5-50%, default 20%)
- `min_sample_size`: Minimum sends per variant before determining winner (default 100)
- `auto_send_winner`: Whether to auto-send to remaining subscribers (default true)

**Response:**
```json
{
  "success": true,
  "test": {
    "id": "uuid-of-test",
    "name": "Issue #24 Subject Test",
    "status": "draft",
    "variants": [...]
  }
}
```

### Step 2: Send Test Emails

```bash
curl -X POST 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/ab-test?action=send' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{
    "test_id": "uuid-of-test",
    "secret": "YOUR_BROADCAST_SECRET",
    "html": "<html>...your email content...</html>",
    "text": "Plain text version"
  }'
```

The system will:
1. Randomly select subscribers (based on test_percentage)
2. Evenly distribute them across variants
3. Send each group their variant's subject line
4. Inject a tracking pixel to monitor opens

**Response:**
```json
{
  "success": true,
  "test_id": "uuid",
  "total_test_subscribers": 200,
  "variants_count": 3,
  "per_variant": 66,
  "sent": 200,
  "failed": 0,
  "remaining_subscribers": 800
}
```

### Step 3: Monitor Results

Check test results at any time:

```bash
curl 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/ab-test?action=results&test_id=uuid-of-test' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'
```

**Response:**
```json
{
  "success": true,
  "test": {
    "id": "uuid",
    "name": "Issue #24 Subject Test",
    "status": "running"
  },
  "results": [
    {
      "variant_name": "B",
      "subject_line": "The sales automation system I wish I had earlier",
      "sent_count": 66,
      "open_count": 28,
      "open_rate": 42.42,
      "confidence_score": 60.0
    },
    {
      "variant_name": "A",
      "subject_line": "Stop losing leads to follow-up failure",
      "sent_count": 66,
      "open_count": 24,
      "open_rate": 36.36,
      "confidence_score": 60.0
    },
    {
      "variant_name": "C",
      "subject_line": "How I automated my entire sales pipeline",
      "sent_count": 66,
      "open_count": 20,
      "open_rate": 30.30,
      "confidence_score": 60.0
    }
  ]
}
```

### Step 4: Determine Winner & Send to Remaining

When you have enough data (wait 24-48 hours for opens):

```bash
curl -X POST 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/ab-test?action=winner' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{
    "test_id": "uuid-of-test",
    "secret": "YOUR_BROADCAST_SECRET",
    "send_to_remaining": true,
    "html": "<html>...your email content...</html>",
    "text": "Plain text version"
  }'
```

**Response:**
```json
{
  "success": true,
  "winner": {
    "id": "variant-uuid",
    "name": "B",
    "subject_line": "The sales automation system I wish I had earlier",
    "open_rate": 42.42
  },
  "remaining_sent": 800
}
```

## Best Practices

### Timing
- **Wait 24-48 hours** before determining winner (most opens happen in first 24h)
- **Send tests on same day/time** as your usual broadcasts
- **Avoid weekends** for tests if your audience is B2B

### Sample Size
- **Minimum 25 per variant** for any statistical significance
- **100+ per variant** recommended for reliable results
- **Larger list = smaller test percentage** (10% of 10k is still 1000)

### Subject Line Tips
- Test ONE variable at a time:
  - Personalization (name vs no name)
  - Emoji vs no emoji
  - Question vs statement
  - Length (short vs long)
  - Curiosity gap vs direct benefit
- Keep preview text consistent if only testing subject

### Interpreting Results
- **5%+ difference** with 100+ sample is usually significant
- **<5% difference** might be noise - test again
- **Confidence score** indicates sample size reliability:
  - 95%: Very reliable (100+ sends)
  - 80%: Reliable (50+ sends)
  - 60%: Use with caution (25+ sends)
  - 40%: Too small sample

## Troubleshooting

### Tracking pixel not working
- Check that the email HTML includes a `</body>` tag
- Verify the Edge Function is deployed
- Check Supabase function logs for errors

### Low open rates across all variants
- Check spam folder deliverability
- Verify sender reputation
- Review email content and sending time

### Winner determination fails
- Ensure minimum sample size is met
- Check that test status is "running"
- Review database function logs

## Database Schema

```sql
-- Main test record
ab_tests (id, name, status, test_percentage, winner_variant_id, ...)

-- Subject line variants
ab_test_variants (id, test_id, name, subject_line, preview_text, sent_count, open_count, ...)

-- Subscriber assignments and tracking
ab_test_assignments (id, test_id, variant_id, subscriber_id, opened_at, clicked_at)
```

## API Reference

| Endpoint | Method | Action | Description |
|----------|--------|--------|-------------|
| `/ab-test?action=create` | POST | Create test | Creates new A/B test with variants |
| `/ab-test?action=send` | POST | Send test | Sends test emails to sample group |
| `/ab-test?action=track` | GET | Track open | Called by tracking pixel |
| `/ab-test?action=results` | GET | Get results | Returns current test statistics |
| `/ab-test?action=winner` | POST | Determine winner | Picks winner and optionally sends to remaining |

---

*Last updated: January 5, 2026*
