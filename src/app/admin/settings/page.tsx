import { createClient } from '@/lib/supabase/server'
import SettingsClient from './SettingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings | Admin — EduPlan360' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')
  const map: Record<string, unknown> = {}
  ;(data ?? []).forEach(row => { map[row.key] = row.value })
  return <SettingsClient settings={map} />
}
