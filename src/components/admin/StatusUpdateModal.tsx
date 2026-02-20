'use client'

import { useState, useTransition } from 'react'
import { X, ChevronDown } from 'lucide-react'

const STATUSES = [
  'INCOMPLETE_DOCUMENTS',
  'PAY_APPLICATION_FEES',
  'APPLICATION_SUBMITTED',
  'OFFER_SENT',
  'PREPARE_FOR_INTERVIEW',
  'PAY_TUITION_DEPOSIT',
  'CAS_ISSUED',
  'PROCESS_VISA',
]

interface Props {
  applicationId: string
  currentStatus: string
  onStatusChanged: (newStatus: string) => void
}

export default function StatusUpdateModal({ applicationId, currentStatus, onStatusChanged }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [note, setNote] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit() {
    if (selectedStatus === currentStatus) { setOpen(false); return }
    startTransition(async () => {
      const res = await fetch(`/api/admin/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus, note }),
      })
      if (res.ok) {
        onStatusChanged(selectedStatus)
        setOpen(false)
        setNote('')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
      >
        Update Status <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-900">Update Application Status</h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">New Status</label>
                <div className="space-y-1">
                  {STATUSES.map(s => (
                    <label key={s} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${selectedStatus === s ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}>
                      <input type="radio" name="status" value={s} checked={selectedStatus === s} onChange={() => setSelectedStatus(s)} className="text-blue-600" />
                      <span className={`text-sm ${selectedStatus === s ? 'font-semibold text-blue-800' : 'text-slate-700'}`}>
                        {s.replace(/_/g, ' ')}
                      </span>
                      {s === currentStatus && <span className="ml-auto text-xs text-slate-400">current</span>}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Note (optional, shown in timeline)</label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="e.g. Offer letter received from university"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSubmit}
                disabled={isPending || selectedStatus === currentStatus}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isPending ? 'Saving…' : 'Confirm Update'}
              </button>
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
