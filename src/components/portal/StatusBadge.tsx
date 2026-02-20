import type { DocumentStatus } from '@/types/portal'

interface StatusBadgeProps {
  status: DocumentStatus | string
  size?: 'sm' | 'md'
}

const CONFIG: Record<string, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  uploaded: {
    label: 'Uploaded',
    className: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  approved: {
    label: 'Approved',
    className: 'bg-green-50 text-green-700 border-green-100',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-50 text-red-700 border-red-100',
  },
  missing: {
    label: 'Missing',
    className: 'bg-red-50 text-red-700 border-red-100',
  },
  // Application statuses
  INCOMPLETE_DOCUMENTS: { label: 'Incomplete', className: 'bg-amber-50 text-amber-700 border-amber-100' },
  PAY_APPLICATION_FEES: { label: 'Awaiting Fee', className: 'bg-amber-50 text-amber-700 border-amber-100' },
  APPLICATION_SUBMITTED: { label: 'Submitted', className: 'bg-blue-50 text-blue-700 border-blue-100' },
  OFFER_SENT: { label: 'Offer Received', className: 'bg-green-50 text-green-700 border-green-100' },
  PREPARE_FOR_INTERVIEW: { label: 'Interview Prep', className: 'bg-purple-50 text-purple-700 border-purple-100' },
  PAY_TUITION_DEPOSIT: { label: 'Tuition Deposit', className: 'bg-amber-50 text-amber-700 border-amber-100' },
  CAS_ISSUED: { label: 'CAS Issued', className: 'bg-green-50 text-green-700 border-green-100' },
  PROCESS_VISA: { label: 'Visa Processing', className: 'bg-blue-50 text-blue-700 border-blue-100' },
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = CONFIG[status] ?? { label: status, className: 'bg-slate-50 text-slate-600 border-slate-100' }
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${sizeClass} ${config.className}`}>
      {config.label}
    </span>
  )
}
