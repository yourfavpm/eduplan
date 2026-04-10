import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PortalIndexPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/portal/sign-in')
  }

  const { data: profile } = await supabase
    .from('portal_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') {
    redirect('/admin/overview')
  }

  redirect('/portal/dashboard')
}
