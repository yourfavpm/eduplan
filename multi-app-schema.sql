-- ============================================================
-- EduPlan360 — Multi-Application Schema
-- Run AFTER portal-schema.sql (portal_profiles must exist)
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── Helpers ─────────────────────────────────────────────

-- Ensure is_admin() function exists (also in portal-schema.sql)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM portal_profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── 1. qualification_levels ──────────────────────────────

CREATE TABLE IF NOT EXISTS qualification_levels (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE qualification_levels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view qualification levels" ON qualification_levels;
DROP POLICY IF EXISTS "Admins can manage qualification levels" ON qualification_levels;

CREATE POLICY "Anyone can view qualification levels"
  ON qualification_levels FOR SELECT USING (true);

CREATE POLICY "Admins can manage qualification levels"
  ON qualification_levels FOR ALL USING (is_admin());

-- Seed default qualification levels using an anti-join to prevent duplicates without relying on ON CONFLICT constraints
INSERT INTO qualification_levels (name, description, sort_order)
SELECT * FROM (VALUES
  ('High School', 'Completed secondary education', 1),
  ('A-Levels / Foundation', 'Pre-university qualifications', 2),
  ('Undergraduate Degree', 'Bachelor''s degree or equivalent', 3),
  ('Postgraduate (Masters)', 'Master''s degree or equivalent', 4),
  ('Doctorate (PhD)', 'Doctor of Philosophy or equivalent', 5),
  ('Other Degree/Diploma', 'Other professional or academic diploma', 6)
) AS v(name, description, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM qualification_levels ql WHERE ql.name = v.name
);

-- ─── 2. document_types ────────────────────────────────────
-- (already exists from document-requirements-schema.sql, just ensure it's present)

CREATE TABLE IF NOT EXISTS document_types (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  required    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view document types" ON document_types;
DROP POLICY IF EXISTS "Admins can manage document types" ON document_types;

CREATE POLICY "Anyone can view document types"
  ON document_types FOR SELECT USING (true);

CREATE POLICY "Admins can manage document types"
  ON document_types FOR ALL USING (is_admin());

-- Seed common document types using anti-join
INSERT INTO document_types (name, description)
SELECT * FROM (VALUES
  ('Passport',                    'Valid international passport (bio-data page)'),
  ('Academic Transcript',          'Official academic transcript from issuing institution'),
  ('Statement of Purpose',         'Personal statement / SOP'),
  ('Reference Letter',             'Academic or professional reference letter'),
  ('CV / Resume',                  'Curriculum vitae or resume'),
  ('English Test Result',          'IELTS, TOEFL, or equivalent certificate'),
  ('SSCE / WAEC Result',           'O-Level result slip or certificate'),
  ('Diploma Certificate',          'Diploma or ND certificate'),
  ('HND Certificate',              'HND certificate'),
  ('Degree Certificate',           'Bachelor''s degree certificate'),
  ('Postgraduate Certificate',     'Master''s or PhD certificate'),
  ('Birth Certificate',            'Original birth certificate'),
  ('NYSC Certificate',             'National Youth Service Corps discharge certificate'),
  ('Work Experience Letter',       'Employer letter confirming work experience'),
  ('Research Proposal',            'Research proposal (required for PhD applicants)')
) AS v(name, description)
WHERE NOT EXISTS (
  SELECT 1 FROM document_types dt WHERE dt.name = v.name
);

-- ─── 3. qualification_mandatory_documents ─────────────────

CREATE TABLE IF NOT EXISTS qualification_mandatory_documents (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification_level_id UUID NOT NULL REFERENCES qualification_levels(id) ON DELETE CASCADE,
  document_type_id     UUID NOT NULL REFERENCES document_types(id) ON DELETE CASCADE,
  is_required          BOOLEAN NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (qualification_level_id, document_type_id)
);

-- Ensure constraint exists even if table was created without it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'qualification_mandatory_documents_qualification_level_id_docu'
      AND conrelid = 'qualification_mandatory_documents'::regclass
  ) THEN
    ALTER TABLE qualification_mandatory_documents
      ADD CONSTRAINT qualification_mandatory_documents_qualification_level_id_docu
      UNIQUE (qualification_level_id, document_type_id);
  END IF;
END $$;

ALTER TABLE qualification_mandatory_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view mandatory doc mappings" ON qualification_mandatory_documents;
DROP POLICY IF EXISTS "Admins can manage mandatory doc mappings" ON qualification_mandatory_documents;

CREATE POLICY "Anyone can view mandatory doc mappings"
  ON qualification_mandatory_documents FOR SELECT USING (true);

CREATE POLICY "Admins can manage mandatory doc mappings"
  ON qualification_mandatory_documents FOR ALL USING (is_admin());


-- ─── 4. applications ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS applications (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                   UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  title                     TEXT,                   -- e.g. "Canada – Fall 2026"
  study_destination         TEXT NOT NULL,
  intake_season             TEXT,                   -- Spring | Summer | Autumn / Fall | Winter
  intake_year               TEXT,                   -- e.g. "2026"
  qualification_level_id    UUID REFERENCES qualification_levels(id) ON DELETE SET NULL,
  status                    TEXT NOT NULL DEFAULT 'INCOMPLETE_DOCUMENTS',
  application_fee_paid      BOOLEAN NOT NULL DEFAULT false,
  tuition_deposit_paid      BOOLEAN NOT NULL DEFAULT false,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure intake columns exist if table was already created
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='applications' AND column_name='intake_season') THEN
    ALTER TABLE applications ADD COLUMN intake_season TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='applications' AND column_name='intake_year') THEN
    ALTER TABLE applications ADD COLUMN intake_year TEXT;
  END IF;
END $$;


ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own applications" ON applications;
DROP POLICY IF EXISTS "Students can insert own applications" ON applications;
DROP POLICY IF EXISTS "Students can update own applications" ON applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can update all applications" ON applications;

CREATE POLICY "Students can view own applications"
  ON applications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own applications"
  ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own applications"
  ON applications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON applications FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all applications"
  ON applications FOR UPDATE USING (is_admin());

CREATE OR REPLACE TRIGGER applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ─── 5. application_university_choices ───────────────────

CREATE TABLE IF NOT EXISTS application_university_choices (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id   UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  university_name  TEXT NOT NULL,
  university_country TEXT,
  priority         INTEGER NOT NULL CHECK (priority IN (1, 2, 3)),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (application_id, priority)
);

-- Enforce max 3 university choices per application
CREATE OR REPLACE FUNCTION check_max_university_choices()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM application_university_choices
    WHERE application_id = NEW.application_id
  ) >= 3 THEN
    RAISE EXCEPTION 'Maximum of 3 university choices per application';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER enforce_max_university_choices
  BEFORE INSERT ON application_university_choices
  FOR EACH ROW EXECUTE FUNCTION check_max_university_choices();

ALTER TABLE application_university_choices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can manage own university choices" ON application_university_choices;
DROP POLICY IF EXISTS "Admins can view all university choices" ON application_university_choices;

CREATE POLICY "Students can manage own university choices"
  ON application_university_choices FOR ALL
  USING (EXISTS (
    SELECT 1 FROM applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all university choices"
  ON application_university_choices FOR SELECT USING (is_admin());

-- ─── 6. university_course_choices ────────────────────────

CREATE TABLE IF NOT EXISTS university_course_choices (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_choice_id  UUID NOT NULL REFERENCES application_university_choices(id) ON DELETE CASCADE,
  course_name           TEXT NOT NULL,
  priority              INTEGER NOT NULL CHECK (priority IN (1, 2)),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (university_choice_id, priority)
);

-- Enforce max 2 course choices per university choice
CREATE OR REPLACE FUNCTION check_max_course_choices()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM university_course_choices
    WHERE university_choice_id = NEW.university_choice_id
  ) >= 2 THEN
    RAISE EXCEPTION 'Maximum of 2 course choices per university';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER enforce_max_course_choices
  BEFORE INSERT ON university_course_choices
  FOR EACH ROW EXECUTE FUNCTION check_max_course_choices();

ALTER TABLE university_course_choices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can manage own course choices" ON university_course_choices;
DROP POLICY IF EXISTS "Admins can view all course choices" ON university_course_choices;

CREATE POLICY "Students can manage own course choices"
  ON university_course_choices FOR ALL
  USING (EXISTS (
    SELECT 1 FROM application_university_choices auc
    JOIN applications a ON a.id = auc.application_id
    WHERE auc.id = university_choice_id AND a.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM application_university_choices auc
    JOIN applications a ON a.id = auc.application_id
    WHERE auc.id = university_choice_id AND a.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all course choices"
  ON university_course_choices FOR SELECT USING (is_admin());

-- ─── 7. application_required_documents ───────────────────

-- Drop existing table and re-create with source column
-- (safe to drop if running fresh; add source column if migrating)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'application_required_documents') THEN
    -- Add source column if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'application_required_documents' AND column_name = 'source'
    ) THEN
      ALTER TABLE application_required_documents ADD COLUMN source TEXT NOT NULL DEFAULT 'auto_qualification';
    END IF;

    -- Add unique constraint if it doesn't exist (required for ON CONFLICT in trigger)
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = 'application_required_documents'::regclass
        AND contype = 'u'
        AND conname = 'application_required_documents_application_id_document_type_id'
    ) THEN
      ALTER TABLE application_required_documents
        ADD CONSTRAINT application_required_documents_application_id_document_type_id
        UNIQUE (application_id, document_type_id);
    END IF;
  ELSE
    CREATE TABLE application_required_documents (
      id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      application_id    UUID NOT NULL,
      document_type_id  UUID NOT NULL REFERENCES document_types(id) ON DELETE CASCADE,
      source            TEXT NOT NULL DEFAULT 'auto_qualification',
      status            TEXT NOT NULL DEFAULT 'pending',
      rejection_reason  TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (application_id, document_type_id)
    );
  END IF;
END;
$$;


ALTER TABLE application_required_documents ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Students can view own required documents" ON application_required_documents;
DROP POLICY IF EXISTS "Admins can view all required documents" ON application_required_documents;
DROP POLICY IF EXISTS "Admins can manage required documents" ON application_required_documents;

-- Drop current policies before re-creating
DROP POLICY IF EXISTS "Students view own required documents" ON application_required_documents;
DROP POLICY IF EXISTS "Admins manage all required documents" ON application_required_documents;
DROP POLICY IF EXISTS "Service role can insert required documents" ON application_required_documents;

CREATE POLICY "Students view own required documents"
  ON application_required_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM applications a WHERE a.id = application_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins manage all required documents"
  ON application_required_documents FOR ALL USING (is_admin());

-- System can insert required docs (triggered by application creation)
CREATE POLICY "Service role can insert required documents"
  ON application_required_documents FOR INSERT
  WITH CHECK (true);

CREATE OR REPLACE TRIGGER application_required_documents_updated_at
  BEFORE UPDATE ON application_required_documents
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ─── 8. documents (uploads) ──────────────────────────────

CREATE TABLE IF NOT EXISTS documents (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  application_id        UUID,  -- references applications(id)
  document_type_id      UUID NOT NULL REFERENCES document_types(id) ON DELETE CASCADE,
  required_document_id  UUID REFERENCES application_required_documents(id) ON DELETE SET NULL,
  file_path             TEXT NOT NULL,
  original_filename     TEXT NOT NULL,
  file_size             INTEGER,
  status                TEXT NOT NULL DEFAULT 'uploaded', -- 'uploaded' | 'approved' | 'rejected'
  rejection_reason      TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own documents" ON documents;
DROP POLICY IF EXISTS "Students can insert own documents" ON documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON documents;
DROP POLICY IF EXISTS "Admins can update all documents" ON documents;

DROP POLICY IF EXISTS "Students view own docs" ON documents;
DROP POLICY IF EXISTS "Students insert own docs" ON documents;
DROP POLICY IF EXISTS "Admins manage all docs" ON documents;

CREATE POLICY "Students view own docs"
  ON documents FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students insert own docs"
  ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all docs"
  ON documents FOR ALL USING (is_admin());

-- ─── 9. status_history ───────────────────────────────────

CREATE TABLE IF NOT EXISTS status_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id  UUID NOT NULL,  -- references applications(id)
  status          TEXT NOT NULL,
  note            TEXT,
  actor_admin_id  UUID REFERENCES portal_profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students view own status history" ON status_history;
DROP POLICY IF EXISTS "Admins manage status history" ON status_history;
DROP POLICY IF EXISTS "Service can insert status history" ON status_history;

CREATE POLICY "Students view own status history"
  ON status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM applications a WHERE a.id = application_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins manage status history"
  ON status_history FOR ALL USING (is_admin());

-- System inserts on application create
CREATE POLICY "Service can insert status history"
  ON status_history FOR INSERT WITH CHECK (true);

-- ─── 10. audit_log ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_admin_id  UUID REFERENCES portal_profiles(id) ON DELETE SET NULL,
  action          TEXT NOT NULL,
  entity_type     TEXT NOT NULL,
  entity_id       TEXT,
  before_json     JSONB,
  after_json      JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins view audit log" ON audit_log;
DROP POLICY IF EXISTS "Service inserts audit log" ON audit_log;

CREATE POLICY "Admins view audit log"
  ON audit_log FOR SELECT USING (is_admin());

CREATE POLICY "Service inserts audit log"
  ON audit_log FOR INSERT WITH CHECK (true);

-- ─── 11. Auto-populate required docs trigger ─────────────
-- Fires after a new application row is inserted.
-- Looks up qualification_mandatory_documents for the selected qualification_level_id
-- and inserts a row in application_required_documents for each mandatory doc.

CREATE OR REPLACE FUNCTION auto_populate_required_documents()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.qualification_level_id IS NOT NULL THEN
    INSERT INTO application_required_documents (application_id, document_type_id, source, status)
    SELECT
      NEW.id,
      qmd.document_type_id,
      'auto_qualification',
      'pending'
    FROM qualification_mandatory_documents qmd
    WHERE qmd.qualification_level_id = NEW.qualification_level_id
      AND qmd.is_required = true
      AND NOT EXISTS (
        SELECT 1 FROM application_required_documents ard
        WHERE ard.application_id = NEW.id
          AND ard.document_type_id = qmd.document_type_id
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DROP TRIGGER IF EXISTS on_application_created ON applications;
CREATE TRIGGER on_application_created
  AFTER INSERT ON applications
  FOR EACH ROW EXECUTE FUNCTION auto_populate_required_documents();

-- Also insert initial status history entry
CREATE OR REPLACE FUNCTION on_application_insert_status_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO status_history (application_id, status, note)
  VALUES (NEW.id, 'INCOMPLETE_DOCUMENTS', 'Application created');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_application_created_status_history ON applications;
CREATE TRIGGER on_application_created_status_history
  AFTER INSERT ON applications
  FOR EACH ROW EXECUTE FUNCTION on_application_insert_status_history();

-- ─── 12. Indexes ─────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_app_uni_choices_application_id ON application_university_choices(application_id);
CREATE INDEX IF NOT EXISTS idx_uni_course_choices_uni_choice_id ON university_course_choices(university_choice_id);
CREATE INDEX IF NOT EXISTS idx_app_req_docs_application_id ON application_required_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_application_id ON documents(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_required_doc_id ON documents(required_document_id);
CREATE INDEX IF NOT EXISTS idx_status_history_application_id ON status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);

-- ============================================================
-- STORAGE SETUP (run separately in Supabase Storage UI)
-- 1. Create bucket named: documents  (PRIVATE)
-- 2. Storage RLS policies:
--
-- INSERT (students upload own files):
--   bucket_id = 'documents'
--   AND (storage.foldername(name))[1] = auth.uid()::text
--
-- SELECT (students read own files):
--   bucket_id = 'documents'
--   AND (storage.foldername(name))[1] = auth.uid()::text
--
-- SELECT (admins read all):
--   bucket_id = 'documents' AND is_admin()
-- ============================================================
