import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getApplicationDetails, getApplicationStatusHistory, getAdminNotes, getPayments } from '@/lib/supabase/admin'
import { getRequiredDocuments } from '@/lib/supabase/documents'
import Link from 'next/link'
import StatusBadge from '@/components/portal/StatusBadge'
import ApplicationDetailTabs from './ApplicationDetailTabs'
import type { Metadata } from 'next'
import type { ApplicationStatus } from '@/types/portal'

export const metadata: Metadata = { title: 'Application Detail | Admin — EduPlan360' }

export default async function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { id } = await params
  const { tab = 'overview' } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const raw = await getApplicationDetails(id)
  if (!raw) redirect('/admin/applications')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = raw as any
  const profile = Array.isArray(app.portal_profiles) ? app.portal_profiles[0] : app.portal_profiles

  // Load tab-specific data in parallel
  const [requiredDocs, allDocTypes, statusHistory, notes, payments] = await Promise.all([
    (tab === 'required-docs' || tab === 'overview') ? getRequiredDocuments(id) : Promise.resolve([]),
    (tab === 'required-docs')
      ? supabase.from('document_types').select('*').then(r => r.data ?? [])
      : Promise.resolve([]),
    tab === 'timeline' ? getApplicationStatusHistory(id) : Promise.resolve([]),
    tab === 'notes' ? getAdminNotes(id) : Promise.resolve([]),
    tab === 'payments' ? getPayments('all').then(p => p.filter(x => x.application_id === id)) : Promise.resolve([]),
  ])

  // Count required doc statuses for overview summary
  const docsComplete = requiredDocs.filter(d => d.status === 'approved' || d.status === 'uploaded').length
  const docsTotal = requiredDocs.length

  return (
    <div className="max-w-5xl">
      <Link href="/admin/applications" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        ← Back to Applications
      </Link>

      {/* Control room header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-xl font-bold text-slate-900">{profile?.full_name ?? 'Unknown'}</h1>
              <StatusBadge status={app.status as ApplicationStatus} />
            </div>
            <p className="text-slate-500 text-sm">{profile?.email} {profile?.phone ? `· ${profile.phone}` : ''}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-50 text-sm">
          <div><p className="text-xs text-slate-400 mb-0.5">Destination</p><p className="font-medium text-slate-800">{app.destination ?? '—'}</p></div>
          <div><p className="text-xs text-slate-400 mb-0.5">University</p><p className="font-medium text-slate-800 truncate">{app.preferred_university ?? '—'}</p></div>
          <div><p className="text-xs text-slate-400 mb-0.5">Course</p><p className="font-medium text-slate-800 truncate">{app.proposed_course_1 ?? '—'}</p></div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Documents</p>
            <p className="font-medium text-slate-800">{docsTotal > 0 ? `${docsComplete}/${docsTotal}` : 'Not assigned'}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ApplicationDetailTabs
        applicationId={id}
        currentStatus={app.status}
        app={app}
        profile={profile}
        requiredDocs={requiredDocs}
        allDocumentTypes={allDocTypes}
        statusHistory={statusHistory}
        notes={notes}
        payments={payments}
        activeTab={tab}
        adminId={user.id}
      />
    </div>
  )
}
