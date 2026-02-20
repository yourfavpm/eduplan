import { createClient } from '@/lib/supabase/server'
import EventsClient from './EventsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Events | Admin — EduPlan360' }

export default async function EventsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false })
  return <EventsClient initialItems={data ?? []} />
}
