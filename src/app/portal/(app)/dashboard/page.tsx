import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserApplications, getPortalProfile, createPortalProfile } from '@/lib/supabase/portal'
import Link from 'next/link'
import { getNextAction } from '@/types/portal'

export const metadata: Metadata = { title: 'Dashboard | EduPlan360' }



export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  let profile = await getPortalProfile(user.id)
  if (!profile) {
    const fullName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'Student'
    profile = await createPortalProfile({ id: user.id, full_name: fullName, email: user.email ?? '' })
  }
  if (!profile) {
    return <div className="p-8 text-center text-slate-500">Profile setup failed. Please sign out and try again.</div>
  }

  const applications = await getUserApplications(user.id)
  const hasApps = applications.length > 0

  // Collect next actions across all apps
  const nextActions = applications.flatMap(app => {
    const action = getNextAction(app)
    if (!action) return []
    return [{ appId: app.id, appTitle: app.title || app.study_destination, action }]
  })

  return (
    <div className="max-w-3xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {profile.full_name.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {hasApps ? 'Here is your student journey overview.' : 'Get started by creating your first application.'}
        </p>
      </div>

      {/* No applications — first-time banner */}
      {!hasApps && (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Begin Your Journey</h2>
            <p className="text-slate-500 text-sm max-w-sm">Tell us where you want to study and we will guide you through every step — from documents to visa.</p>
          </div>
          <Link href="/portal/applications/new" className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm">
            Create Application
          </Link>
        </div>
      )}

      {/* Next Actions queue */}
      {nextActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">Next Actions</h2>
          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
            {nextActions.map(({ appId, appTitle, action }) => (
              <div key={appId} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-800">{action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">for <span className="font-medium text-slate-700">{appTitle}</span></p>
                </div>
                <Link href={`/portal/applications/${appId}`} className="shrink-0 text-xs font-medium text-blue-600 border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap shadow-sm">
                  Go →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applications Overview */}
      {hasApps && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Applications Overview</h2>
            <Link href="/portal/applications/new" className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
              + New Application
            </Link>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <div>
              <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{applications.length}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">Active Application{applications.length > 1 ? 's' : ''}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm text-slate-600 w-full sm:w-auto">
              <div className="bg-amber-50/50 border border-amber-100 px-4 py-2.5 rounded-2xl flex-1 sm:flex-none text-center">
                 <span className="block font-bold text-amber-700 text-xl">{applications.filter(a => a.status === 'INCOMPLETE_DOCUMENTS').length}</span>
                 <span className="text-xs font-medium text-amber-600/80 uppercase tracking-wider">In Progress</span>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 px-4 py-2.5 rounded-2xl flex-1 sm:flex-none text-center">
                 <span className="block font-bold text-blue-700 text-xl">{applications.filter(a => a.status === 'APPLICATION_SUBMITTED').length}</span>
                 <span className="text-xs font-medium text-blue-600/80 uppercase tracking-wider">Submitted</span>
              </div>
            </div>

            <Link href="/portal/applications" className="w-full sm:w-auto text-center shrink-0 inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-xl text-sm hover:bg-slate-800 transition-all shadow-sm">
              View All Applications →
            </Link>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: '/portal/applications', label: 'All Applications', emoji: '📁' },
          { href: '/portal/documents', label: 'My Documents', emoji: '📄' },
          { href: '/portal/profile', label: 'My Profile', emoji: '👤' },
        ].map(q => (
          <Link key={q.href} href={q.href} className="bg-white border border-slate-100 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-slate-200 hover:bg-slate-50 transition-colors">
            <span className="text-lg">{q.emoji}</span>
            <span className="text-sm font-medium text-slate-700">{q.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
