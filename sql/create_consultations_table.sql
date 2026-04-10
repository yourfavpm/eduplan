-- Create consultations table
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    study_level TEXT,
    country_of_interest TEXT,
    preferred_date DATE,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'closed')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Allow public to insert
CREATE POLICY "Allow public inserts" ON public.consultations
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to select/update/delete
CREATE POLICY "Allow admin all" ON public.consultations
    FOR ALL USING (auth.role() = 'authenticated');

-- Trigger for updated_at if needed (optional)
