-- ============================================================
-- Supabase Storage Setup for EduPlan Documents
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT DO NOTHING;


-- 3. Policy: Students can upload their own documents
DROP POLICY IF EXISTS "Students can upload own documents" ON storage.objects;
CREATE POLICY "Students can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

-- 3b. Policy: Students can update their own documents (required for upsert)
DROP POLICY IF EXISTS "Students can update own documents" ON storage.objects;
CREATE POLICY "Students can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

-- 3c. Policy: Students can delete their own documents
DROP POLICY IF EXISTS "Students can delete own documents" ON storage.objects;
CREATE POLICY "Students can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

-- 4. Policy: Students can view their own documents
DROP POLICY IF EXISTS "Students can view own documents" ON storage.objects;
CREATE POLICY "Students can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[2] = auth.uid()::text
);

-- 5. Policy: Admins can view all documents
-- Assuming you have an 'is_admin()' function or similar. 
-- For simplicity, if your portal_profiles role='admin', you can do:
DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM portal_profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);
