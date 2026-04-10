-- Add new columns to universities table for detail view
-- Run this in the Supabase SQL Editor

ALTER TABLE universities ADD COLUMN IF NOT EXISTS ranking text;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS student_population text;

-- Create university_applications table
CREATE TABLE IF NOT EXISTS university_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id uuid REFERENCES universities(id) ON DELETE SET NULL,
  university_name text,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  highest_qualification text,
  gender text,
  country_of_birth text,
  city_of_residence text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE university_applications ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form)
CREATE POLICY "Allow public inserts on university_applications"
  ON university_applications FOR INSERT
  WITH CHECK (true);

-- Allow admin reads
CREATE POLICY "Allow admin reads on university_applications"
  ON university_applications FOR SELECT
  USING (true);
