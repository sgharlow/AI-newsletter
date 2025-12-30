-- Broadcast history table
-- Tracks all newsletter broadcasts for analytics

CREATE TABLE IF NOT EXISTS newsletter_broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  sent_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  source_filter TEXT,
  template_used TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for querying recent broadcasts
CREATE INDEX idx_broadcasts_created_at ON newsletter_broadcasts(created_at DESC);

-- Add status and unsubscribe tracking to subscribers
ALTER TABLE newsletter_subscribers
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active',
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ;

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON newsletter_subscribers(status);

-- RLS policy for unsubscribe function (uses service role, but good to have)
-- Note: Service role bypasses RLS, so this is for documentation

COMMENT ON TABLE newsletter_broadcasts IS 'History of all newsletter broadcasts sent';
COMMENT ON COLUMN newsletter_subscribers.status IS 'Subscriber status: active, unsubscribed, bounced';
COMMENT ON COLUMN newsletter_subscribers.unsubscribed_at IS 'Timestamp when subscriber unsubscribed';
