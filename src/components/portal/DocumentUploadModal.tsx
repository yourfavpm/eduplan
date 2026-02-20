'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DOC_TYPE_LABELS, DOC_TYPES } from '@/types/portal'
import { Upload, X } from 'lucide-react'

interface DocumentUploadModalProps {
  userId: string
  applicationId?: string
}

export default function DocumentUploadModal({ userId, applicationId }: DocumentUploadModalProps) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [docType, setDocType] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function reset() {
    setDocType('')
    setFile(null)
    setError(null)
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleUpload() {
    if (!file || !docType) {
      setError('Please select a document type and file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.')
      return
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, JPG, and PNG files are accepted.')
      return
    }

    setUploading(true)
    setError(null)

    const supabase = createClient()
    const filePath = `${userId}/${docType}_${Date.now()}_${file.name}`

    // Upload to Storage
    const { error: storageErr } = await supabase.storage
      .from('portal-documents')
      .upload(filePath, file, { upsert: false })

    if (storageErr) {
      setError(`Upload failed: ${storageErr.message}`)
      setUploading(false)
      return
    }

    // Insert document record
    const { error: dbErr } = await supabase.from('portal_documents').insert({
      user_id: userId,
      application_id: applicationId ?? null,
      doc_type: docType,
      file_name: file.name,
      file_path: filePath,
      file_size: file.size,
      status: 'uploaded',
    })

    if (dbErr) {
      setError(`Failed to save record: ${dbErr.message}`)
      setUploading(false)
      return
    }

    reset()
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors duration-150 shrink-0"
      >
        <Upload className="w-4 h-4" />
        Upload Document
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => { setOpen(false); reset() }} />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Upload Document</h2>
              <button onClick={() => { setOpen(false); reset() }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">{error}</div>
            )}

            <div className="space-y-4">
              {/* Doc type */}
              <div>
                <label htmlFor="doc_type" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="doc_type"
                  value={docType}
                  onChange={e => setDocType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
                >
                  <option value="">Select document type…</option>
                  {DOC_TYPES.map(type => (
                    <option key={type} value={type}>{DOC_TYPE_LABELS[type]}</option>
                  ))}
                </select>
              </div>

              {/* File */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  File <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  {file ? (
                    <div className="text-sm text-slate-700">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Click to choose a file</p>
                      <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG · Max 5MB</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setOpen(false); reset() }}
                className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-600 font-medium rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Uploading…
                  </>
                ) : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
