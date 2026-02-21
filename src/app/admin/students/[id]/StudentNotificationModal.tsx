'use client'

import { useState, useTransition } from 'react'
import { Bell, X, Send } from 'lucide-react'

export default function StudentNotificationModal({ studentId }: { studentId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function submitNotification(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/students/${studentId}/notifications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, message }),
        })

        if (!res.ok) {
          const data = await res.json()
          setError(data.error || 'Failed to send notification')
          return
        }

        setSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          setSuccess(false)
          setTitle('')
          setMessage('')
        }, 1500)
      } catch {
        setError('An unexpected error occurred')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
      >
        <Bell className="w-4 h-4" /> Send Notification
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" /> Notify Student
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                disabled={isPending}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitNotification} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-100 rounded-lg text-sm font-medium">
                  Notification sent successfully!
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Alert Title</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Missing Document Signature"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isPending || success}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message Content</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide details about what the student needs to do..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isPending || success}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || success}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isPending ? 'Sending...' : (
                    <>
                      <Send className="w-4 h-4" /> Dispatch
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
