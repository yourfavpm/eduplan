import { createClient } from '@/lib/supabase/server'
import ScholarshipsClient from './ScholarshipsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Scholarships | Admin — EduPlan360' }

export default async function ScholarshipsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('scholarships').select('*').order('created_at', { ascending: false })
  return <ScholarshipsClient initialItems={data ?? []} />
}
