# Resend Email Setup Guide

**Project:** AI Prod Weekly (AI-newsletter)
**Supabase Project:** xitfncljhfdqvnzakbwl

---

## Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up with GitHub or email
3. Copy your API key from Dashboard → API Keys

---

## Step 2: Add Domain in Resend

1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter: `aiprodweekly.com`
4. Resend will provide DNS records to add

---

## Step 3: Add DNS Records in Cloudflare

Add these records to your Cloudflare DNS for aiprodweekly.com:

| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | resend._domainkey | (copy from Resend) | Auto |
| TXT | @ or aiprodweekly.com | v=spf1 include:_spf.resend.com ~all | Auto |
| MX | @ | feedback-smtp.us-east-1.amazonses.com | Auto |

Wait 5-15 minutes for verification.

---

## Step 4: Add Resend API Key to Supabase

Run this command (replace YOUR_API_KEY):

```bash
npx supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx --project-ref xitfncljhfdqvnzakbwl
```

Or add via Supabase Dashboard:
1. Go to Project Settings → Edge Functions
2. Add secret: `RESEND_API_KEY` = your key

---

## Step 5: Deploy Edge Functions

```bash
cd AI-newsletter

# Deploy send-email function
npx supabase functions deploy send-email --project-ref xitfncljhfdqvnzakbwl

# Deploy welcome-sequence function
npx supabase functions deploy welcome-sequence --project-ref xitfncljhfdqvnzakbwl
```

---

## Step 6: Create Database Trigger (Optional)

To auto-send welcome emails on signup, create a database trigger:

```sql
-- Add welcome_sent_at column if not exists
ALTER TABLE newsletter_subscribers
ADD COLUMN IF NOT EXISTS welcome_sent_at TIMESTAMPTZ;

-- Create function to call welcome sequence
CREATE OR REPLACE FUNCTION trigger_welcome_sequence()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the welcome-sequence Edge Function
  PERFORM net.http_post(
    url := 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/welcome-sequence',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := jsonb_build_object(
      'email', NEW.email,
      'subscriber_id', NEW.id
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_subscriber_created
  AFTER INSERT ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION trigger_welcome_sequence();
```

---

## Step 7: Test the Setup

### Test send-email function:

```bash
curl -X POST 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/send-email' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{
    "to": "your-test-email@example.com",
    "subject": "Test from AI Prod Weekly",
    "html": "<h1>It works!</h1><p>Your Resend integration is configured correctly.</p>"
  }'
```

### Test welcome-sequence function:

```bash
curl -X POST 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/welcome-sequence' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{
    "email": "your-test-email@example.com"
  }'
```

---

## File Structure

```
AI-newsletter/
├── supabase/
│   └── functions/
│       ├── send-email/
│       │   └── index.ts       # Generic email sender
│       └── welcome-sequence/
│           └── index.ts       # Welcome email on signup
├── RESEND-SETUP.md           # This file
└── index.html                 # Landing page
```

---

## Troubleshooting

### "Domain not verified"
- Check DNS records are correct in Cloudflare
- Wait 15 minutes and check Resend dashboard

### "RESEND_API_KEY not configured"
- Run the secrets set command again
- Redeploy the Edge Functions

### Emails going to spam
- Make sure SPF and DKIM records are set correctly
- Use a proper "from" address (hello@aiprodweekly.com)

---

## Next Steps After Setup

1. [ ] Test welcome email delivery
2. [ ] Create pg_cron job for scheduled sequence emails (Days 2, 4, 6, 7)
3. [ ] Create broadcast function for weekly newsletters
4. [ ] Set up unsubscribe handling

---

*Created: December 29, 2025*
