-- Welcome Sequence Cron Job for AI Prod Weekly
-- This migration sets up automated welcome email sequence
-- Sends emails on Days 2, 4, 6, and 7 after signup

-- Prerequisites:
-- 1. pg_cron extension must be enabled (it is by default on Supabase)
-- 2. pg_net extension for HTTP calls
-- 3. RESEND_API_KEY must be set in Edge Function secrets

-- Step 1: Add sequence tracking columns to newsletter_subscribers
ALTER TABLE newsletter_subscribers
ADD COLUMN IF NOT EXISTS welcome_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS sequence_day_2_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS sequence_day_4_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS sequence_day_6_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS sequence_day_7_sent_at TIMESTAMPTZ;

-- Step 2: Create function to process welcome sequence
CREATE OR REPLACE FUNCTION process_welcome_sequence()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  subscriber RECORD;
  days_since_signup INTEGER;
  function_url TEXT := 'https://xitfncljhfdqvnzakbwl.supabase.co/functions/v1/welcome-sequence-daily';
BEGIN
  -- Loop through subscribers who need sequence emails
  FOR subscriber IN
    SELECT id, email, created_at,
           welcome_sent_at,
           sequence_day_2_sent_at,
           sequence_day_4_sent_at,
           sequence_day_6_sent_at,
           sequence_day_7_sent_at
    FROM newsletter_subscribers
    WHERE status = 'active'
      AND created_at >= NOW() - INTERVAL '10 days'  -- Only process recent subscribers
  LOOP
    days_since_signup := EXTRACT(DAY FROM (NOW() - subscriber.created_at));

    -- Day 2: Value reminder email
    IF days_since_signup >= 2
       AND subscriber.sequence_day_2_sent_at IS NULL
       AND subscriber.welcome_sent_at IS NOT NULL
    THEN
      PERFORM net.http_post(
        url := function_url,
        body := jsonb_build_object(
          'email', subscriber.email,
          'subscriber_id', subscriber.id,
          'sequence_day', 2
        ),
        headers := jsonb_build_object('Content-Type', 'application/json')
      );
    END IF;

    -- Day 4: Resource/tip email
    IF days_since_signup >= 4
       AND subscriber.sequence_day_4_sent_at IS NULL
       AND subscriber.sequence_day_2_sent_at IS NOT NULL
    THEN
      PERFORM net.http_post(
        url := function_url,
        body := jsonb_build_object(
          'email', subscriber.email,
          'subscriber_id', subscriber.id,
          'sequence_day', 4
        ),
        headers := jsonb_build_object('Content-Type', 'application/json')
      );
    END IF;

    -- Day 6: Engagement check email
    IF days_since_signup >= 6
       AND subscriber.sequence_day_6_sent_at IS NULL
       AND subscriber.sequence_day_4_sent_at IS NOT NULL
    THEN
      PERFORM net.http_post(
        url := function_url,
        body := jsonb_build_object(
          'email', subscriber.email,
          'subscriber_id', subscriber.id,
          'sequence_day', 6
        ),
        headers := jsonb_build_object('Content-Type', 'application/json')
      );
    END IF;

    -- Day 7: Week 1 complete / feedback request
    IF days_since_signup >= 7
       AND subscriber.sequence_day_7_sent_at IS NULL
       AND subscriber.sequence_day_6_sent_at IS NOT NULL
    THEN
      PERFORM net.http_post(
        url := function_url,
        body := jsonb_build_object(
          'email', subscriber.email,
          'subscriber_id', subscriber.id,
          'sequence_day', 7
        ),
        headers := jsonb_build_object('Content-Type', 'application/json')
      );
    END IF;
  END LOOP;
END;
$$;

-- Step 3: Create the pg_cron job to run daily at 9 AM UTC
-- Note: Run this manually in SQL Editor after enabling pg_cron
-- SELECT cron.schedule(
--   'welcome-sequence-daily',
--   '0 9 * * *',  -- Every day at 9:00 AM UTC
--   $$ SELECT process_welcome_sequence(); $$
-- );

-- To check job status:
-- SELECT * FROM cron.job;

-- To see job run history:
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 20;

-- To unschedule:
-- SELECT cron.unschedule('welcome-sequence-daily');

-- Step 4: Grant necessary permissions
GRANT USAGE ON SCHEMA net TO postgres;
GRANT EXECUTE ON FUNCTION process_welcome_sequence() TO postgres;

COMMENT ON FUNCTION process_welcome_sequence() IS
'Processes welcome email sequence for new subscribers.
Runs daily via pg_cron and sends Day 2, 4, 6, 7 emails.';
