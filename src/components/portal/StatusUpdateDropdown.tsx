'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { APPLICATION_STATUSES, type ApplicationStatus } from '@/types/portal'

interface StatusUpdateDropdownProps {
  applicationId: string
  currentStatus: ApplicationStatus
  adminId: string
}

export default function StatusUpdateDropdown({
  applicationId,
  currentStatus,
  adminId,
}: StatusUpdateDropdownProps) {
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  async function handleChange(newStatus: ApplicationStatus) {
    if (newStatus === status) return
    setLoading(true)
    setSaved(false)

    const supabase = createClient()

    // Update application status
    await supabase
      .from('applications')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', applicationId)

    // Log to status history
    await supabase.from('portal_status_history').insert({
      application_id: applicationId,
      status: newStatus,
      changed_by: adminId,
      note: `Status updated by admin`,
    })

    setStatus(newStatus)
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={e => handleChange(e.target.value as ApplicationStatus)}
        disabled={loading}
        className="text-xs font-medium border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
      >
        {APPLICATION_STATUSES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {loading && <span className="text-xs text-slate-400">Saving…</span>}
      {saved && <span className="text-xs text-green-600">✓ Saved</span>}
    </div>
  )
}
