'use client'

import { LogOut, Loader2, AlertCircle } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoggingOut: boolean
}

export default function LogoutModal({ isOpen, onClose, onConfirm, isLoggingOut }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm logout</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Are you sure you want to sign out? You will need to log in again to access your dashboard.
          </p>
        </div>

        <div className="p-4 bg-slate-50 flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Sign Out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
