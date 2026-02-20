import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Roles | Admin — EduPlan360' }

const ROLES = [
  { name: 'admin', label: 'Super Admin', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'admissions_admin', label: 'Admissions Admin', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'content_admin', label: 'Content Admin', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'finance_admin', label: 'Finance Admin', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'support_admin', label: 'Support Admin', color: 'bg-slate-50 text-slate-600 border-slate-200' },
]

const MODULES = [
  { name: 'Overview', roles: ['admin', 'admissions_admin', 'finance_admin', 'support_admin'] },
  { name: 'Students', roles: ['admin', 'admissions_admin', 'support_admin'] },
  { name: 'Applications', roles: ['admin', 'admissions_admin'] },
  { name: 'Document Review', roles: ['admin', 'admissions_admin'] },
  { name: 'Payments', roles: ['admin', 'finance_admin'] },
  { name: 'Homepage', roles: ['admin', 'content_admin'] },
  { name: 'Destinations', roles: ['admin', 'content_admin'] },
  { name: 'Scholarships', roles: ['admin', 'content_admin'] },
  { name: 'Events', roles: ['admin', 'content_admin'] },
  { name: 'Blog / News', roles: ['admin', 'content_admin'] },
  { name: 'Services', roles: ['admin', 'content_admin'] },
  { name: 'Associates', roles: ['admin', 'content_admin'] },
  { name: 'Media Library', roles: ['admin', 'content_admin'] },
  { name: 'Document Types', roles: ['admin', 'admissions_admin'] },
  { name: 'Admin Users', roles: ['admin'] },
  { name: 'Roles', roles: ['admin'] },
  { name: 'Audit Log', roles: ['admin'] },
  { name: 'Settings', roles: ['admin', 'content_admin'] },
]

export default function RolesPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Roles & Permissions</h1>
        <p className="text-slate-500 text-sm mt-1">Permission matrix showing which modules each role can access.</p>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ROLES.map(r => (
          <span key={r.name} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${r.color}`}>{r.label}</span>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-48">Module</th>
              {ROLES.map(r => (
                <th key={r.name} className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {r.label.split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MODULES.map(m => (
              <tr key={m.name} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-3 text-sm text-slate-700">{m.name}</td>
                {ROLES.map(r => (
                  <td key={r.name} className="px-4 py-3 text-center">
                    {m.roles.includes(r.name) ? (
                      <span className="flex w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs items-center justify-center mx-auto leading-5">✓</span>
                    ) : (
                      <span className="flex w-5 h-5 rounded-full bg-slate-100 text-slate-300 text-xs items-center justify-center mx-auto leading-5">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
        <strong>Note:</strong> Role enforcement is applied in Supabase RLS policies and Next.js layout guards. This matrix is a reference view only.
      </div>
    </div>
  )
}
