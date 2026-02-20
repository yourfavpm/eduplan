import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getApplicationById } from '@/lib/supabase/portal'
import { getRequiredDocuments } from '@/lib/supabase/documents'
import { getApplicationStatusHistory } from '@/lib/supabase/portal'
import AppDetailClient from './AppDetailClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Application | EduPlan360' }

export default async function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ banner?: string }>
}) {
  const { id } = await params
  const { banner } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const app = await getApplicationById(id)
  if (!app || app.user_id !== user.id) redirect('/portal/applications')

  const [requiredDocs, statusHistory] = await Promise.all([
    getRequiredDocuments(id),
    getApplicationStatusHistory(id),
  ])

  return (
    <AppDetailClient
      app={app}
      requiredDocs={requiredDocs}
      statusHistory={statusHistory}
      userId={user.id}
      showCreatedBanner={banner === 'created'}
    />
  )
}
