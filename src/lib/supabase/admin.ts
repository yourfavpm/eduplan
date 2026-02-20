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
      supabase.from('portal_applications').select('id', { count: 'exact', head: true }).eq('status', 'PAY_APPLICATION_FEES'),
      supabase.from('portal_applications').select('id', { count: 'exact', head: true }).eq('status', 'PREPARE_FOR_INTERVIEW'),
      supabase.from('portal_applications').select('id', { count: 'exact', head: true }).eq('status', 'PROCESS_VISA'),
      supabase.from('portal_applications').select('id', { count: 'exact', head: true }),
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
      id, full_name, email, phone, location, created_at,
      portal_applications(id, status)
    `, { count: 'exact' })
    .eq('role', 'student')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, count } = await query

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const students: AdminStudent[] = (data ?? []).map((row: any) => {
    const apps = Array.isArray(row.portal_applications) ? row.portal_applications : []
    const latestApp = apps[0] ?? null
    return {
      id: row.id,
      full_name: row.full_name,
      email: row.email,
      phone: row.phone,
      location: row.location,
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

// ─── Applications (admin view) ────────────────────────────

export async function getApplicationDetails(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portal_applications')
    .select(`*, portal_profiles(full_name, email, phone)`)
    .eq('id', id)
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
