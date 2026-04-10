import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPortalProfile, getQualificationLevels } from '@/lib/supabase/portal'
import Link from 'next/link'
import ProfileClient from './ProfileClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile | EduPlan360',
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const [profile, qualifications] = await Promise.all([
    getPortalProfile(user.id),
    getQualificationLevels()
  ])

  if (!profile) redirect('/portal/sign-in')

  return (
    <div className="p-6 md:p-8 max-w-3xl">
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
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {profile.profile_completed ? 'Your Profile' : 'Complete Your Profile'}
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Manage your personal details and academic background.
        </p>
      </div>

      <div className="space-y-10">
        <ProfileClient profile={profile} qualifications={qualifications} />

        {/* Security Section */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 font-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            Security
          </h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl gap-4">
            <div>
              <p className="font-semibold text-slate-900 text-base">Account Password</p>
              <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure.</p>
            </div>
            <Link
              href="/portal/(auth)/forgot-password"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 bg-white px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all shadow-xs"
            >
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
