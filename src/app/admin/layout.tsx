import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/portal/sign-in')

  const { data: profile } = await supabase
    .from('portal_profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/portal/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm">EduPlan360 Admin</span>
            <p className="text-xs text-slate-400">Logged in as {profile.full_name}</p>
          </div>
        </div>
        <a
          href="/portal/dashboard"
          className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          ← Back to Portal
        </a>
      </header>

      {/* Page content */}
      <main className="p-6 md:p-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  )
}
