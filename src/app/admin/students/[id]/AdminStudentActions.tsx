'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { suspendStudent, reactivateStudent, softDeleteStudent } from '@/lib/supabase/admin'
import { ShieldAlert, ShieldCheck, Trash2, Loader2, AlertTriangle } from 'lucide-react'

interface Props {
  studentId: string
  status: 'active' | 'suspended'
}

export default function AdminStudentActions({ studentId, status }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState<'suspend' | 'reactivate' | 'delete' | null>(null)

  async function handleAction() {
    startTransition(async () => {
      let res
      if (showConfirm === 'suspend') res = await suspendStudent(studentId)
      else if (showConfirm === 'reactivate') res = await reactivateStudent(studentId)
      else if (showConfirm === 'delete') res = await softDeleteStudent(studentId)

      if (res?.success) {
        setShowConfirm(null)
        router.refresh()
        if (showConfirm === 'delete') router.push('/admin/students')
      } else {
        alert('Action failed: ' + (res?.error?.message || 'Unknown error'))
      }
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status === 'active' ? (
        <button
          onClick={() => setShowConfirm('suspend')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Suspend Student
        </button>
      ) : (
        <button
          onClick={() => setShowConfirm('reactivate')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Reactivate Student
        </button>
      )}

      <button
        onClick={() => setShowConfirm('delete')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete Student
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900 capitalize">
                {showConfirm} Student?
              </h3>
            </div>
            
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {showConfirm === 'delete' 
                ? "Are you sure you want to delete this student? They will no longer be visible in the student list. This is a soft-delete and can be undone via the database."
                : `Are you sure you want to ${showConfirm} this student's access to the portal?`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                disabled={isPending}
                className="flex-1 px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={isPending}
                className={`flex-1 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all flex items-center justify-center gap-2 ${
                  showConfirm === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
