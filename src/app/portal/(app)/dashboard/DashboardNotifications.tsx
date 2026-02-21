'use client'

import { useState } from 'react'
import { BellDot, Check } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  created_at: string
}

export default function DashboardNotifications({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = useState(initialNotifications)

  async function markAsRead(id: string) {
    // Optimistic UI update
    setNotifications(prev => prev.filter(n => n.id !== id))
    
    // Fire and forget cleanly
    fetch(`/api/portal/notifications/${id}/read`, { method: 'PATCH' }).catch(console.error)
  }

  if (notifications.length === 0) return null

  return (
    <div className="space-y-3 mb-8">
      {notifications.map(n => (
        <div 
          key={n.id} 
          className="bg-blue-600/5 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100/50 rounded-full flex items-center justify-center shrink-0">
              <BellDot className="w-5 h-5 text-blue-600 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">Attention Required</p>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{n.title}</h3>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">
                {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => markAsRead(n.id)}
            className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 font-medium px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm"
          >
            <Check className="w-4 h-4" /> Acknowledge
          </button>
        </div>
      ))}
    </div>
  )
}
