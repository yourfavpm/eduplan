import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPortalProfile, getPortalApplication } from '@/lib/supabase/portal'
import ProfileCompleteForm from '@/components/portal/ProfileCompleteForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Profile | Student Portal — EduPlan360',
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const [profile, application] = await Promise.all([
    getPortalProfile(user.id),
    getPortalApplication(user.id),
  ])

  if (!profile) redirect('/portal/sign-in')

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {profile.profile_completed ? 'Your Profile' : 'Complete Your Profile'}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          {profile.profile_completed
            ? 'Update your study preferences below.'
            : 'Tell us about your study goals so we can process your application.'}
        </p>
      </div>

      {/* Progress hint */}
      {!profile.profile_completed && (
        <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
          <p className="text-sm text-blue-700">
            Your sign-up details are already saved. Just fill in your study preferences to activate your application.
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
        <ProfileCompleteForm
          userId={user.id}
          existingApplicationId={application?.id}
          prefillData={{
            full_name: profile.full_name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
          }}
        />
      </div>
    </div>
  )
}
