-- ============================================================
-- Fix RLS policies for document updates
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

DROP POLICY IF EXISTS "Students can update own required document status" ON application_required_documents;
CREATE POLICY "Students can update own required document status"
  ON application_required_documents FOR UPDATE
  USING (
    application_id IN (
      SELECT id FROM applications WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    application_id IN (
      SELECT id FROM applications WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Students can update applications" ON applications;
CREATE POLICY "Students can update applications"
  ON applications FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
