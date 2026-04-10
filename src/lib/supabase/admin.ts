'use server'

import { createClient } from '@/lib/supabase/server'
import type { ApplicationStatus } from '@/types/portal'

// ─── Overview Stats ────────────────────────────────────────

export async function getOverviewStats() {
  const supabase = await createClient()
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [signups, docsReview, unpaidFees, interviewPrep, visaProcessing, totalApps] =
    await Promise.all([
      supabase.from('portal_profiles').select('id', { count: 'exact', head: true }).eq('role', 'student').gte('created_at', sevenDaysAgo),
      supabase.from('application_required_documents').select('id', { count: 'exact', head: true }).eq('status', 'uploaded'),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'PAY_APPLICATION_FEES'),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'PREPARE_FOR_INTERVIEW'),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'PROCESS_VISA'),
      supabase.from('applications').select('id', { count: 'exact', head: true }),
    ])

  return {
    newSignups: signups.count ?? 0,
    docsNeedingReview: docsReview.count ?? 0,
    unpaidApplicationFees: unpaidFees.count ?? 0,
    interviewPrep: interviewPrep.count ?? 0,
    visaProcessing: visaProcessing.count ?? 0,
    totalApplications: totalApps.count ?? 0,
  }
}

// ─── Students ─────────────────────────────────────────────

export interface AdminStudent {
  id: string
  full_name: string
  email: string
  phone: string | null
  location: string | null
  gender: 'male' | 'female' | null
  highest_qualification: string | null
  status: 'active' | 'suspended'
  created_at: string
  applicationStatus: ApplicationStatus | null
  applicationId: string | null
}

export async function getStudents(filters?: {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<{ students: AdminStudent[]; total: number }> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 25
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('portal_profiles')
    .select(`
      id, full_name, email, phone, location, gender, highest_qualification, status, created_at,
      applications(id, status)
    `, { count: 'exact' })
    .eq('role', 'student')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, count } = await query

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const students: AdminStudent[] = (data ?? []).map((row: any) => {
    const apps = Array.isArray(row.applications) ? row.applications : []
    const latestApp = apps[0] ?? null
    return {
      id: row.id,
      full_name: row.full_name,
      email: row.email,
      phone: row.phone,
      location: row.location,
      gender: row.gender,
      highest_qualification: row.highest_qualification,
      status: row.status ?? 'active',
      created_at: row.created_at,
      applicationStatus: latestApp?.status ?? null,
      applicationId: latestApp?.id ?? null,
    }
  })

  return { students, total: count ?? 0 }
}

export async function getStudentById(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portal_profiles')
    .select('*')
    .eq('id', id)
    .single()
  return data
}

// ─── Student Management ───────────────────────────────────

export async function suspendStudent(userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('portal_profiles')
    .update({ status: 'suspended' })
    .eq('id', userId)
  return { success: !error, error }
}

export async function reactivateStudent(userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('portal_profiles')
    .update({ status: 'active' })
    .eq('id', userId)
  return { success: !error, error }
}

export async function softDeleteStudent(userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('portal_profiles')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', userId)
  return { success: !error, error }
}

// ─── Applications (admin view) ────────────────────────────

export async function getApplicationDetails(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('applications')
    .select(`
      *,
      portal_profiles(full_name, email, phone, location),
      qualification_level:qualification_levels(*),
      application_university_choices(
        *, university_course_choices(*)
      )
    `)
    .eq('id', id)
    .single()
  return data
}

export async function getStudentLatestApplication(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('applications')
    .select(`
      *,
      portal_profiles(full_name, email, phone, location),
      qualification_level:qualification_levels(*),
      application_university_choices(
        *, university_course_choices(*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return data
}

export async function getApplicationStatusHistory(applicationId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portal_status_history')
    .select(`*, portal_profiles(full_name)`)
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getAdminNotes(applicationId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('admin_notes')
    .select(`*, portal_profiles(full_name)`)
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })
  return data ?? []
}

// ─── Payments ─────────────────────────────────────────────

export interface AdminPayment {
  id: string
  user_id: string
  application_id: string | null
  type: string
  amount: number | null
  currency: string
  status: string
  reference: string | null
  created_at: string
  profile: { full_name: string; email: string } | null
}

export async function getPayments(filter?: string): Promise<AdminPayment[]> {
  const supabase = await createClient()
  let query = supabase
    .from('payments')
    .select(`*, portal_profiles(full_name, email)`)
    .order('created_at', { ascending: false })

  if (filter && filter !== 'all') {
    query = query.eq('status', filter)
  }

  const { data } = await query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => ({
    ...row,
    profile: Array.isArray(row.portal_profiles) ? row.portal_profiles[0] : row.portal_profiles,
  }))
}

// ─── Consultations ────────────────────────────────────────

export interface AdminConsultation {
  id: string
  full_name: string
  email: string
  phone: string
  study_level: string | null
  country_of_interest: string | null
  preferred_date: string | null
  message: string | null
  source: string | null
  status: 'pending' | 'contacted' | 'booked' | 'closed'
  created_at: string
}

export async function getConsultations(filters?: {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<{ consultations: AdminConsultation[]; total: number }> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 25
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('consultations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, count, error } = await query
  if (error) {
    console.error('getConsultations error:', error)
    return { consultations: [], total: 0 }
  }

  return { consultations: (data ?? []) as AdminConsultation[], total: count ?? 0 }
}

export async function updateConsultationStatus(id: string, status: AdminConsultation['status']) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('consultations')
    .update({ status })
    .eq('id', id)
  return { success: !error, error }
}

// ─── Associate Requests ───────────────────────────────────

export interface AdminAssociateRequest {
  id: string
  full_name: string
  email: string
  phone: string
  occupation: string | null
  city: string | null
  country: string | null
  gender: string | null
  qualification: string | null
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  created_at: string
}

export async function getAssociateRequests(filters?: {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<{ requests: AdminAssociateRequest[]; total: number }> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 25
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('associate_requests')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, count, error } = await query
  if (error) {
    console.error('getAssociateRequests error:', error)
    return { requests: [], total: 0 }
  }

  return { requests: (data ?? []) as AdminAssociateRequest[], total: count ?? 0 }
}

export async function updateAssociateStatus(id: string, status: AdminAssociateRequest['status']) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('associate_requests')
    .update({ status })
    .eq('id', id)
  return { success: !error, error }
}

// ─── Partner Requests ─────────────────────────────────────

export interface AdminPartnerRequest {
  id: string
  full_name: string
  email: string
  phone: string
  organization_name: string
  organization_type: string | null
  role: string | null
  country: string | null
  message: string | null
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  created_at: string
}

export async function getPartnerRequests(filters?: {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<{ requests: AdminPartnerRequest[]; total: number }> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 25
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('partner_requests')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`organization_name.ilike.%${filters.search}%,full_name.ilike.%${filters.search}%`)
  }

  const { data, count, error } = await query
  if (error) {
    console.error('getPartnerRequests error:', error)
    return { requests: [], total: 0 }
  }

  return { requests: (data ?? []) as AdminPartnerRequest[], total: count ?? 0 }
}

export async function updatePartnerStatus(id: string, status: AdminPartnerRequest['status']) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('partner_requests')
    .update({ status })
    .eq('id', id)
  return { success: !error, error }
}

// --- Public CMS Data Fetches ---

export interface PublicUniversity {
  id: string
  name: string
  slug: string
  country: string
  location: string | null
  logo_url: string | null
  website_url: string | null
  description: string | null
  admission_requirements: string | null
  ranking: string | null
  student_population: string | null
  courses: Array<{ name: string; level: string; duration: string; fees?: string }>
  intakes: string[]
  featured: boolean
}

export interface PublicScholarship {
  id: string
  title: string
  country: string | null
  level: string | null
  type: string | null
  deadline: string | null
  description: string | null
  eligibility: string | null
  link: string | null
  featured: boolean
}

export async function getPublicUniversitiesByCountry(countrySlug: string): Promise<PublicUniversity[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .eq('published', true)
    .ilike('country', countrySlug)
    .order('featured', { ascending: false })
    .order('name', { ascending: true })

  if (error) {
    console.error('getPublicUniversitiesByCountry error:', error)
    return []
  }

  return data as PublicUniversity[]
}

export async function getPublicScholarshipsByCountry(countrySlug: string): Promise<PublicScholarship[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('published', true)
    .ilike('country', countrySlug)
    .order('featured', { ascending: false })
    .order('title', { ascending: true })

  if (error) {
    console.error('getPublicScholarshipsByCountry error:', error)
    return []
  }

  return data as PublicScholarship[]
}
