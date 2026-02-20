import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getQualificationLevels } from '@/lib/supabase/portal'
import NewApplicationWizard from './NewApplicationWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New Application | EduPlan360' }

export default async function NewApplicationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const qualificationLevels = await getQualificationLevels()

  return <NewApplicationWizard qualificationLevels={qualificationLevels} userId={user.id} />
}
