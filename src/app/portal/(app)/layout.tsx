import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalSidebar from '@/components/portal/PortalSidebar'

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/portal/sign-in')

  // Fetch first name for sidebar
  const { data: profile } = await supabase
    .from('portal_profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Student'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <PortalSidebar firstName={firstName} role={profile?.role ?? 'student'} />

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  )
}
