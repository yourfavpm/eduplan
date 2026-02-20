import { createClient } from '@/lib/supabase/server'
import AssociatesClient from './AssociatesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Associates | Admin — EduPlan360' }

export default async function AssociatesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('associates').select('*').order('name', { ascending: true })
  return <AssociatesClient initialItems={data ?? []} />
}
