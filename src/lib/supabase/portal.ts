'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  PortalProfile,
  Application,
  UniversityChoice,
  CourseChoice,
  QualificationLevel,
  ApplicationStatus,
} from '@/types/portal'

// ─── Profile ─────────────────────────────────────────────

export async function getPortalProfile(userId: string): Promise<PortalProfile | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('portal_profiles').select('*').eq('id', userId).single()
  return data as PortalProfile | null
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
  if (error) { console.error('createPortalProfile:', error); return null }
  return data as PortalProfile
}

export async function updatePortalProfile(
  userId: string,
  updates: Partial<Omit<PortalProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('portal_profiles').update(updates).eq('id', userId)
  if (error) { console.error('updatePortalProfile:', error); return false }
  return true
}

// ─── Qualification Levels ─────────────────────────────────

export async function getQualificationLevels(): Promise<QualificationLevel[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('qualification_levels').select('*').order('sort_order')
  return (data ?? []) as QualificationLevel[]
}

// ─── Applications (multi-app) ────────────────────────────

export async function getUserApplications(userId: string): Promise<Application[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('applications')
    .select(`
      *,
      qualification_level:qualification_levels(*),
      application_university_choices(
        *, university_course_choices(*)
      ),
      application_required_documents(id, status)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (!data) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((row: any) => {
    const reqDocs = row.application_required_documents ?? []
    const done = reqDocs.filter((d: { status: string }) => d.status === 'approved' || d.status === 'uploaded').length
    return {
      ...row,
      qualification_level: Array.isArray(row.qualification_level) ? row.qualification_level[0] : row.qualification_level,
      university_choices: (row.application_university_choices ?? []).map((uc: UniversityChoice & { university_course_choices?: CourseChoice[] }) => ({
        ...uc,
        course_choices: uc.university_course_choices ?? [],
      })).sort((a: UniversityChoice, b: UniversityChoice) => a.priority - b.priority),
      required_docs_total: reqDocs.length,
      required_docs_done: done,
    } as Application
  })
}

export async function getApplicationById(id: string): Promise<Application | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('applications')
    .select(`
      *,
      qualification_level:qualification_levels(*),
      application_university_choices(
        *, university_course_choices(*)
      ),
      application_required_documents(id, status)
    `)
    .eq('id', id)
    .single()

  if (!data) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any
  const reqDocs = row.application_required_documents ?? []
  return {
    ...row,
    qualification_level: Array.isArray(row.qualification_level) ? row.qualification_level[0] : row.qualification_level,
    university_choices: (row.application_university_choices ?? []).map((uc: UniversityChoice & { university_course_choices?: CourseChoice[] }) => ({
      ...uc,
      course_choices: (uc.university_course_choices ?? []).sort((a: CourseChoice, b: CourseChoice) => a.priority - b.priority),
    })).sort((a: UniversityChoice, b: UniversityChoice) => a.priority - b.priority),
    required_docs_total: reqDocs.length,
    required_docs_done: reqDocs.filter((d: { status: string }) => d.status === 'approved' || d.status === 'uploaded').length,
  } as Application
}

export interface CreateApplicationInput {
  userId: string
  title?: string
  study_destination: string
  intake_season?: string
  intake_year?: string
  qualification_level_id: string
  universities: {
    university_name: string
    university_country?: string
    courses: string[]
  }[]
}

export async function createApplication(input: CreateApplicationInput): Promise<Application | null> {
  const supabase = await createClient()

  // Insert application — the DB trigger auto-populates required_documents
  const { data: app, error: appError } = await supabase
    .from('applications')
    .insert({
      user_id: input.userId,
      title: input.title?.trim() || null,
      study_destination: input.study_destination,
      intake_season: input.intake_season ?? null,
      intake_year: input.intake_year ?? null,
      qualification_level_id: input.qualification_level_id,
      status: 'INCOMPLETE_DOCUMENTS',
    })
    .select()
    .single()

  if (appError || !app) { console.error('createApplication:', appError); return null }

  // Insert university choices + courses
  for (let i = 0; i < Math.min(input.universities.length, 3); i++) {
    const { university_name, university_country, courses } = input.universities[i]
    const { data: uniChoice, error: uniError } = await supabase
      .from('application_university_choices')
      .insert({
        application_id: app.id,
        university_name,
        university_country: university_country ?? null,
        priority: (i + 1) as 1 | 2 | 3,
      })
      .select()
      .single()

    if (uniError || !uniChoice) { console.error('createApplication uni choice:', uniError); continue }

    for (let j = 0; j < Math.min(courses.length, 2); j++) {
      if (!courses[j]?.trim()) continue
      await supabase.from('university_course_choices').insert({
        university_choice_id: uniChoice.id,
        course_name: courses[j].trim(),
        priority: (j + 1) as 1 | 2,
      })
    }
  }

  return getApplicationById(app.id)
}

// ─── Status History ───────────────────────────────────────

export async function getApplicationStatusHistory(applicationId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('status_history')
    .select(`*, actor:portal_profiles(full_name)`)
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })
  return data ?? []
}
