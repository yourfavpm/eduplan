import { createClient } from '@/lib/supabase/server'
import ServicesClient from './ServicesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Services | Admin — EduPlan360' }

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
  return <ServicesClient initialItems={data ?? []} />
}
