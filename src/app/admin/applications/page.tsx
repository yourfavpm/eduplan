import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '@/components/portal/StatusBadge'
import type { Metadata } from 'next'
import type { ApplicationStatus } from '@/types/portal'
import ApplicationFilters from './ApplicationFilters'

export const metadata: Metadata = {
  title: 'Applications | Admin — EduPlan360',
}

interface RawRow {
  id: string
  user_id: string
  study_destination: string | null
  status: string
  created_at: string
  portal_profiles: { full_name: string; email: string; phone: string | null; location: string | null } | null
}

interface AdminApp {
  id: string
  user_id: string
  study_destination: string | null
  status: ApplicationStatus
  created_at: string
  profile: { full_name: string; email: string; phone: string | null; location: string | null } | null
}

export default async function AdminApplicationsPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; status?: string; sort?: string }>
}) {
  const { q, status, sort = 'newest' } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  let query = supabase
    .from('applications')
    .select('id, user_id, study_destination, status, created_at, portal_profiles(full_name, email, phone, location)')

  if (status && status !== 'ALL') {
    query = query.eq('status', status)
  }

  // Sorting
  if (sort === 'newest') query = query.order('created_at', { ascending: false })
  else if (sort === 'oldest') query = query.order('created_at', { ascending: true })
  else query = query.order('created_at', { ascending: false })

  const { data: raw, error } = await query

  if (error) {
    console.error('Error fetching admin applications:', error)
  }

  let apps: AdminApp[] = ((raw ?? []) as unknown as RawRow[]).map(r => ({
    id: r.id,
    user_id: r.user_id,
    study_destination: r.study_destination,
    status: r.status as ApplicationStatus,
    created_at: r.created_at,
    profile: Array.isArray(r.portal_profiles) ? (r.portal_profiles[0] ?? null) : (r.portal_profiles ?? null),
  }))

  // client-side (in memory) filtering for search query if provided
  if (q) {
    const searchLower = q.toLowerCase()
    apps = apps.filter(app => 
        app.profile?.full_name?.toLowerCase().includes(searchLower) ||
        app.profile?.email?.toLowerCase().includes(searchLower) ||
        app.study_destination?.toLowerCase().includes(searchLower) ||
        app.id.toLowerCase().includes(searchLower)
    )
  }

  return (
    <div>
      {/* Header + nav */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Applications</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {apps.length} application{apps.length !== 1 ? 's' : ''} shown. Click an application to manage.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/document-types" className="text-sm font-medium text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Document Types
          </Link>
          <Link href="/admin/documents" className="text-sm font-medium text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Review Queue
          </Link>
        </div>
      </div>

      <ApplicationFilters q={q} status={status} sort={sort} />

      {apps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <p className="text-slate-400">No applications matched your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <span>Student</span>
            <span>Application</span>
            <span>Status</span>
            <span></span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-50">
            {apps.map(app => (
              <div
                key={app.id}
                className="grid grid-cols-[2fr_2fr_1.5fr_auto] gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
              >
                {/* Student */}
                <div>
                  <p className="text-sm font-semibold text-slate-800">{app.profile?.full_name ?? 'Unknown'}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{app.profile?.email ?? '—'}</p>
                  {app.profile?.phone && <p className="text-xs text-slate-400">{app.profile.phone}</p>}
                </div>

                {/* Application */}
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {app.study_destination ?? 'Destination TBA'}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {app.id.substring(0, 8)}...
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {new Date(app.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <StatusBadge status={app.status} />
                </div>

                {/* View */}
                <div>
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="text-xs text-blue-600 font-medium hover:underline whitespace-nowrap"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

