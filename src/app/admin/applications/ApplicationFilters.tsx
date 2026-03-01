'use client'

import { Search, Filter, SortAsc } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  q?: string
  status?: string
  sort?: string
}

const STATUSES = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'INCOMPLETE_DOCUMENTS', label: 'Incomplete' },
  { value: 'PAY_APPLICATION_FEES', label: 'Payment' },
  { value: 'APPLICATION_SUBMITTED', label: 'Submitted' },
  { value: 'OFFER_SENT', label: 'Offer' },
  { value: 'PREPARE_FOR_INTERVIEW', label: 'Interview' },
  { value: 'PAY_TUITION_DEPOSIT', label: 'Deposit' },
  { value: 'CAS_ISSUED', label: 'CAS' },
  { value: 'PROCESS_VISA', label: 'Visa' },
  { value: 'WITHDRAWN', label: 'Withdrawn' },
  { value: 'UNSUCCESSFUL', label: 'Unsuccessful' },
]

export default function ApplicationFilters({ q, status, sort }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-wrap gap-4 items-center mb-6">
      <form 
        className="relative flex-1 min-w-[240px]"
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          updateParams({ q: formData.get('q') as string })
        }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          name="q"
          defaultValue={q}
          placeholder="Search by student, email, or destination..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </form>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        <select 
          value={status || 'ALL'}
          className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm focus:outline-none"
          onChange={(e) => updateParams({ status: e.target.value })}
        >
          {STATUSES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <SortAsc className="w-4 h-4 text-slate-400" />
        <select 
          value={sort || 'newest'}
          className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm focus:outline-none"
          onChange={(e) => updateParams({ sort: e.target.value })}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      
      {(q || (status && status !== 'ALL') || (sort && sort !== 'newest')) && (
        <button 
          onClick={() => router.push('/admin/applications')}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
