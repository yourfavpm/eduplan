-- Add new fields to portal_profiles for enhanced student management and profile details
ALTER TABLE portal_profiles
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female')),
ADD COLUMN IF NOT EXISTS highest_qualification TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Note: 'location' already exists in the table structure.
