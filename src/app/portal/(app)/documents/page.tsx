import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPortalProfile, getPortalApplication, getPortalDocuments } from '@/lib/supabase/portal'
import DocumentRow from '@/components/portal/DocumentRow'
import DocumentUploadModal from '@/components/portal/DocumentUploadModal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documents | Student Portal — EduPlan360',
}

export default async function DocumentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const [profile, application, documents] = await Promise.all([
    getPortalProfile(user.id),
    getPortalApplication(user.id),
    getPortalDocuments(user.id),
  ])

  if (!profile) redirect('/portal/sign-in')

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
          <p className="text-slate-500 mt-1 text-sm">Upload and manage your application documents.</p>
        </div>
        <DocumentUploadModal
          userId={user.id}
          applicationId={application?.id}
        />
      </div>

      {/* Helper text */}
      <div className="mb-5 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl flex gap-3 items-start">
        <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-slate-500 leading-relaxed">
          Accepted formats: <strong>PDF, JPG, PNG</strong> · Max size: <strong>5MB</strong> per file. 
          Documents are reviewed by your advisor within 1–2 business days.
        </p>
      </div>

      {/* Document list */}
      <div className="bg-white rounded-2xl border border-slate-100">
        {documents.length === 0 ? (
          <div className="py-16 text-center px-6">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-slate-700 font-semibold mb-1">No documents uploaded yet</h3>
            <p className="text-slate-400 text-sm">
              Upload your academic transcript, passport, and other required documents to continue.
            </p>
          </div>
        ) : (
          <div className="px-6 divide-y divide-slate-50">
            {documents.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </div>

      {/* Required docs hint */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Required Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Passport (data page)',
            'Academic Transcript',
            'Statement of Purpose',
            'Reference Letter × 2',
            'English Test Result (IELTS/TOEFL)',
            'CV / Resume',
          ].map(item => {
            const uploaded = documents.some(d =>
              item.toLowerCase().includes(d.doc_type.replace('_', ' '))
            )
            return (
              <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${uploaded ? 'bg-green-100' : 'bg-slate-100'}`}>
                  {uploaded ? (
                    <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  )}
                </div>
                <span className={uploaded ? 'text-green-700' : 'text-slate-500'}>{item}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
