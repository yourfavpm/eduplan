import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Bell, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Notifications | EduPlan360' }

export default async function NotificationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const { data: notifications } = await supabase
    .from('portal_notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Bell className="w-6 h-6 text-blue-600" /> Notifications Archive
        </h1>
        <p className="text-slate-500 mt-2 text-sm">Review past warnings, required actions, and messages from your advisors.</p>
      </div>

      {!notifications || notifications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">You are all caught up</h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">Any messages from your advisors regarding your applications will securely appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {notifications.map(n => (
            <div 
              key={n.id} 
              className={`p-6 transition-colors ${n.is_read ? 'hover:bg-slate-50' : 'bg-blue-50/30'}`}
            >
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">
                  {n.is_read ? (
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold ${n.is_read ? 'text-slate-800' : 'text-blue-900'}`}>{n.title}</h3>
                  <p className="text-sm mt-1 text-slate-600 whitespace-pre-wrap leading-relaxed">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-3 font-medium">
                    {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
