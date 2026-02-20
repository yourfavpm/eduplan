import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalSidebar from '@/components/portal/PortalSidebar'

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const { data: profile } = await supabase
    .from('portal_profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <PortalSidebar profile={profile ?? null} />
      <main className="flex-1 md:ml-56 p-4 md:p-8 pt-16 md:pt-8">
        {children}
      </main>
    </div>
  )
}
