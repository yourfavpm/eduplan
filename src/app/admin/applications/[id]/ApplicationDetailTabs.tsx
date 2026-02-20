'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import type { RequiredDocument, DocumentType } from '@/types/portal'
import StatusUpdateModal from '@/components/admin/StatusUpdateModal'
import ApplicationDetailClient from './ApplicationDetailClient'
import { Plus, Check, X, Trash2, ChevronDown } from 'lucide-react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'required-docs', label: 'Required Docs' },
  { id: 'documents', label: 'Document Queue' },
  { id: 'payments', label: 'Payments' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'notes', label: 'Notes' },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  uploaded: 'bg-blue-50 text-blue-700 border-blue-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  paid: 'bg-green-50 text-green-700 border-green-200',
  failed: 'bg-red-50 text-red-700 border-red-200',
}

interface Props {
  applicationId: string
  currentStatus: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any
  requiredDocs: RequiredDocument[]
  allDocumentTypes: DocumentType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statusHistory: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notes: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payments: any[]
  activeTab: string
  adminId: string
}

export default function ApplicationDetailTabs({
  applicationId, currentStatus, app, profile, requiredDocs, allDocumentTypes,
  statusHistory, notes, payments, activeTab, adminId,
}: Props) {
  const [status, setStatus] = useState(currentStatus)
  const [noteText, setNoteText] = useState('')
  const [localNotes, setLocalNotes] = useState(notes)
  const [isPending, startTransition] = useTransition()

  function handleStatusChanged(newStatus: string) { setStatus(newStatus) }

  function submitNote() {
    if (!noteText.trim()) return
    startTransition(async () => {
      const res = await fetch(`/api/admin/applications/${applicationId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: noteText }),
      })
      const data = await res.json()
      if (data.id) { setLocalNotes(prev => [data, ...prev]); setNoteText('') }
    })
  }

  return (
    <>
      {/* Status + primary actions row */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <StatusUpdateModal applicationId={applicationId} currentStatus={status} onStatusChanged={handleStatusChanged} />
        <Link href={`/admin/students/${app.user_id}`} className="text-sm text-slate-500 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors">View Student Profile</Link>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-100 rounded-xl p-1 overflow-x-auto">
        {TABS.map(t => (
          <Link key={t.id} href={`/admin/applications/${applicationId}?tab=${t.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
            {t.label}
          </Link>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-slate-700">Application Form Data</h2>
            <dl className="grid sm:grid-cols-2 gap-3">
              {[
                ['Destination', app.destination],
                ['Preferred University', app.preferred_university],
                ['Course 1', app.proposed_course_1],
                ['Course 2', app.proposed_course_2],
                ['Highest Qualification', app.highest_qualification],
                ['App Fee Paid', app.application_fee_paid ? 'Yes ✓' : 'No'],
                ['Tuition Deposit Paid', app.tuition_deposit_paid ? 'Yes ✓' : 'No'],
                ['Created', new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })],
              ].map(([label, value]) => (
                <div key={label} className="bg-slate-50 rounded-xl px-4 py-3">
                  <dt className="text-xs text-slate-400 mb-0.5">{label}</dt>
                  <dd className="text-sm font-medium text-slate-800">{value ?? '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* REQUIRED DOCS */}
        {activeTab === 'required-docs' && (
          <ApplicationDetailClient
            applicationId={applicationId}
            initialRequiredDocs={requiredDocs}
            allDocumentTypes={allDocumentTypes}
          />
        )}

        {/* DOCUMENT QUEUE */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-700">Uploaded Documents</h2>
              <Link href="/admin/documents" className="text-xs text-blue-600 hover:underline">Open full review queue →</Link>
            </div>
            {requiredDocs.filter(d => d.latest_upload).length === 0 ? (
              <p className="text-slate-400 text-sm">No documents uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {requiredDocs.filter(d => d.latest_upload).map(d => (
                  <div key={d.id} className="flex items-center gap-4 bg-slate-50 rounded-xl px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{d.document_type.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">📎 {d.latest_upload?.original_filename}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLORS[d.status] ?? ''}`}>{d.status}</span>
                    <a href={`/api/admin/documents/download?path=${encodeURIComponent(d.latest_upload?.file_path ?? '')}`} target="_blank" className="text-xs text-blue-600 hover:underline shrink-0">Download</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === 'payments' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Payments</h2>
            {payments.length === 0 ? (
              <p className="text-slate-400 text-sm">No payments recorded for this application.</p>
            ) : (
              <div className="space-y-2">
                {payments.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800 capitalize">{p.type?.replace(/_/g, ' ')}</p>
                      {p.reference && <p className="text-xs text-slate-400">Ref: {p.reference}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">{p.currency} {p.amount ?? '—'}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[p.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === 'timeline' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Status Timeline</h2>
            {statusHistory.length === 0 ? (
              <p className="text-slate-400 text-sm">No status changes yet.</p>
            ) : (
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200" />
                {statusHistory.map(h => (
                  <div key={h.id} className="relative">
                    <div className="absolute -left-4 top-2 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                    <div className="bg-slate-50 rounded-xl px-4 py-3">
                      <p className="text-sm font-semibold text-slate-800">{h.status?.replace(/_/g, ' ')}</p>
                      {h.note && <p className="text-xs text-slate-500 mt-0.5 italic">&ldquo;{h.note}&rdquo;</p>}
                      <p className="text-xs text-slate-400 mt-1">
                        {h.portal_profiles?.full_name ?? 'Admin'} · {new Date(h.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOTES */}
        {activeTab === 'notes' && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Internal Notes</h2>
            <div className="mb-5">
              <textarea
                rows={3}
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add a note visible only to admin team…"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-2"
              />
              <button onClick={submitNote} disabled={isPending || !noteText.trim()} className="inline-flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-900 disabled:opacity-50 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Note
              </button>
            </div>
            {localNotes.length === 0 ? (
              <p className="text-slate-400 text-sm">No notes yet.</p>
            ) : (
              <div className="space-y-3">
                {localNotes.map(n => (
                  <div key={n.id} className="bg-slate-50 rounded-xl px-4 py-3">
                    <p className="text-sm text-slate-800 leading-relaxed">{n.note}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {n.portal_profiles?.full_name ?? 'Admin'} · {new Date(n.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
