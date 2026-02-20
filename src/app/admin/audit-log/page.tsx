import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Audit Log | Admin — EduPlan360' }

export default async function AuditLogPage({
  searchParams,
}: {
  searchParams: Promise<{ entity?: string; action?: string; page?: string }>
}) {
  const { entity, action, page: pageStr } = await searchParams
  const page = parseInt(pageStr ?? '1', 10)
  const pageSize = 30
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createClient()
  let query = supabase
    .from('audit_log')
    .select(`
      id, action, entity_type, entity_id, before_json, after_json, created_at,
      portal_profiles(full_name)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (entity) query = query.eq('entity_type', entity)
  if (action) query = query.ilike('action', `%${action}%`)

  const { data, count } = await query
  const totalPages = Math.ceil((count ?? 0) / pageSize)

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
        <p className="text-slate-500 text-sm mt-1">{count ?? 0} total events. Every admin state change is recorded.</p>
      </div>

      {/* Filters */}
      <form className="flex gap-3 mb-6 flex-wrap">
        <input name="entity" defaultValue={entity} placeholder="Filter by entity (e.g. application)" className="border border-slate-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" />
        <input name="action" defaultValue={action} placeholder="Filter by action (e.g. STATUS)" className="border border-slate-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-52" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">Filter</button>
        {(entity || action) && <a href="/admin/audit-log" className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors self-center">Clear</a>}
      </form>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {!data || data.length === 0 ? (
          <div className="py-16 text-center"><p className="text-slate-400">No audit events found.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Action</span>
              <span>Entity</span>
              <span>Actor</span>
              <span>Time</span>
              <span>Diff</span>
            </div>
            <div className="divide-y divide-slate-50">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(data as any[]).map(row => {
                const profile = Array.isArray(row.portal_profiles) ? row.portal_profiles[0] : row.portal_profiles
                const hasDiff = row.before_json || row.after_json
                return (
                  <details key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                    <summary className="grid grid-cols-[1fr_1.2fr_1fr_1fr_auto] gap-4 px-6 py-3 items-center cursor-pointer list-none">
                      <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full truncate">{row.action}</span>
                      <span className="text-sm text-slate-700">
                        <span className="text-xs text-slate-400">{row.entity_type}</span>
                        {row.entity_id && <span className="block text-xs font-mono text-slate-400 truncate">{row.entity_id.slice(0, 12)}…</span>}
                      </span>
                      <span className="text-sm text-slate-700">{profile?.full_name ?? '—'}</span>
                      <span className="text-xs text-slate-400">{new Date(row.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      {hasDiff ? <span className="text-xs text-blue-500 group-open:rotate-90 transition-transform inline-block">▶</span> : <span />}
                    </summary>
                    {hasDiff && (
                      <div className="px-6 pb-4 grid sm:grid-cols-2 gap-3 text-xs">
                        {row.before_json && (
                          <div>
                            <p className="text-xs font-semibold text-red-600 mb-1">Before</p>
                            <pre className="bg-red-50 border border-red-100 rounded-lg p-3 overflow-x-auto text-red-700 whitespace-pre-wrap">{JSON.stringify(row.before_json, null, 2)}</pre>
                          </div>
                        )}
                        {row.after_json && (
                          <div>
                            <p className="text-xs font-semibold text-green-600 mb-1">After</p>
                            <pre className="bg-green-50 border border-green-100 rounded-lg p-3 overflow-x-auto text-green-700 whitespace-pre-wrap">{JSON.stringify(row.after_json, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </details>
                )
              })}
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && <a href={`/admin/audit-log?${new URLSearchParams({ ...(entity ? { entity } : {}), ...(action ? { action } : {}), page: String(page - 1) })}`} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">← Prev</a>}
            {page < totalPages && <a href={`/admin/audit-log?${new URLSearchParams({ ...(entity ? { entity } : {}), ...(action ? { action } : {}), page: String(page + 1) })}`} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Next →</a>}
          </div>
        </div>
      )}
    </div>
  )
}
