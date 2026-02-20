import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserApplications, getPortalProfile, createPortalProfile } from '@/lib/supabase/portal'
import Link from 'next/link'
import { getNextAction, getStatusProgression } from '@/types/portal'
import type { Metadata } from 'next'
import type { Application } from '@/types/portal'

export const metadata: Metadata = { title: 'Dashboard | EduPlan360' }

function ApplicationTile({ app }: { app: Application }) {
  const progress = getStatusProgression(app.status)
  const nextAction = getNextAction(app)

  return (
    <Link
      href={`/portal/applications/${app.id}`}
      className="group block bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {app.title || app.study_destination}
          </p>
          {app.title && (
            <p className="text-xs text-slate-400 mt-0.5">{app.study_destination}</p>
          )}
        </div>
        <StatusPill status={app.status} />
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{progress}% complete</span>
          <span>{app.required_docs_done}/{app.required_docs_total} docs ready</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Next action */}
      {nextAction && (
        <p className="text-xs text-slate-500 line-clamp-1">
          <span className="font-medium text-blue-600">Next: </span>{nextAction}
        </p>
      )}
    </Link>
  )
}

function StatusPill({ status }: { status: string }) {
  const STATUS_MAP: Record<string, { label: string; className: string }> = {
    INCOMPLETE_DOCUMENTS: { label: 'In Progress', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    PAY_APPLICATION_FEES: { label: 'Pay Fee', className: 'bg-orange-50 text-orange-700 border-orange-200' },
    APPLICATION_SUBMITTED: { label: 'Submitted', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    OFFER_SENT: { label: 'Offer Rec\'d', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    PREPARE_FOR_INTERVIEW: { label: 'Interview', className: 'bg-purple-50 text-purple-700 border-purple-200' },
    PAY_TUITION_DEPOSIT: { label: 'Pay Deposit', className: 'bg-pink-50 text-pink-700 border-pink-200' },
    CAS_ISSUED: { label: 'CAS Issued', className: 'bg-teal-50 text-teal-700 border-teal-200' },
    PROCESS_VISA: { label: 'Visa Stage', className: 'bg-green-50 text-green-700 border-green-200' },
  }
  const s = STATUS_MAP[status] ?? { label: status, className: 'bg-slate-50 text-slate-600 border-slate-200' }
  return <span className={`text-xs font-medium px-2 py-1 rounded-full border whitespace-nowrap ${s.className}`}>{s.label}</span>
}

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
          {hasApps ? `You have ${applications.length} application${applications.length > 1 ? 's' : ''}. Here&apos;s your overview.` : 'Get started by creating your first application.'}
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

      {/* Application tiles */}
      {hasApps && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Active Applications</h2>
            <Link href="/portal/applications/new" className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
              + New Application
            </Link>
          </div>
          <div className="grid gap-3">
            {applications.map(app => (
              <ApplicationTile key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* Next Actions queue */}
      {nextActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">Next Actions</h2>
          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
            {nextActions.map(({ appId, appTitle, action }) => (
              <div key={appId} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div>
                  <p className="text-sm text-slate-800">{action}</p>
                  <p className="text-xs text-slate-400 mt-0.5">for {appTitle}</p>
                </div>
                <Link href={`/portal/applications/${appId}`} className="shrink-0 text-xs font-medium text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap">
                  Go →
                </Link>
              </div>
            ))}
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
