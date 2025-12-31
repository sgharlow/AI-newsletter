-- Newsletter Analytics Table
-- Tracks embed form interactions across all products

CREATE TABLE IF NOT EXISTS newsletter_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  source TEXT NOT NULL,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying by event type and source
CREATE INDEX idx_newsletter_analytics_event ON newsletter_analytics(event);
CREATE INDEX idx_newsletter_analytics_source ON newsletter_analytics(source);
CREATE INDEX idx_newsletter_analytics_created_at ON newsletter_analytics(created_at DESC);

-- Enable RLS
ALTER TABLE newsletter_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for embed tracking)
CREATE POLICY "Allow anonymous inserts" ON newsletter_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read analytics
CREATE POLICY "Only authenticated can read" ON newsletter_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Comment on table
COMMENT ON TABLE newsletter_analytics IS 'Tracks newsletter embed form interactions (view, focus, submit, success, error, exists)';
