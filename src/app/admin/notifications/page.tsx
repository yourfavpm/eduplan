import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Bell, User, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notification History | Admin — EduPlan360',
}

export default async function AdminNotificationHistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const { data: notifications, error } = await supabase
    .from('portal_notifications')
    .select(`
      *,
      student:portal_profiles!portal_notifications_user_id_fkey(full_name, email),
      admin:portal_profiles!portal_notifications_sender_admin_id_fkey(full_name),
      application:applications(study_destination)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching notification history:', error)
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Notification History</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Track all automated and manual communications sent to students.
        </p>
      </div>

      {!notifications || notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400">No notifications have been sent yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Context</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {notifications.map((n: any) => (
                  <tr key={n.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(n.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                      <p className="text-[10px] text-slate-300 ml-5.5">
                         {new Date(n.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">{n.student?.full_name || 'System User'}</p>
                      <p className="text-xs text-slate-400">{n.student?.email || '—'}</p>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm font-medium text-slate-800 truncate">{n.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {n.application_id ? (
                        <Link 
                          href={`/admin/applications/${n.application_id}`}
                          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline bg-blue-50 px-2.5 py-1.5 rounded-lg"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {n.application?.study_destination || 'App Detail'}
                        </Link>
                      ) : (
                        <span className="text-xs text-slate-400">General</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {n.admin?.full_name || 'System'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
