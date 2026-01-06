-- A/B Testing for Email Subject Lines
-- Run this migration to add A/B testing capabilities

-- A/B Test definitions
CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  broadcast_id UUID REFERENCES newsletter_broadcasts(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'cancelled')),
  winner_variant_id UUID,
  winner_determined_at TIMESTAMPTZ,
  -- Settings
  test_percentage INTEGER DEFAULT 20 CHECK (test_percentage BETWEEN 5 AND 50),
  min_sample_size INTEGER DEFAULT 100,
  auto_send_winner BOOLEAN DEFAULT true,
  decision_metric VARCHAR(20) DEFAULT 'open_rate' CHECK (decision_metric IN ('open_rate', 'click_rate')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subject line variants for A/B testing
CREATE TABLE IF NOT EXISTS ab_test_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL, -- e.g., 'A', 'B', 'C'
  subject_line TEXT NOT NULL,
  preview_text TEXT,
  -- Metrics
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  unsubscribe_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(test_id, name)
);

-- Track which variant each subscriber received
CREATE TABLE IF NOT EXISTS ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES ab_test_variants(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  email_sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  UNIQUE(test_id, subscriber_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_ab_assignments_test ON ab_test_assignments(test_id);
CREATE INDEX IF NOT EXISTS idx_ab_assignments_variant ON ab_test_assignments(variant_id);
CREATE INDEX IF NOT EXISTS idx_ab_assignments_subscriber ON ab_test_assignments(subscriber_id);

-- Function to calculate variant statistics
CREATE OR REPLACE FUNCTION get_ab_test_results(p_test_id UUID)
RETURNS TABLE (
  variant_id UUID,
  variant_name VARCHAR(50),
  subject_line TEXT,
  sent_count BIGINT,
  open_count BIGINT,
  click_count BIGINT,
  open_rate DECIMAL(5,2),
  click_rate DECIMAL(5,2),
  confidence_score DECIMAL(5,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    v.id AS variant_id,
    v.name AS variant_name,
    v.subject_line,
    COUNT(a.id)::BIGINT AS sent_count,
    COUNT(a.opened_at)::BIGINT AS open_count,
    COUNT(a.clicked_at)::BIGINT AS click_count,
    CASE
      WHEN COUNT(a.id) > 0
      THEN ROUND((COUNT(a.opened_at)::DECIMAL / COUNT(a.id) * 100), 2)
      ELSE 0
    END AS open_rate,
    CASE
      WHEN COUNT(a.opened_at) > 0
      THEN ROUND((COUNT(a.clicked_at)::DECIMAL / COUNT(a.opened_at) * 100), 2)
      ELSE 0
    END AS click_rate,
    -- Simple confidence score based on sample size and rate difference
    CASE
      WHEN COUNT(a.id) >= 100 THEN 95.0
      WHEN COUNT(a.id) >= 50 THEN 80.0
      WHEN COUNT(a.id) >= 25 THEN 60.0
      ELSE 40.0
    END AS confidence_score
  FROM ab_test_variants v
  LEFT JOIN ab_test_assignments a ON a.variant_id = v.id
  WHERE v.test_id = p_test_id
  GROUP BY v.id, v.name, v.subject_line
  ORDER BY open_rate DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to determine winner
CREATE OR REPLACE FUNCTION determine_ab_winner(p_test_id UUID)
RETURNS UUID AS $$
DECLARE
  v_winner_id UUID;
  v_test_status VARCHAR(20);
BEGIN
  -- Check test status
  SELECT status INTO v_test_status FROM ab_tests WHERE id = p_test_id;
  IF v_test_status != 'running' THEN
    RAISE EXCEPTION 'Test must be running to determine winner';
  END IF;

  -- Find variant with highest open rate (minimum sample size required)
  SELECT variant_id INTO v_winner_id
  FROM (
    SELECT
      v.id AS variant_id,
      COUNT(a.id) AS sent,
      COUNT(a.opened_at)::DECIMAL / NULLIF(COUNT(a.id), 0) AS open_rate
    FROM ab_test_variants v
    LEFT JOIN ab_test_assignments a ON a.variant_id = v.id
    WHERE v.test_id = p_test_id
    GROUP BY v.id
    HAVING COUNT(a.id) >= 25 -- Minimum sample
  ) results
  ORDER BY open_rate DESC
  LIMIT 1;

  IF v_winner_id IS NOT NULL THEN
    UPDATE ab_tests
    SET
      winner_variant_id = v_winner_id,
      winner_determined_at = NOW(),
      status = 'completed'
    WHERE id = p_test_id;
  END IF;

  RETURN v_winner_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update variant counts
CREATE OR REPLACE FUNCTION update_variant_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE ab_test_variants
    SET sent_count = sent_count + 1
    WHERE id = NEW.variant_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.opened_at IS NOT NULL AND OLD.opened_at IS NULL THEN
      UPDATE ab_test_variants
      SET open_count = open_count + 1
      WHERE id = NEW.variant_id;
    END IF;
    IF NEW.clicked_at IS NOT NULL AND OLD.clicked_at IS NULL THEN
      UPDATE ab_test_variants
      SET click_count = click_count + 1
      WHERE id = NEW.variant_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_variant_counts
AFTER INSERT OR UPDATE ON ab_test_assignments
FOR EACH ROW
EXECUTE FUNCTION update_variant_counts();

-- Add column to broadcasts for A/B test reference
ALTER TABLE newsletter_broadcasts
ADD COLUMN IF NOT EXISTS ab_test_id UUID REFERENCES ab_tests(id);

COMMENT ON TABLE ab_tests IS 'A/B tests for email subject line optimization';
COMMENT ON TABLE ab_test_variants IS 'Subject line variants for A/B testing';
COMMENT ON TABLE ab_test_assignments IS 'Tracks which variant each subscriber received';
