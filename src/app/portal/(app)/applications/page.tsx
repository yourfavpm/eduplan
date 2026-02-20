import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserApplications } from '@/lib/supabase/portal'
import Link from 'next/link'
import type { Application } from '@/types/portal'
import { getStatusProgression, getNextAction } from '@/types/portal'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Applications | EduPlan360' }

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  INCOMPLETE_DOCUMENTS: { label: 'In Progress', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  PAY_APPLICATION_FEES: { label: 'Pay Fee', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  APPLICATION_SUBMITTED: { label: 'Submitted', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  OFFER_SENT: { label: 'Offer Received', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  PREPARE_FOR_INTERVIEW: { label: 'Interview Prep', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  PAY_TUITION_DEPOSIT: { label: 'Pay Deposit', className: 'bg-pink-50 text-pink-700 border-pink-200' },
  CAS_ISSUED: { label: 'CAS Issued', className: 'bg-teal-50 text-teal-700 border-teal-200' },
  PROCESS_VISA: { label: 'Visa Stage', className: 'bg-green-50 text-green-700 border-green-200' },
}

function AppRow({ app }: { app: Application }) {
  const s = STATUS_LABELS[app.status] ?? { label: app.status, className: 'bg-slate-50 text-slate-600 border-slate-200' }
  const progress = getStatusProgression(app.status)
  const nextAction = getNextAction(app)
  const updatedAgo = new Date(app.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <Link
      href={`/portal/applications/${app.id}`}
      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {app.title || app.study_destination}
          </p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${s.className}`}>{s.label}</span>
        </div>
        {app.title && <p className="text-xs text-slate-400 mb-1">{app.study_destination}</p>}
        {nextAction && <p className="text-xs text-blue-600 truncate">{nextAction}</p>}
      </div>
      <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0 text-right">
        <p className="text-xs text-slate-400">
          {app.required_docs_done ?? 0}/{app.required_docs_total ?? 0} docs · {progress}%
        </p>
        <p className="text-xs text-slate-300">{updatedAgo}</p>
      </div>
      <span className="text-slate-400 group-hover:text-blue-600 transition-colors">→</span>
    </Link>
  )
}

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const applications = await getUserApplications(user.id)
  const active = applications.filter(a => a.status !== 'PROCESS_VISA')
  const completed = applications.filter(a => a.status === 'PROCESS_VISA')

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/portal/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-800">
          Applications
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500 text-sm mt-1">
            {applications.length === 0 ? 'No applications yet.' : `${applications.length} application${applications.length > 1 ? 's' : ''}`}
          </p>
        </div>
        <Link href="/portal/applications/new" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">
          + New Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center px-6">
          <p className="text-3xl mb-3">📁</p>
          <p className="text-slate-700 font-semibold mb-1">No applications yet</p>
          <p className="text-slate-400 text-sm mb-5">Create your first application to get started.</p>
          <Link href="/portal/applications/new" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            + Create Application
          </Link>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-4">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active ({active.length})</p>
              </div>
              <div className="divide-y divide-slate-50">
                {active.map(app => <AppRow key={app.id} app={app} />)}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden opacity-75">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Completed ({completed.length})</p>
              </div>
              <div className="divide-y divide-slate-50">
                {completed.map(app => <AppRow key={app.id} app={app} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
