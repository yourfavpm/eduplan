import { createClient } from '@/lib/supabase/server'
import HomepageClient from './HomepageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Homepage | Admin — EduPlan360' }

export default async function HomepagePage() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')

  const settingsMap: Record<string, unknown> = {}
  ;(data ?? []).forEach(row => { settingsMap[row.key] = row.value })

  return <HomepageClient settings={settingsMap} />
}
