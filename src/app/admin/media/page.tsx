import { createClient } from '@/lib/supabase/server'
import MediaClient from './MediaClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Media Library | Admin — EduPlan360' }

export default async function MediaPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false })
  return <MediaClient initialAssets={data ?? []} />
}
