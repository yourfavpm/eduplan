-- ============================================================
-- SQL RPC Function to safely mark documents as uploaded
-- Bypasses stubborn RLS update locks securely
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- First, fix the underlying table to prevent the `handle_updated_at` trigger from crashing!
ALTER TABLE application_required_documents ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Now create the RPC to handle student uploads securely with elevated privileges
CREATE OR REPLACE FUNCTION mark_document_uploaded(p_req_doc_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Verify the currently authenticated user owns the parent application
  SELECT a.user_id INTO v_user_id
  FROM application_required_documents ard
  JOIN applications a ON a.id = ard.application_id
  WHERE ard.id = p_req_doc_id;

  IF v_user_id != auth.uid() THEN
    RETURN FALSE; -- They do not own this application
  END IF;

  -- Proceed with the status update using Admin elevated privileges
  UPDATE application_required_documents
  SET status = 'uploaded', rejection_reason = NULL, updated_at = NOW()
  WHERE id = p_req_doc_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
