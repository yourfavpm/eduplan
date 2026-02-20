import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  getPortalProfile,
  getPortalApplication,
  getStatusHistory,
} from '@/lib/supabase/portal'
import { APPLICATION_STATUSES, getStatusIndex } from '@/types/portal'
import TimelineItem from '@/components/portal/TimelineItem'
import StatusBadge from '@/components/portal/StatusBadge'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Application | Student Portal — EduPlan360',
}

export default async function ApplicationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const [profile, application] = await Promise.all([
    getPortalProfile(user.id),
    getPortalApplication(user.id),
  ])

  if (!profile) redirect('/portal/sign-in')

  const statusHistory = application ? await getStatusHistory(application.id) : []
  const currentIndex = application ? getStatusIndex(application.status) : -1
  const historyMap = new Map(statusHistory.map(h => [h.status, h]))

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Application</h1>
        <p className="text-slate-500 mt-1 text-sm">Full details of your study abroad application.</p>
      </div>

      {!application ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center px-6">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-slate-700 font-semibold mb-2">No application yet</h3>
          <p className="text-slate-400 text-sm mb-6">Complete your profile to start your application.</p>
          <Link
            href="/portal/profile"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Application Summary</h2>
              <Link href="/portal/profile" className="text-xs text-blue-600 hover:underline font-medium">Edit →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SummaryItem label="Study Destination" value={application.destination ?? '—'} />
              <SummaryItem label="Preferred University" value={application.preferred_university ?? '—'} />
              <SummaryItem label="Proposed Course 1" value={application.proposed_course_1 ?? '—'} />
              <SummaryItem label="Proposed Course 2" value={application.proposed_course_2 ?? '—'} />
              <SummaryItem label="Highest Qualification" value={application.highest_qualification ?? '—'} />
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Current Status</p>
                <StatusBadge status={application.status} size="md" />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">Application Timeline</h2>
            {APPLICATION_STATUSES.map((step, idx) => {
              const histEntry = historyMap.get(step.value)
              const isCompleted = idx < currentIndex
              const isCurrent = idx === currentIndex
              const isLast = idx === APPLICATION_STATUSES.length - 1
              const date = histEntry
                ? new Date(histEntry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                : undefined
              return (
                <TimelineItem
                  key={step.value}
                  label={step.label}
                  date={date}
                  status={step.value}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  isLast={isLast}
                  note={histEntry?.note ?? undefined}
                />
              )
            })}
          </div>

          {/* Advisor Notes */}
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Advisor Notes</h2>
            <p className="text-sm text-slate-400">
              Your advisor hasn&apos;t added any notes yet. Check back after your advisor reviews your application.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm text-slate-800 font-medium">{value}</p>
    </div>
  )
}
