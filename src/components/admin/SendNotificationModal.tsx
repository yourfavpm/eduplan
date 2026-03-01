'use client'

import { useState, useTransition } from 'react'
import { Bell, X, Send, Loader2 } from 'lucide-react'

interface Props {
  applicationId: string
  userId: string
  studentName: string
  appDestination: string | null
}

export default function SendNotificationModal({ applicationId, userId, studentName, appDestination }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(`Update on your ${appDestination || 'application'}`)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)

  async function handleSend() {
    if (!title.trim() || !message.trim()) return

    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            title,
            message,
            applicationId
          })
        })

        if (res.ok) {
          setSuccess(true)
          setTimeout(() => {
            setIsOpen(false)
            setSuccess(false)
            setMessage('')
          }, 2000)
        } else {
          alert('Failed to send notification')
        }
      } catch (err) {
        console.error(err)
        alert('An error occurred while sending the notification')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
      >
        <Bell className="w-4 h-4 text-slate-400" />
        Send Notification
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Send Notification</h3>
                  <p className="text-xs text-slate-500">To {studentName}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {success ? (
                <div className="py-8 text-center animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Notification Sent!</h4>
                  <p className="text-slate-500 text-sm mt-1">The student will see this on their dashboard.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Notification title..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={isPending || !title.trim() || !message.trim()}
                      className="flex-2 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Send Notification
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
