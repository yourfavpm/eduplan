-- ============================================================
-- EduPlan360 Admin Portal — Full Schema Extension
-- Run AFTER document-requirements-schema.sql
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── 1. payments ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  type TEXT NOT NULL, -- 'application_fee' | 'tuition_deposit'
  amount NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'GBP',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'paid' | 'failed' | 'refunded'
  reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert payments" ON payments FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update payments" ON payments FOR UPDATE USING (is_admin());

-- ─── 2. admin_notes ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  author_admin_id UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view notes" ON admin_notes FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert notes" ON admin_notes FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can delete own notes" ON admin_notes FOR DELETE USING (is_admin());

-- ─── 3. audit_log ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_admin_id UUID REFERENCES portal_profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- e.g. 'UPDATE_STATUS', 'APPROVE_DOCUMENT', 'CREATE_EVENT'
  entity_type TEXT NOT NULL, -- e.g. 'application', 'document', 'event'
  entity_id TEXT,
  before_json JSONB,
  after_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit log" ON audit_log FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert audit log" ON audit_log FOR INSERT WITH CHECK (is_admin());

-- ─── 4. site_settings ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update site_settings" ON site_settings FOR ALL USING (is_admin());

-- ─── 5. destinations ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  flag_emoji TEXT,
  hero_image TEXT,
  overview TEXT,
  benefits JSONB, -- array of strings
  intakes JSONB, -- array of {month, year}
  partner_universities JSONB, -- array of strings
  top_courses JSONB, -- array of strings
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read destinations" ON destinations FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage destinations" ON destinations FOR ALL USING (is_admin());
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);

-- ─── 6. scholarships ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  country TEXT,
  level TEXT, -- 'undergraduate' | 'postgraduate' | 'phd' | 'all'
  deadline DATE,
  description TEXT,
  link TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read scholarships" ON scholarships FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage scholarships" ON scholarships FOR ALL USING (is_admin());

-- ─── 7. events ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ,
  location TEXT,
  image TEXT,
  registration_link TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read events" ON events FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (is_admin());

-- ─── 8. posts (blog) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  excerpt TEXT,
  body TEXT,
  cover_image TEXT,
  published_at TIMESTAMPTZ,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage posts" ON posts FOR ALL USING (is_admin());
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- ─── 9. services ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read services" ON services FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (is_admin());

-- ─── 10. associates ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS associates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT,
  state TEXT,
  image TEXT,
  bio TEXT,
  status_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE associates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active associates" ON associates FOR SELECT USING (status_active = true);
CREATE POLICY "Admins can manage associates" ON associates FOR ALL USING (is_admin());

-- ─── 11. media_assets ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  url TEXT,
  type TEXT, -- 'image' | 'pdf' | 'video'
  size INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage media" ON media_assets FOR ALL USING (is_admin());

-- ─── 12. updated_at triggers for new tables ───────────────
CREATE TRIGGER handle_updated_at_payments BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER handle_updated_at_destinations BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER handle_updated_at_scholarships BEFORE UPDATE ON scholarships FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER handle_updated_at_events BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER handle_updated_at_posts BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER handle_updated_at_associates BEFORE UPDATE ON associates FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ─── 13. Seed data ────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('contact', '{"email":"info@eduplan360.com","phone":"+44 7000 000000","whatsapp":"+447000000000","address":"London, UK"}'),
  ('socials', '{"instagram":"","facebook":"","twitter":"","linkedin":""}'),
  ('footer', '{"tagline":"Your trusted partner for international study abroad."}')
ON CONFLICT (key) DO NOTHING;

INSERT INTO services (name, description, icon, sort_order, featured) VALUES
  ('University Admissions', 'End-to-end application support for top universities worldwide.', 'graduation-cap', 1, true),
  ('Visa Guidance', 'Expert advice on student visa applications and compliance.', 'passport', 2, true),
  ('Study Abroad Counselling', 'Personalised counselling to match your goals with the right program.', 'compass', 3, true),
  ('Scholarship Assistance', 'Identify and apply for scholarships to fund your education.', 'award', 4, true),
  ('Pre-Departure Support', 'Comprehensive preparation for your journey and life abroad.', 'plane', 5, false),
  ('Accommodation Support', 'Find suitable, safe housing in your destination country.', 'home', 6, false)
ON CONFLICT DO NOTHING;
