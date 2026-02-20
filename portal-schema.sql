-- ============================================================
-- EduPlan360 Student Portal Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── 1. portal_profiles ───────────────────────────────────
-- Mirrors auth.users. Created immediately on sign-up.
CREATE TABLE IF NOT EXISTS portal_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  role TEXT NOT NULL DEFAULT 'student', -- 'student' | 'admin'
  profile_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE portal_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own profile"
  ON portal_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON portal_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Students can insert own profile"
  ON portal_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON portal_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON portal_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ─── 2. portal_applications ───────────────────────────────
CREATE TABLE IF NOT EXISTS portal_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  destination TEXT,
  preferred_university TEXT,
  proposed_course_1 TEXT,
  proposed_course_2 TEXT,
  highest_qualification TEXT,
  status TEXT NOT NULL DEFAULT 'INCOMPLETE_DOCUMENTS',
  -- Status enum values (in order):
  --   INCOMPLETE_DOCUMENTS
  --   PAY_APPLICATION_FEES
  --   APPLICATION_SUBMITTED
  --   OFFER_SENT
  --   PREPARE_FOR_INTERVIEW
  --   PAY_TUITION_DEPOSIT
  --   CAS_ISSUED
  --   PROCESS_VISA
  application_fee_paid BOOLEAN NOT NULL DEFAULT FALSE,
  tuition_deposit_paid BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE portal_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own application"
  ON portal_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own application"
  ON portal_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own application (not status)"
  ON portal_applications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON portal_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all applications"
  ON portal_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ─── 3. portal_documents ──────────────────────────────────
CREATE TABLE IF NOT EXISTS portal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES portal_applications(id) ON DELETE SET NULL,
  doc_type TEXT NOT NULL, -- passport | transcript | sop | reference_letter | other
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Supabase Storage path: portal-documents/{user_id}/...
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | uploaded | approved | rejected
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE portal_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own documents"
  ON portal_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own documents"
  ON portal_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own documents"
  ON portal_documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents"
  ON portal_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all documents"
  ON portal_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ─── 4. portal_status_history ─────────────────────────────
CREATE TABLE IF NOT EXISTS portal_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES portal_applications(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  changed_by UUID REFERENCES portal_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE portal_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own status history"
  ON portal_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portal_applications a
      WHERE a.id = application_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all status history"
  ON portal_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert status history"
  ON portal_status_history FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portal_profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ─── 5. Indexes ───────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_portal_applications_user_id ON portal_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_portal_applications_status ON portal_applications(status);
CREATE INDEX IF NOT EXISTS idx_portal_documents_user_id ON portal_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_portal_documents_application_id ON portal_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_portal_status_history_application_id ON portal_status_history(application_id);

-- ─── 6. Updated_at trigger function ───────────────────────
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER portal_profiles_updated_at
  BEFORE UPDATE ON portal_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER portal_applications_updated_at
  BEFORE UPDATE ON portal_applications
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER portal_documents_updated_at
  BEFORE UPDATE ON portal_documents
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- STORAGE SETUP (run separately in Supabase Storage UI or via API)
-- 1. Create bucket named: portal-documents
-- 2. Set it as PRIVATE
-- 3. Add the following Storage RLS policies:
--
-- INSERT policy (students upload to own folder):
--   bucket_id = 'portal-documents'
--   AND (storage.foldername(name))[1] = auth.uid()::text
--
-- SELECT policy (students read own files):
--   bucket_id = 'portal-documents'
--   AND (storage.foldername(name))[1] = auth.uid()::text
-- ============================================================
