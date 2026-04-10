-- Add new columns to scholarships table for type, eligibility
-- Run this in the Supabase SQL Editor

ALTER TABLE scholarships ADD COLUMN IF NOT EXISTS type text DEFAULT 'full';
ALTER TABLE scholarships ADD COLUMN IF NOT EXISTS eligibility text;

-- Create scholarship_inquiries table
CREATE TABLE IF NOT EXISTS scholarship_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  scholarship_id uuid REFERENCES scholarships(id) ON DELETE SET NULL,
  scholarship_title text,
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
ALTER TABLE scholarship_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form)
CREATE POLICY "Allow public inserts on scholarship_inquiries"
  ON scholarship_inquiries FOR INSERT
  WITH CHECK (true);

-- Allow admin reads
CREATE POLICY "Allow admin reads on scholarship_inquiries"
  ON scholarship_inquiries FOR SELECT
  USING (true);
