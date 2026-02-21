'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { RequiredDocument } from '@/types/portal'
import { Upload, RefreshCw, Check, AlertCircle, Loader2 } from 'lucide-react'

const STATUS_CONFIG = {
  pending: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    label: 'Pending',
  },
  uploaded: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Uploaded',
  },
  approved: {
    badge: 'bg-green-50 text-green-700 border-green-200',
    label: 'Approved',
  },
  rejected: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    label: 'Rejected',
  },
}

interface Props {
  doc: RequiredDocument
  userId: string
  applicationId: string
}

export default function DocumentRequirementRow({ doc, userId, applicationId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState(doc.status)
  const [filename, setFilename] = useState(doc.latest_upload?.original_filename ?? null)
  const [rejectionReason, setRejectionReason] = useState(doc.rejection_reason)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const cfg = STATUS_CONFIG[status]

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate type
    const allowed = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowed.includes(file.type)) {
      setError('Only PDF, JPG, or PNG files are accepted.')
      return
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be smaller than 5MB.')
      return
    }

    setError(null)
    startTransition(async () => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)
      formData.append('applicationId', applicationId)
      formData.append('requiredDocId', doc.id)
      formData.append('documentTypeId', doc.document_type_id)

      const res = await fetch('/api/portal/documents/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error ?? 'Upload failed. Please try again.')
      } else {
        setStatus('uploaded')
        setFilename(file.name)
        setRejectionReason(null)
        router.refresh()
      }
    })

    // Reset input so same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const canUpload = status !== 'approved'
  const isReplacing = status === 'uploaded' || status === 'rejected'

  return (
    <div className="px-6 py-4">
      <div className="flex items-start gap-4">
        {/* Status icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
          status === 'approved' ? 'bg-green-100' :
          status === 'rejected' ? 'bg-red-100' :
          status === 'uploaded' ? 'bg-blue-100' :
          'bg-slate-100'
        }`}>
          {status === 'approved' ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : status === 'rejected' ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : status === 'uploaded' ? (
            <Check className="w-4 h-4 text-blue-500" />
          ) : (
            <Upload className="w-4 h-4 text-slate-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-semibold text-slate-800">{doc.document_type.name}</span>
            {!doc.document_type.required && (
              <span className="text-xs text-slate-400">(Optional)</span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>

          {doc.document_type.description && (
            <p className="text-xs text-slate-400 mb-1">{doc.document_type.description}</p>
          )}

          {filename && status !== 'pending' && (
            <p className="text-xs text-slate-400">📎 {filename}</p>
          )}

          {status === 'rejected' && rejectionReason && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              ↳ Please re-upload. Reason: {rejectionReason}
            </p>
          )}

          {error && (
            <p className="text-xs text-red-600 mt-1">{error}</p>
          )}
        </div>

        {/* Upload button */}
        {canUpload && (
          <div className="shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id={`file-${doc.id}`}
            />
            <label
              htmlFor={`file-${doc.id}`}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                isPending
                  ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                  : isReplacing
                  ? 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                  : 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              {isPending ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</>
              ) : isReplacing ? (
                <><RefreshCw className="w-3.5 h-3.5" /> Replace</>
              ) : (
                <><Upload className="w-3.5 h-3.5" /> Upload</>
              )}
            </label>
          </div>
        )}

        {status === 'approved' && (
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
              <Check className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
