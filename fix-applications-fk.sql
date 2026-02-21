-- Run this in the Supabase SQL Editor to fix the foreign keys pointing to the wrong table.

-- Drop the old constraints that reference portal_applications
ALTER TABLE application_required_documents DROP CONSTRAINT IF EXISTS application_required_documents_application_id_fkey;
ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_application_id_fkey;
ALTER TABLE admin_notes DROP CONSTRAINT IF EXISTS admin_notes_application_id_fkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_application_id_fkey;

-- Add the new constraints that reference the new multi-app 'applications' table
ALTER TABLE application_required_documents ADD CONSTRAINT application_required_documents_application_id_fkey FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;
ALTER TABLE documents ADD CONSTRAINT documents_application_id_fkey FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE SET NULL;
ALTER TABLE admin_notes ADD CONSTRAINT admin_notes_application_id_fkey FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;
ALTER TABLE payments ADD CONSTRAINT payments_application_id_fkey FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE SET NULL;

-- Fix the trigger we updated earlier to make sure it's applied correctly
CREATE OR REPLACE FUNCTION auto_populate_required_documents()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.qualification_level_id IS NOT NULL THEN
    INSERT INTO application_required_documents (application_id, document_type_id, status)
    SELECT
      NEW.id,
      qmd.document_type_id,
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
