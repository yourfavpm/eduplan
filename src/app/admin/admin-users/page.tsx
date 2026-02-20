import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Users | Admin — EduPlan360' }

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portal_profiles')
    .select('id, full_name, email, phone, role, created_at, profile_completed')
    .eq('role', 'admin')
    .order('created_at', { ascending: false })

  const admins = data ?? []

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
          <p className="text-slate-500 text-sm mt-1">{admins.length} admin accounts</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <p className="text-xs font-medium text-amber-700">To add an admin: create user in Supabase Auth → set <code className="font-mono">role = &apos;admin&apos;</code> in <code className="font-mono">portal_profiles</code>.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {admins.length === 0 ? (
          <div className="py-16 text-center"><p className="text-slate-400">No admin accounts found.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Joined</span>
            </div>
            <div className="divide-y divide-slate-50">
              {admins.map(admin => (
                <div key={admin.id} className="grid grid-cols-[2fr_2fr_1.5fr_1fr] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
                      {admin.full_name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{admin.full_name}</p>
                  </div>
                  <p className="text-sm text-slate-600">{admin.email}</p>
                  <span className="inline-flex items-center text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full w-fit">
                    {admin.role}
                  </span>
                  <p className="text-xs text-slate-400">{new Date(admin.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Role descriptions */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Role Descriptions</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { role: 'admin', desc: 'Full access to all modules, data, and settings.' },
            { role: 'admissions_admin', desc: 'Students, applications, documents, and status updates.' },
            { role: 'content_admin', desc: 'Website CMS modules only. No student data.' },
            { role: 'finance_admin', desc: 'Payments module only.' },
            { role: 'support_admin', desc: 'Notes and limited student profile view.' },
          ].map(r => (
            <div key={r.role} className="bg-slate-50 rounded-xl px-4 py-3">
              <p className="font-mono text-xs font-bold text-purple-700 mb-0.5">{r.role}</p>
              <p className="text-xs text-slate-500">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
