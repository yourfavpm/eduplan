import { createClient } from '@/lib/supabase/server'
import AboutClient from './AboutClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Page | Admin — EduPlan360' }

export default async function AboutPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')

  const settingsMap: Record<string, unknown> = {}
  ;(data ?? []).forEach(row => { settingsMap[row.key] = row.value })

  return <AboutClient settings={settingsMap} />
}
