import { createClient } from '@/lib/supabase/server'
import BlogClient from './BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog | Admin — EduPlan360' }

export default async function BlogPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
  return <BlogClient initialItems={data ?? []} />
}
