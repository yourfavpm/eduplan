'use client'

import { useState, useTransition } from 'react'
import type { RequiredDocument, DocumentType } from '@/types/portal'
import { FileText, Plus, Trash2, Check, X, ChevronDown } from 'lucide-react'

const STATUS_BADGES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  uploaded: 'bg-blue-50 text-blue-700 border-blue-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
}

interface Props {
  applicationId: string
  initialRequiredDocs: RequiredDocument[]
  allDocumentTypes: DocumentType[]
}

export default function ApplicationDetailClient({
  applicationId,
  initialRequiredDocs,
  allDocumentTypes,
}: Props) {
  const [docs, setDocs] = useState<RequiredDocument[]>(initialRequiredDocs)
  const [selectedTypeId, setSelectedTypeId] = useState('')
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [customDocTitle, setCustomDocTitle] = useState('')
  const [isPending, startTransition] = useTransition()

  const assignedTypeIds = new Set(docs.map(d => d.document_type_id))
  const availableTypes = allDocumentTypes.filter(t => !assignedTypeIds.has(t.id))

  async function handleAssign() {
    if (!selectedTypeId) return
    startTransition(async () => {
      const res = await fetch(`/api/admin/applications/${applicationId}/required-documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentTypeId: selectedTypeId === 'custom' ? undefined : selectedTypeId,
          customDocTitle: selectedTypeId === 'custom' ? customDocTitle : undefined,
        }),
      })
      if (res.ok) {
        // Refresh the doc list
        const refreshed = await fetch(`/api/admin/applications/${applicationId}/required-documents`)
        const data = await refreshed.json()
        if (Array.isArray(data)) setDocs(data)
        else window.location.reload() // fallback
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to assign document')
      }
      setSelectedTypeId('')
      setCustomDocTitle('')
    })
  }

  async function handleRemove(reqDocId: string) {
    if (!confirm('Remove this document requirement?')) return
    startTransition(async () => {
      await fetch(`/api/admin/applications/${applicationId}/required-documents?reqDocId=${reqDocId}`, {
        method: 'DELETE',
      })
      setDocs(prev => prev.filter(d => d.id !== reqDocId))
    })
  }

  async function handleApprove(reqDocId: string) {
    startTransition(async () => {
      await fetch(`/api/admin/documents/${reqDocId}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })
      setDocs(prev => prev.map(d => d.id === reqDocId ? { ...d, status: 'approved', rejection_reason: null } : d))
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
      setDocs(prev => prev.map(d => d.id === reqDocId ? { ...d, status: 'rejected', rejection_reason: rejectReason } : d))
      setRejectId(null)
      setRejectReason('')
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100">
      <div className="flex items-center justify-between gap-4 p-6 border-b border-slate-50">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Required Documents</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Assign documents this student must upload for their application.
          </p>
        </div>

        {/* Assign form */}
        {availableTypes.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedTypeId}
                onChange={e => setSelectedTypeId(e.target.value)}
                className="appearance-none border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select document type…</option>
                <option value="custom" className="font-semibold">+ Create custom request</option>
                {availableTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name} {t.required ? '(Required)' : '(Optional)'}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {selectedTypeId === 'custom' && (
              <input
                type="text"
                placeholder="Name of document to request..."
                value={customDocTitle}
                onChange={e => setCustomDocTitle(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={e => e.key === 'Enter' && handleAssign()}
              />
            )}
            <button
              onClick={handleAssign}
              disabled={!selectedTypeId || (selectedTypeId === 'custom' && !customDocTitle.trim()) || isPending}
              className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-4 h-4" /> Assign
            </button>
          </div>
        )}
      </div>

      {docs.length === 0 ? (
        <div className="py-12 text-center px-6">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-medium">No required documents assigned</p>
          <p className="text-slate-400 text-xs mt-1">Use the dropdown above to assign document types to this application.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {docs.map(doc => (
            <div key={doc.id} className="px-6 py-4">
              <div className="flex items-start gap-4">
                {/* Doc info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-800">{doc.document_type.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_BADGES[doc.status]}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                    {!doc.document_type.required && (
                      <span className="text-xs text-slate-400">(Optional)</span>
                    )}
                  </div>
                  {doc.document_type.description && (
                    <p className="text-xs text-slate-400 mt-0.5">{doc.document_type.description}</p>
                  )}
                  {doc.rejection_reason && (
                    <p className="text-xs text-red-600 mt-1">Rejection reason: {doc.rejection_reason}</p>
                  )}
                  {doc.latest_upload && (
                    <p className="text-xs text-slate-400 mt-1">
                      📎 {doc.latest_upload.original_filename}
                      <span className="mx-1">·</span>
                      {new Date(doc.latest_upload.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {doc.status === 'uploaded' && (
                    <>
                      <button
                        onClick={() => handleApprove(doc.id)}
                        disabled={isPending}
                        className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => { setRejectId(doc.id); setRejectReason('') }}
                        disabled={isPending}
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  )}
                  {doc.status === 'approved' && (
                    <button
                      onClick={() => { setRejectId(doc.id); setRejectReason('') }}
                      disabled={isPending}
                      className="text-xs text-slate-400 hover:text-red-600 transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(doc.id)}
                    disabled={isPending}
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove requirement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rejection reason input */}
              {rejectId === doc.id && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="Reason for rejection (shown to student)…"
                    className="flex-1 border border-red-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    onKeyDown={e => e.key === 'Enter' && handleReject(doc.id)}
                  />
                  <button
                    onClick={() => handleReject(doc.id)}
                    disabled={isPending || !rejectReason.trim()}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    Confirm
                  </button>
                  <button onClick={() => setRejectId(null)} className="text-sm text-slate-400 hover:text-slate-700 px-2">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
