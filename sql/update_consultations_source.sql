-- Update consultations table to add source column
ALTER TABLE public.consultations ADD COLUMN IF NOT EXISTS source TEXT;
