'use client'

import { useState } from 'react'
import { Search, ChevronDown, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
  adminName: string
  adminEmail: string
}

export default function AdminTopBar({ adminName, adminEmail }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/sign-in')
  }

  return (
    <header className="hidden md:flex items-center justify-between gap-4 px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
      {/* Global search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search students, applications…"
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
        />
      </div>

      {/* Admin profile menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="flex items-center gap-2.5 hover:bg-slate-50 px-3 py-2 rounded-xl transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-800 leading-none">{adminName}</p>
            <p className="text-xs text-slate-400 mt-0.5">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-100 shadow-lg z-20 py-1">
              <div className="px-4 py-3 border-b border-slate-50">
                <p className="text-sm font-medium text-slate-800">{adminName}</p>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{adminEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
