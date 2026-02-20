'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  PortalProfile,
  PortalApplication,
  PortalDocument,
  PortalStatusHistory,
  ApplicationStatus,
} from '@/types/portal'

// ─── Profile ─────────────────────────────────────────────

export async function getPortalProfile(userId: string): Promise<PortalProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data as PortalProfile
}

export async function createPortalProfile(profile: {
  id: string
  full_name: string
  email: string
  phone?: string
  location?: string
}): Promise<PortalProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_profiles')
    .insert({
      id: profile.id,
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone ?? null,
      location: profile.location ?? null,
      role: 'student',
      profile_completed: false,
    })
    .select()
    .single()

  if (error) {
    console.error('createPortalProfile error:', error)
    return null
  }
  return data as PortalProfile
}

export async function updatePortalProfile(
  userId: string,
  updates: Partial<Omit<PortalProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('portal_profiles')
    .update(updates)
    .eq('id', userId)

  if (error) {
    console.error('updatePortalProfile error:', error)
    return false
  }
  return true
}

// ─── Application ──────────────────────────────────────────

export async function getPortalApplication(userId: string): Promise<PortalApplication | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) return null
  return data as PortalApplication
}

export async function upsertPortalApplication(
  userId: string,
  fields: {
    destination: string
    preferred_university?: string
    proposed_course_1: string
    proposed_course_2?: string
    highest_qualification: string
  },
  existingId?: string
): Promise<PortalApplication | null> {
  const supabase = await createClient()

  if (existingId) {
    const { data, error } = await supabase
      .from('portal_applications')
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq('id', existingId)
      .select()
      .single()
    if (error) {
      console.error('upsertPortalApplication update error:', error)
      return null
    }
    return data as PortalApplication
  }

  const { data, error } = await supabase
    .from('portal_applications')
    .insert({
      user_id: userId,
      ...fields,
      status: 'INCOMPLETE_DOCUMENTS' as ApplicationStatus,
    })
    .select()
    .single()

  if (error) {
    console.error('upsertPortalApplication insert error:', error)
    return null
  }

  // Record in status history
  await supabase.from('portal_status_history').insert({
    application_id: data.id,
    status: 'INCOMPLETE_DOCUMENTS',
    note: 'Application created',
    changed_by: userId,
  })

  return data as PortalApplication
}

// ─── Documents ───────────────────────────────────────────

export async function getPortalDocuments(userId: string): Promise<PortalDocument[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data ?? []) as PortalDocument[]
}

export async function insertPortalDocument(doc: {
  user_id: string
  application_id?: string
  doc_type: string
  file_name: string
  file_path: string
  file_size?: number
}): Promise<PortalDocument | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_documents')
    .insert({ ...doc, status: 'uploaded' })
    .select()
    .single()

  if (error) {
    console.error('insertPortalDocument error:', error)
    return null
  }
  return data as PortalDocument
}

// ─── Status History ───────────────────────────────────────

export async function getStatusHistory(applicationId: string): Promise<PortalStatusHistory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_status_history')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true })

  if (error) return []
  return (data ?? []) as PortalStatusHistory[]
}

export async function updateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus,
  note?: string,
  adminId?: string
): Promise<boolean> {
  const supabase = await createClient()

  const { error: updateErr } = await supabase
    .from('portal_applications')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', applicationId)

  if (updateErr) {
    console.error('updateApplicationStatus error:', updateErr)
    return false
  }

  await supabase.from('portal_status_history').insert({
    application_id: applicationId,
    status: newStatus,
    note: note ?? null,
    changed_by: adminId ?? null,
  })

  return true
}

// ─── Admin: list all applications ────────────────────────

export async function getAllApplicationsForAdmin(): Promise<
  (PortalApplication & { profile: PortalProfile })[]
> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portal_applications')
    .select(`*, profile:portal_profiles(*)`)
    .order('created_at', { ascending: false })

  if (error) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []) as any
}
