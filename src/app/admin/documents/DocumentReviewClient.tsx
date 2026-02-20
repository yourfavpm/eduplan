'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { DocumentReviewRow } from '@/types/portal'
import { Check, X, ExternalLink, Filter } from 'lucide-react'

const STATUS_BADGES: Record<string, string> = {
  uploaded: 'bg-blue-50 text-blue-700 border-blue-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
}

const FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Uploaded', value: 'uploaded' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
] as const

interface Props {
  docs: DocumentReviewRow[]
  activeFilter?: 'uploaded' | 'approved' | 'rejected'
}

export default function DocumentReviewClient({ docs: initialDocs, activeFilter }: Props) {
  const router = useRouter()
  const [docs, setDocs] = useState<DocumentReviewRow[]>(initialDocs)
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [isPending, startTransition] = useTransition()

  function setFilter(value?: string) {
    const url = value ? `/admin/documents?filter=${value}` : '/admin/documents'
    router.push(url)
  }

  async function handleApprove(reqDocId: string) {
    startTransition(async () => {
      await fetch(`/api/admin/documents/${reqDocId}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })
      setDocs(prev => prev.map(d => d.required_document_id === reqDocId ? { ...d, status: 'approved' } : d))
    })
  }

  async function handleReject(reqDocId: string) {
    if (!rejectReason.trim()) return
    startTransition(async () => {
      await fetch(`/api/admin/documents/${reqDocId}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason: rejectReason }),
      })
      setDocs(prev => prev.map(d => d.required_document_id === reqDocId ? { ...d, status: 'rejected', rejection_reason: rejectReason } : d))
      setRejectId(null)
      setRejectReason('')
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Review</h1>
          <p className="text-slate-500 mt-1 text-sm">{docs.length} document{docs.length !== 1 ? 's' : ''} · Approve or reject student uploads.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
          {FILTERS.map(f => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeFilter === f.value
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {docs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <p className="text-slate-400 font-medium">No documents {activeFilter ?? 'found'}.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <span>Student</span>
            <span>Document Type</span>
            <span>Application</span>
            <span>Source</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-slate-50">
            {docs.map(doc => (
              <div key={doc.id}>
                <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors">
                  {/* Student */}
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{doc.profile?.full_name ?? '—'}</p>
                    <p className="text-xs text-slate-400">{doc.profile?.email ?? '—'}</p>
                  </div>

                  {/* Document type */}
                  <div>
                    <p className="text-sm font-medium text-slate-700">{doc.document_type.name}</p>
                    <p className="text-xs text-slate-400 truncate">{doc.original_filename}</p>
                  </div>

                  {/* Application */}
                  <div>
                    <p className="text-sm text-slate-600">{doc.application?.study_destination ?? doc.application?.title ?? '—'}</p>
                    {doc.application && (
                      <a
                        href={`/admin/applications/${doc.application.id}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View application →
                      </a>
                    )}
                  </div>

                  {/* Source */}
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      doc.source === 'manual_admin'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {doc.source === 'manual_admin' ? 'Manual' : 'Auto'}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_BADGES[doc.status]}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* View file */}
                    <a
                      href={`/api/admin/documents/download?path=${encodeURIComponent(doc.file_path)}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View / Download"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    {doc.status === 'uploaded' && doc.required_document_id && (
                      <>
                        <button
                          onClick={() => handleApprove(doc.required_document_id!)}
                          disabled={isPending}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setRejectId(doc.required_document_id!); setRejectReason('') }}
                          disabled={isPending}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Inline reject form */}
                {rejectId === doc.required_document_id && (
                  <div className="px-6 pb-4 flex gap-2">
                    <input
                      type="text"
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                      placeholder="Reason for rejection (shown to student)…"
                      className="flex-1 border border-red-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                      onKeyDown={e => e.key === 'Enter' && doc.required_document_id && handleReject(doc.required_document_id)}
                    />
                    <button
                      onClick={() => doc.required_document_id && handleReject(doc.required_document_id)}
                      disabled={isPending || !rejectReason.trim()}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      Confirm Reject
                    </button>
                    <button onClick={() => setRejectId(null)} className="text-sm text-slate-400 hover:text-slate-700 px-2">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
