-- ============================================================
-- EduPlan360 — Notifications Schema
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS portal_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES portal_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portal_notifications ENABLE ROW LEVEL SECURITY;

-- Students can view their own notifications
DROP POLICY IF EXISTS "Students can view own notifications" ON portal_notifications;
CREATE POLICY "Students can view own notifications"
  ON portal_notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Students can update their own notifications (e.g., mark as read)
DROP POLICY IF EXISTS "Students can update own notifications" ON portal_notifications;
CREATE POLICY "Students can update own notifications"
  ON portal_notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all notifications
DROP POLICY IF EXISTS "Admins can view all notifications" ON portal_notifications;
CREATE POLICY "Admins can view all notifications"
  ON portal_notifications FOR SELECT
  USING (public.is_admin());

-- Admins can insert new notifications
DROP POLICY IF EXISTS "Admins can insert notifications" ON portal_notifications;
CREATE POLICY "Admins can insert notifications"
  ON portal_notifications FOR INSERT
  WITH CHECK (public.is_admin());

-- Admins can update/delete if they make a mistake
DROP POLICY IF EXISTS "Admins can update notifications" ON portal_notifications;
CREATE POLICY "Admins can update notifications"
  ON portal_notifications FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete notifications" ON portal_notifications;
CREATE POLICY "Admins can delete notifications"
  ON portal_notifications FOR DELETE
  USING (public.is_admin());

-- Create an index to quickly fetch unread notifications for the dashboard
CREATE INDEX IF NOT EXISTS idx_portal_notifications_user_id_is_read ON portal_notifications(user_id, is_read);
