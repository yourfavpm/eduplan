-- ============================================================
-- Fix Admin Policies (Schema Prefixing)
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- Fix is_admin to heavily explicitly map schema and search paths
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.portal_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- Fix Storage Dashboard Access Policies
DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM public.portal_profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Ensure Admins have perfect access recursively across document relations via public schema scope
DROP POLICY IF EXISTS "Admins can update required documents" ON application_required_documents;
CREATE POLICY "Admins can update required documents"
  ON application_required_documents FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update all documents" ON documents;
CREATE POLICY "Admins can update all documents"
  ON documents FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
