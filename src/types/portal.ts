// ============================================================
// EduPlan360 Portal Types — Multi-Application Model
// ============================================================

export type ApplicationStatus =
  | 'INCOMPLETE_DOCUMENTS'
  | 'PAY_APPLICATION_FEES'
  | 'APPLICATION_SUBMITTED'
  | 'OFFER_SENT'
  | 'PREPARE_FOR_INTERVIEW'
  | 'PAY_TUITION_DEPOSIT'
  | 'CAS_ISSUED'
  | 'PROCESS_VISA'

export type DocumentStatus = 'pending' | 'uploaded' | 'approved' | 'rejected'
export type RequiredDocSource = 'auto_qualification' | 'manual_admin'
export type UserRole = 'student' | 'admin'

// ─── Profile ─────────────────────────────────────────────

export interface PortalProfile {
  id: string
  full_name: string
  email: string
  phone: string | null
  location: string | null
  role: UserRole
  profile_completed: boolean
  created_at: string
  updated_at: string
}

// ─── Qualification ────────────────────────────────────────

export interface QualificationLevel {
  id: string
  name: string
  description: string | null
  sort_order: number
  created_at: string
}

export interface QualificationMandatoryDoc {
  id: string
  qualification_level_id: string
  document_type_id: string
  is_required: boolean
  created_at: string
}

// ─── Application (multi-app) ────────────────────────────

export interface Application {
  id: string
  user_id: string
  title: string | null
  study_destination: string
  qualification_level_id: string | null
  status: ApplicationStatus
  application_fee_paid: boolean
  tuition_deposit_paid: boolean
  created_at: string
  updated_at: string
  // Joined (optional, from query)
  qualification_level?: QualificationLevel | null
  university_choices?: UniversityChoice[]
  // Computed stats (from query)
  required_docs_total?: number
  required_docs_done?: number
}

// ─── University & Course Choices ─────────────────────────

export interface CourseChoice {
  id: string
  university_choice_id: string
  course_name: string
  priority: 1 | 2
  created_at: string
}

export interface UniversityChoice {
  id: string
  application_id: string
  university_name: string
  university_country: string | null
  priority: 1 | 2 | 3
  created_at: string
  course_choices?: CourseChoice[]
}

// ─── Document Types ───────────────────────────────────────

export interface DocumentType {
  id: string
  name: string
  description: string | null
  required: boolean
  created_at: string
}

// ─── Required Documents (per application) ─────────────────

export type RequiredDocStatus = 'pending' | 'uploaded' | 'approved' | 'rejected'

export interface RequiredDocument {
  id: string
  application_id: string
  document_type_id: string
  source: RequiredDocSource
  status: RequiredDocStatus
  rejection_reason: string | null
  created_at: string
  updated_at: string
  document_type: DocumentType
  latest_upload: UploadedDocument | null
}

// ─── Uploaded Document ────────────────────────────────────

export interface UploadedDocument {
  id: string
  user_id: string
  application_id: string | null
  document_type_id: string
  required_document_id: string | null
  file_path: string
  original_filename: string
  file_size: number | null
  status: 'uploaded' | 'approved' | 'rejected'
  rejection_reason: string | null
  created_at: string
}

// ─── Admin Review Queue ───────────────────────────────────

export interface DocumentReviewRow {
  id: string
  required_document_id: string | null
  file_path: string
  original_filename: string
  status: 'uploaded' | 'approved' | 'rejected'
  rejection_reason: string | null
  created_at: string
  source: RequiredDocSource | null
  document_type: DocumentType
  profile: { full_name: string; email: string } | null
  application: { id: string; study_destination: string | null; title: string | null } | null
}

// ─── Status History ───────────────────────────────────────

export interface StatusHistoryEntry {
  id: string
  application_id: string
  status: ApplicationStatus
  note: string | null
  actor_admin_id: string | null
  created_at: string
  actor?: { full_name: string } | null
}

// ─── Status Stepper Config ────────────────────────────────

export const APPLICATION_STATUSES: { value: ApplicationStatus; label: string; shortLabel: string }[] = [
  { value: 'INCOMPLETE_DOCUMENTS',  label: 'Upload Documents',   shortLabel: 'Documents' },
  { value: 'PAY_APPLICATION_FEES',  label: 'Application Fee',    shortLabel: 'App Fee' },
  { value: 'APPLICATION_SUBMITTED', label: 'Under Review',       shortLabel: 'Submitted' },
  { value: 'OFFER_SENT',            label: 'Offer Received',      shortLabel: 'Offer' },
  { value: 'PREPARE_FOR_INTERVIEW', label: 'Interview Prep',      shortLabel: 'Interview' },
  { value: 'PAY_TUITION_DEPOSIT',   label: 'Tuition Deposit',    shortLabel: 'Deposit' },
  { value: 'CAS_ISSUED',            label: 'CAS Issued',          shortLabel: 'CAS' },
  { value: 'PROCESS_VISA',          label: 'Visa Application',   shortLabel: 'Visa' },
]

export function getStatusIndex(status: ApplicationStatus): number {
  return APPLICATION_STATUSES.findIndex(s => s.value === status)
}

export function getStatusLabel(status: ApplicationStatus): string {
  return APPLICATION_STATUSES.find(s => s.value === status)?.label ?? status
}

export function getStatusProgression(status: ApplicationStatus): number {
  const idx = getStatusIndex(status)
  return Math.round(((idx + 1) / APPLICATION_STATUSES.length) * 100)
}

/** Returns a one-liner "next action" text for a given application. */
export function getNextAction(app: {
  status: ApplicationStatus
  required_docs_total?: number
  required_docs_done?: number
}): string {
  const { status, required_docs_total = 0, required_docs_done = 0 } = app
  if (status === 'INCOMPLETE_DOCUMENTS') {
    if (required_docs_total > 0 && required_docs_done < required_docs_total)
      return `Upload documents — ${required_docs_done}/${required_docs_total} ready`
    return 'Complete document uploads'
  }
  if (status === 'PAY_APPLICATION_FEES') return 'Pay your application fee'
  if (status === 'APPLICATION_SUBMITTED') return 'Application under review — sit tight'
  if (status === 'OFFER_SENT') return 'Review your offer letter'
  if (status === 'PREPARE_FOR_INTERVIEW') return 'Prepare for your university interview'
  if (status === 'PAY_TUITION_DEPOSIT') return 'Pay your tuition deposit'
  if (status === 'CAS_ISSUED') return 'Your CAS has been issued — apply for visa'
  if (status === 'PROCESS_VISA') return 'Submit your visa application'
  return ''
}

// ─── Legacy compat (kept to avoid breaking existing imports) ─

/** @deprecated Use Application */
export type PortalApplication = Application

export const DOC_TYPE_LABELS: Record<string, string> = {
  passport: 'Passport',
  transcript: 'Academic Transcript',
  sop: 'Statement of Purpose',
  reference_letter: 'Reference Letter',
  cv: 'CV / Resume',
  english_test: 'English Test Result',
  other: 'Other Document',
}
