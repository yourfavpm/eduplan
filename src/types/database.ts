export interface User {
    id: string
    email: string
    name?: string
    phone?: string
    role: 'student' | 'associate' | 'admin'
    created_at: string
    updated_at: string
}

export interface StudentProfile {
    id: string
    user_id: string
    date_of_birth?: string
    nationality?: string
    passport_number?: string
    education_level?: string
    field_of_interest?: string
    preferred_countries?: string[]
    budget_range?: string
    created_at: string
    updated_at: string
}

export interface Application {
    id: string
    user_id: string
    university_name: string
    program_name: string
    country: string
    intake?: string
    status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
    application_date?: string
    decision_date?: string
    notes?: string
    created_at: string
    updated_at: string
}

export interface Document {
    id: string
    application_id: string
    user_id: string
    document_type: string
    file_name: string
    file_path: string
    file_size?: number
    uploaded_at: string
}

export interface Consultation {
    id: string
    name: string
    email: string
    phone?: string
    country_of_interest?: string
    study_level?: string
    message?: string
    status: 'pending' | 'contacted' | 'scheduled' | 'completed'
    preferred_date?: string
    preferred_time?: string
    created_at: string
}

export interface AssociateApplication {
    id: string
    name: string
    email: string
    phone: string
    location?: string
    experience?: string
    why_join?: string
    status: 'pending' | 'reviewing' | 'approved' | 'rejected'
    created_at: string
}

export interface Scholarship {
    id: string
    sanity_id?: string
    title: string
    country?: string
    university?: string
    level?: string
    funding_type?: string
    deadline?: string
    amount?: string
    eligibility?: string
    link?: string
    created_at: string
    updated_at: string
}
