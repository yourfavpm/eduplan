import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPortalProfile } from '@/lib/supabase/portal'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile | EduPlan360',
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const profile = await getPortalProfile(user.id)

  if (!profile) redirect('/portal/sign-in')

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/portal/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-800">
          Profile
        </span>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {profile.profile_completed ? 'Your Profile' : 'Complete Your Profile'}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          View your account details and manage settings.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 space-y-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Account Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Full Name</p>
              <p className="text-sm font-semibold text-slate-900">{profile.full_name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Email Address</p>
              <p className="text-sm font-semibold text-slate-900">{profile.email}</p>
            </div>
            {profile.phone && (
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Phone Number</p>
                <p className="text-sm font-semibold text-slate-900">{profile.phone}</p>
              </div>
            )}
            {profile.location && (
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Location</p>
                <p className="text-sm font-semibold text-slate-900">{profile.location}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Security</h2>
          <div className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-slate-900">Password</p>
              <p className="text-xs text-slate-500 mt-0.5">Secure your account by updating your password regularly.</p>
            </div>
            <Link
              href="/portal/reset-password"
              className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
