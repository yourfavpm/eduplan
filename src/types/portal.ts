// ============================================================
// EduPlan360 Portal Types
// ============================================================

export type ApplicationStatus =
  | "INCOMPLETE_DOCUMENTS"
  | "PAY_APPLICATION_FEES"
  | "APPLICATION_SUBMITTED"
  | "OFFER_SENT"
  | "PREPARE_FOR_INTERVIEW"
  | "PAY_TUITION_DEPOSIT"
  | "CAS_ISSUED"
  | "PROCESS_VISA";

export type DocumentStatus = "pending" | "uploaded" | "approved" | "rejected";
export type UserRole = "student" | "admin";

export interface PortalProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  role: UserRole;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortalApplication {
  id: string;
  user_id: string;
  destination: string | null;
  preferred_university: string | null;
  proposed_course_1: string | null;
  proposed_course_2: string | null;
  highest_qualification: string | null;
  status: ApplicationStatus;
  application_fee_paid: boolean;
  tuition_deposit_paid: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortalDocument {
  id: string;
  user_id: string;
  application_id: string | null;
  doc_type: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  status: DocumentStatus;
  created_at: string;
  updated_at: string;
}

export interface PortalStatusHistory {
  id: string;
  application_id: string;
  status: ApplicationStatus;
  note: string | null;
  changed_by: string | null;
  created_at: string;
}

// ─── Status Stepper Config ────────────────────────────────

export const APPLICATION_STATUSES: {
  value: ApplicationStatus;
  label: string;
}[] = [
  { value: "INCOMPLETE_DOCUMENTS", label: "Documents" },
  { value: "PAY_APPLICATION_FEES", label: "Application Fee" },
  { value: "APPLICATION_SUBMITTED", label: "Submitted" },
  { value: "OFFER_SENT", label: "Offer Received" },
  { value: "PREPARE_FOR_INTERVIEW", label: "Interview Prep" },
  { value: "PAY_TUITION_DEPOSIT", label: "Tuition Deposit" },
  { value: "CAS_ISSUED", label: "CAS Issued" },
  { value: "PROCESS_VISA", label: "Visa" },
];

export function getStatusIndex(status: ApplicationStatus): number {
  return APPLICATION_STATUSES.findIndex((s) => s.value === status);
}

export function isStatusComplete(
  current: ApplicationStatus,
  check: ApplicationStatus,
): boolean {
  return getStatusIndex(current) > getStatusIndex(check);
}

export function isStatusCurrent(
  current: ApplicationStatus,
  check: ApplicationStatus,
): boolean {
  return current === check;
}

// ─── Doc Type Labels ──────────────────────────────────────

export const DOC_TYPE_LABELS: Record<string, string> = {
  passport: "Passport",
  transcript: "Academic Transcript",
  sop: "Statement of Purpose",
  reference_letter: "Reference Letter",
  cv: "CV / Resume",
  english_test: "English Test Result",
  other: "Other Document",
};

export const DOC_TYPES = Object.keys(DOC_TYPE_LABELS) as string[];
