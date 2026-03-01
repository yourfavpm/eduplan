import { createClient } from '@/lib/supabase/server'
import ResourcesClient from './ResourcesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Resource Guide | Admin — EduPlan360' }

export default async function ResourcesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')

  const settingsMap: Record<string, unknown> = {}
  ;(data ?? []).forEach(row => { settingsMap[row.key] = row.value })

  return <ResourcesClient settings={settingsMap} />
}
