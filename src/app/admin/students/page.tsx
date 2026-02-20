import { getStudents } from '@/lib/supabase/admin'
import Link from 'next/link'
import StatusBadge from '@/components/portal/StatusBadge'
import type { Metadata } from 'next'
import type { ApplicationStatus } from '@/types/portal'

export const metadata: Metadata = { title: 'Students | Admin — EduPlan360' }

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>
}) {
  const { q, page: pageStr, status } = await searchParams
  const page = parseInt(pageStr ?? '1', 10)
  const { students, total } = await getStudents({ search: q, status, page, pageSize: 25 })
  const totalPages = Math.ceil(total / 25)

  return (
    <div className="max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500 text-sm mt-1">{total} registered students</p>
        </div>
      </div>

      {/* Search + filters */}
      <form className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name or email…"
          className="flex-1 min-w-56 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <select
          name="status"
          defaultValue={status}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="INCOMPLETE_DOCUMENTS">Incomplete Documents</option>
          <option value="PAY_APPLICATION_FEES">Pay App Fee</option>
          <option value="APPLICATION_SUBMITTED">Submitted</option>
          <option value="OFFER_SENT">Offer Sent</option>
          <option value="PREPARE_FOR_INTERVIEW">Interview Prep</option>
          <option value="PAY_TUITION_DEPOSIT">Tuition Deposit</option>
          <option value="CAS_ISSUED">CAS Issued</option>
          <option value="PROCESS_VISA">Process Visa</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          Search
        </button>
        {(q || status) && (
          <Link href="/admin/students" className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {students.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400">No students found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Student</span>
              <span>Contact</span>
              <span>Location</span>
              <span>Status</span>
              <span></span>
            </div>

            <div className="divide-y divide-slate-50">
              {students.map(s => (
                <div key={s.id} className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_auto] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.full_name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-700">{s.email}</p>
                    {s.phone && <p className="text-xs text-slate-400">{s.phone}</p>}
                  </div>
                  <p className="text-sm text-slate-600">{s.location ?? '—'}</p>
                  <div>
                    {s.applicationStatus
                      ? <StatusBadge status={s.applicationStatus as ApplicationStatus} />
                      : <span className="text-xs text-slate-400">No application</span>
                    }
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/students/${s.id}`} className="text-xs text-blue-600 font-medium hover:underline whitespace-nowrap">
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/students?${new URLSearchParams({ ...(q ? { q } : {}), ...(status ? { status } : {}), page: String(page - 1) })}`}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link href={`/admin/students?${new URLSearchParams({ ...(q ? { q } : {}), ...(status ? { status } : {}), page: String(page + 1) })}`}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
