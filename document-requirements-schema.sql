
-- ============================================================
-- Document Requirements System — New Tables
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── 1. document_types ────────────────────────────────────
-- Master list of document types, managed by admins
CREATE TABLE IF NOT EXISTS document_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  required BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can read document types
CREATE POLICY "Authenticated users can view document types"
  ON document_types FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert document types"
  ON document_types FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update document types"
  ON document_types FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete document types"
  ON document_types FOR DELETE
  USING (is_admin());

-- ─── 2. application_required_documents ────────────────────
-- Per-application checklist: admin assigns which doc types are needed
CREATE TABLE IF NOT EXISTS application_required_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES portal_applications(id) ON DELETE CASCADE,
  document_type_id UUID NOT NULL REFERENCES document_types(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | uploaded | approved | rejected
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(application_id, document_type_id)
);

ALTER TABLE application_required_documents ENABLE ROW LEVEL SECURITY;

-- Students can only see their own required documents
CREATE POLICY "Students can view own required documents"
  ON application_required_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portal_applications a
      WHERE a.id = application_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all required documents"
  ON application_required_documents FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert required documents"
  ON application_required_documents FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update required documents"
  ON application_required_documents FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete required documents"
  ON application_required_documents FOR DELETE
  USING (is_admin());

-- Students can update status when uploading their own documents
CREATE POLICY "Students can update own required document status"
  ON application_required_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM portal_applications a
      WHERE a.id = application_id AND a.user_id = auth.uid()
    )
  );

-- ─── 3. documents (new structured upload table) ───────────
-- Actual file uploads, each tied to a specific document type
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES portal_applications(id) ON DELETE SET NULL,
  document_type_id UUID NOT NULL REFERENCES document_types(id) ON DELETE CASCADE,
  required_document_id UUID REFERENCES application_required_documents(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'uploaded', -- uploaded | approved | rejected
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update own documents"
  ON documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents"
  ON documents FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all documents"
  ON documents FOR UPDATE
  USING (is_admin());

-- ─── 4. Indexes ───────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_app_req_docs_application_id ON application_required_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_app_req_docs_document_type_id ON application_required_documents(document_type_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_application_id ON documents(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_required_document_id ON documents(required_document_id);

-- ─── 5. Auto-advance trigger ──────────────────────────────
-- When ALL required docs for an application are 'uploaded' or 'approved',
-- advance application status to PAY_APPLICATION_FEES
CREATE OR REPLACE FUNCTION check_and_advance_application_status()
RETURNS TRIGGER AS $$
DECLARE
  v_app_id UUID;
  v_pending_count INTEGER;
  v_current_status TEXT;
BEGIN
  v_app_id := NEW.application_id;

  -- Count docs that are still pending or rejected
  SELECT COUNT(*) INTO v_pending_count
  FROM application_required_documents
  WHERE application_id = v_app_id
    AND status NOT IN ('uploaded', 'approved');

  -- Get current application status
  SELECT status INTO v_current_status
  FROM portal_applications
  WHERE id = v_app_id;

  -- Only advance if we're at INCOMPLETE_DOCUMENTS and all docs are submitted
  IF v_pending_count = 0 AND v_current_status = 'INCOMPLETE_DOCUMENTS' THEN
    UPDATE portal_applications
    SET status = 'PAY_APPLICATION_FEES', updated_at = NOW()
    WHERE id = v_app_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_required_doc_status_change ON application_required_documents;
CREATE TRIGGER on_required_doc_status_change
  AFTER UPDATE OF status ON application_required_documents
  FOR EACH ROW
  EXECUTE FUNCTION check_and_advance_application_status();

-- ─── 6. Seed default document types (optional) ────────────
INSERT INTO document_types (name, description, required) VALUES
  ('Passport', 'Data page of valid international passport', TRUE),
  ('Academic Transcript', 'Official transcripts from all attended institutions', TRUE),
  ('Statement of Purpose', 'Personal statement explaining study goals', TRUE),
  ('Reference Letter', 'Academic or professional reference letter', TRUE),
  ('English Test Result', 'IELTS, TOEFL, or equivalent English proficiency test', TRUE),
  ('CV / Resume', 'Up-to-date curriculum vitae or resume', FALSE),
  ('Bank Statement', 'Recent bank statement showing sufficient funds', FALSE)
ON CONFLICT DO NOTHING;
