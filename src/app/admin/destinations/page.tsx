import { createClient } from '@/lib/supabase/server'
import DestinationsClient from './DestinationsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Destinations | Admin — EduPlan360' }

export default async function DestinationsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('destinations').select('*').order('sort_order', { ascending: true })
  return <DestinationsClient initialItems={data ?? []} />
}
