-- Users table (extends NextAuth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'student', -- student, associate, admin
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student profiles
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  nationality VARCHAR(100),
  passport_number VARCHAR(100),
  education_level VARCHAR(100),
  field_of_interest VARCHAR(255),
  preferred_countries TEXT[], -- Array of country codes
  budget_range VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  university_name VARCHAR(255) NOT NULL,
  program_name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  intake VARCHAR(50), -- e.g., "Fall 2024"
  status VARCHAR(50) DEFAULT 'draft', -- draft, submitted, under_review, accepted, rejected
  application_date TIMESTAMP WITH TIME ZONE,
  decision_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL, -- passport, transcript, cv, sop, lor, etc.
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL, -- Supabase Storage path
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country_of_interest VARCHAR(100),
  study_level VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, scheduled, completed
  preferred_date DATE,
  preferred_time VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Associate applications
CREATE TABLE IF NOT EXISTS associate_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  experience TEXT,
  why_join TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewing, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scholarships (managed via CMS but cached here)
CREATE TABLE IF NOT EXISTS scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sanity_id VARCHAR(100) UNIQUE,
  title VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  university VARCHAR(255),
  level VARCHAR(100), -- undergraduate, masters, phd
  funding_type VARCHAR(100), -- full, partial
  deadline DATE,
  amount VARCHAR(100),
  eligibility TEXT,
  link VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_scholarships_country ON scholarships(country);
CREATE INDEX idx_scholarships_deadline ON scholarships(deadline);
