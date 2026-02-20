import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StatusUpdateDropdown from '@/components/portal/StatusUpdateDropdown'
import StatusBadge from '@/components/portal/StatusBadge'
import type { Metadata } from 'next'
import type { ApplicationStatus } from '@/types/portal'

export const metadata: Metadata = {
  title: 'Applications | Admin — EduPlan360',
}

interface RawRow {
  id: string
  user_id: string
  destination: string | null
  proposed_course_1: string | null
  status: string
  created_at: string
  portal_profiles: { full_name: string; email: string; phone: string | null }[] | null
}

interface AdminApp {
  id: string
  user_id: string
  destination: string | null
  proposed_course_1: string | null
  status: ApplicationStatus
  created_at: string
  profile: { full_name: string; email: string; phone: string | null } | null
}

export default async function AdminApplicationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const { data: raw } = await supabase
    .from('portal_applications')
    .select('id, user_id, destination, proposed_course_1, status, created_at, portal_profiles(full_name, email, phone)')
    .order('created_at', { ascending: false })

  const apps: AdminApp[] = ((raw ?? []) as unknown as RawRow[]).map(r => ({
    id: r.id,
    user_id: r.user_id,
    destination: r.destination,
    proposed_course_1: r.proposed_course_1,
    status: r.status as ApplicationStatus,
    created_at: r.created_at,
    profile: Array.isArray(r.portal_profiles) ? (r.portal_profiles[0] ?? null) : null,
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Student Applications</h1>
        <p className="text-slate-500 mt-1 text-sm">
          {apps.length} application{apps.length !== 1 ? 's' : ''} total.
          Update status to trigger student-facing progress.
        </p>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <p className="text-slate-400">No applications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_2fr] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <span>Student</span>
            <span>Application</span>
            <span>Current Status</span>
            <span>Update Status</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-50">
            {apps.map(app => (
              <div
                key={app.id}
                className="grid grid-cols-[2fr_2fr_1.5fr_2fr] gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
              >
                {/* Student */}
                <div>
                  <p className="text-sm font-semibold text-slate-800">{app.profile?.full_name ?? 'Unknown'}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{app.profile?.email ?? '—'}</p>
                  {app.profile?.phone && <p className="text-xs text-slate-400">{app.profile.phone}</p>}
                </div>

                {/* Application */}
                <div>
                  <p className="text-sm text-slate-700 font-medium">{app.destination ?? '—'}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{app.proposed_course_1 ?? '—'}</p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {new Date(app.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Current status */}
                <div>
                  <StatusBadge status={app.status} />
                </div>

                {/* Update */}
                <div>
                  <StatusUpdateDropdown
                    applicationId={app.id}
                    currentStatus={app.status}
                    adminId={user.id}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
