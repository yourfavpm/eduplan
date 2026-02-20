import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserApplications } from '@/lib/supabase/portal'
import { getRequiredDocuments } from '@/lib/supabase/documents'
import Link from 'next/link'
import DocumentRequirementRow from '@/components/portal/DocumentRequirementRow'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Documents | EduPlan360' }

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>
}) {
  const { app: selectedAppId } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const applications = await getUserApplications(user.id)
  if (applications.length === 0) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/portal/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-800">
            Documents
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Documents</h1>
        <p className="text-slate-400 text-sm mb-5">No applications yet.</p>
        <a href="/portal/applications/new" className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">+ Create Application</a>
      </div>
    )
  }

  const currentAppId = selectedAppId ?? applications[0].id
  const selectedApp = applications.find(a => a.id === currentAppId) ?? applications[0]
  const requiredDocs = await getRequiredDocuments(selectedApp.id)

  const pending = requiredDocs.filter(d => d.status === 'pending')
  const rejected = requiredDocs.filter(d => d.status === 'rejected')
  const uploaded = requiredDocs.filter(d => d.status === 'uploaded')
  const approved = requiredDocs.filter(d => d.status === 'approved')

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/portal/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-800">
          Documents
        </span>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
        <p className="text-slate-500 text-sm mt-1">Select an application to view its document checklist.</p>
      </div>

      {/* Application selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-600 mb-1.5">Application</label>
        <div className="flex flex-wrap gap-2">
          {applications.map(app => (
            <a
              key={app.id}
              href={`/portal/documents?app=${app.id}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                app.id === selectedApp.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-700'
              }`}
            >
              {app.title || app.study_destination}
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Pending', count: pending.length, color: 'text-amber-600' },
          { label: 'Rejected', count: rejected.length, color: 'text-red-600' },
          { label: 'Uploaded', count: uploaded.length, color: 'text-blue-600' },
          { label: 'Approved', count: approved.length, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 px-3 py-3 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50">
          <h2 className="text-sm font-semibold text-slate-800">
            {selectedApp.title || selectedApp.study_destination} — Document Checklist
          </h2>
        </div>
        {requiredDocs.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-slate-400 text-sm">No documents required for this application yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {requiredDocs.map(doc => (
              <DocumentRequirementRow
                key={doc.id}
                requiredDoc={doc}
                userId={user.id}
                applicationId={selectedApp.id}
                onUploaded={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
