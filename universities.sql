-- ============================================================
-- Universities Table
-- ============================================================

CREATE TABLE IF NOT EXISTS universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  location TEXT,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  courses JSONB DEFAULT '[]'::jsonb,
  admission_requirements TEXT,
  intakes JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published universities" 
  ON universities FOR SELECT 
  USING (published = true);

CREATE POLICY "Admins can manage universities" 
  ON universities FOR ALL 
  USING (is_admin());

CREATE INDEX IF NOT EXISTS idx_universities_slug ON universities(slug);
CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);

CREATE TRIGGER handle_updated_at_universities 
  BEFORE UPDATE ON universities 
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
