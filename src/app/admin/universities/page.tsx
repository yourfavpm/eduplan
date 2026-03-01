import { createClient } from '@/lib/supabase/server'
import UniversitiesClient from './UniversitiesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Universities | Admin — EduPlan360' }

export default async function UniversitiesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('universities').select('*').order('created_at', { ascending: false })

  return <UniversitiesClient initialItems={data ?? []} />
}
