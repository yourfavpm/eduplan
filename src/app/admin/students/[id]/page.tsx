import { getStudentById, getStudentLatestApplication, getApplicationStatusHistory } from '@/lib/supabase/admin'
import { getPayments } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '@/components/portal/StatusBadge'
import type { Metadata } from 'next'
import type { ApplicationStatus } from '@/types/portal'

export const metadata: Metadata = { title: 'Student Detail | Admin — EduPlan360' }

export default async function StudentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { id } = await params
  const { tab = 'overview' } = await searchParams

  const student = await getStudentById(id)
  if (!student) redirect('/admin/students')

  const userApp = await getStudentLatestApplication(id).catch(() => null)
  const appId = userApp?.id

  // Load tab-specific data
  const [history, payments] = await Promise.all([
    tab === 'timeline' && appId ? getApplicationStatusHistory(appId) : Promise.resolve([]),
    tab === 'payments' ? getPayments('all') : Promise.resolve([]),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = userApp as any
  const appProfile = app ? (Array.isArray(app.portal_profiles) ? app.portal_profiles[0] : (app.portal_profiles ?? null)) : null
  void appProfile

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'application', label: 'Application' },
    { id: 'documents', label: 'Documents' },
    { id: 'payments', label: 'Payments' },
    { id: 'notes', label: 'Notes' },
    { id: 'timeline', label: 'Timeline' },
  ]

  return (
    <div className="max-w-4xl">
      {/* Back */}
      <Link href="/admin/students" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        ← Back to Students
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shrink-0">
            {student.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">{student.full_name}</h1>
            <p className="text-slate-500 text-sm">{student.email}</p>
            {student.phone && <p className="text-slate-400 text-xs mt-0.5">{student.phone}</p>}
          </div>
          {app?.status && (
            <StatusBadge status={app.status as ApplicationStatus} />
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-50 text-sm">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Location</p>
            <p className="text-slate-700">{student.location ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Joined</p>
            <p className="text-slate-700">{new Date(student.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          {app?.id && (
            <div>
              <Link href={`/admin/applications/${app.id}`} className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline mt-4">
                Open Application →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white border border-slate-100 rounded-xl p-1 overflow-x-auto">
        {TABS.map(t => (
          <Link
            key={t.id}
            href={`/admin/students/${id}?tab=${t.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        {tab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">Profile Details</h2>
            <dl className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: student.full_name },
                { label: 'Email', value: student.email },
                { label: 'Phone', value: student.phone ?? '—' },
                { label: 'Location', value: student.location ?? '—' },
                { label: 'Role', value: student.role },
                { label: 'Profile Complete', value: 'Yes' },
              ].map(field => (
                <div key={field.label} className="bg-slate-50 rounded-xl px-4 py-3">
                  <dt className="text-xs text-slate-400 mb-0.5">{field.label}</dt>
                  <dd className="text-sm font-medium text-slate-800">{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {tab === 'application' && (
          <div>
            {app ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-700">Application Details</h2>
                  <Link href={`/admin/applications/${app.id}`} className="text-xs text-blue-600 hover:underline font-medium">
                    Open full detail →
                  </Link>
                </div>
                <dl className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Destination', value: app.study_destination ?? '—' },
                    { label: 'Preferred University', value: app.application_university_choices?.[0]?.university_name ?? '—' },
                    { label: 'Course', value: app.application_university_choices?.[0]?.university_course_choices?.[0]?.course_name ?? '—' },
                    { label: 'Highest Qualification', value: Array.isArray(app.qualification_level) ? app.qualification_level[0]?.name : (app.qualification_level?.name ?? '—') },
                    { label: 'Status', value: app.status },
                    { label: 'App Fee Paid', value: app.application_fee_paid ? 'Yes' : 'No' },
                    { label: 'Tuition Deposit Paid', value: app.tuition_deposit_paid ? 'Yes' : 'No' },
                  ].map(field => (
                    <div key={field.label} className="bg-slate-50 rounded-xl px-4 py-3">
                      <dt className="text-xs text-slate-400 mb-0.5">{field.label}</dt>
                      <dd className="text-sm font-medium text-slate-800">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No application found for this student.</p>
            )}
          </div>
        )}

        {tab === 'documents' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Documents</h2>
            {app?.id ? (
              <Link href={`/admin/applications/${app.id}?tab=documents`} className="text-sm text-blue-600 hover:underline">
                View documents in application detail →
              </Link>
            ) : (
              <p className="text-slate-400 text-sm">No application found.</p>
            )}
          </div>
        )}

        {tab === 'payments' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Payments</h2>
            {payments.filter(p => p.user_id === id).length === 0 ? (
              <p className="text-slate-400 text-sm">No payments recorded.</p>
            ) : (
              <div className="space-y-2">
                {payments.filter(p => p.user_id === id).map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{p.type.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-slate-400">{new Date(p.created_at).toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-800">{p.currency} {p.amount ?? '—'}</p>
                      <span className={`text-xs font-medium ${p.status === 'paid' ? 'text-green-600' : p.status === 'pending' ? 'text-amber-600' : 'text-slate-500'}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'notes' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Internal Notes</h2>
            {app?.id ? (
              <Link href={`/admin/applications/${app.id}?tab=notes`} className="text-sm text-blue-600 hover:underline">
                View notes in application detail →
              </Link>
            ) : (
              <p className="text-slate-400 text-sm">No application found.</p>
            )}
          </div>
        )}

        {tab === 'timeline' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Status Timeline</h2>
            {history.length === 0 ? (
              <p className="text-slate-400 text-sm">No status history yet.</p>
            ) : (
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200" />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {history.map((h: any) => (
                  <div key={h.id} className="relative">
                    <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                    <div className="bg-slate-50 rounded-xl px-4 py-3">
                      <p className="text-sm font-semibold text-slate-800">{h.status.replace(/_/g, ' ')}</p>
                      {h.note && <p className="text-xs text-slate-500 mt-0.5">{h.note}</p>}
                      <p className="text-xs text-slate-400 mt-1">
                        {h.portal_profiles?.full_name ?? 'Admin'} · {new Date(h.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
