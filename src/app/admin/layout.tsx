import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopBar from '@/components/admin/AdminTopBar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const { data: profile } = await supabase
    .from('portal_profiles')
    .select('role, full_name, email')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/portal/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar adminName={profile.full_name} />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="md:pl-56 flex flex-col min-h-screen">
        <AdminTopBar adminName={profile.full_name} adminEmail={profile.email} />

        <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
