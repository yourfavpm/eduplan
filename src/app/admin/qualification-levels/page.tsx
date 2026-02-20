import { createClient } from '@/lib/supabase/server'
import QualificationLevelsClient from './QualificationLevelsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Qualification Levels | Admin — EduPlan360' }

export default async function QualificationLevelsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('qualification_levels').select('*').order('sort_order')
  return <QualificationLevelsClient initialLevels={data ?? []} />
}
