'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, FolderOpen, PlusCircle, FileText,
  User, Menu, X, LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/portal/dashboard',      label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/portal/applications',   label: 'Applications',  icon: FolderOpen },
  { href: '/portal/applications/new', label: 'New Application', icon: PlusCircle },
  { href: '/portal/documents',      label: 'Documents',     icon: FileText },
  { href: '/portal/profile',        label: 'My Profile',    icon: User },
]

interface Props {
  profile: { full_name: string; email: string; role: string } | null
}

export default function PortalSidebar({ profile }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/sign-in')
  }

  const Sidebar = (
    <nav className="flex flex-col h-full py-6 px-4">
      {/* Logo */}
      <div className="mb-8 px-2">
        <Link href="/portal/dashboard" onClick={() => setOpen(false)}>
          <Image src="/eduplan.png" alt="EduPlan360" width={130} height={36} className="h-8 w-auto" priority />
        </Link>
        <p className="text-xs text-slate-400 mt-0.5 ml-1 font-medium">Student Portal</p>
      </div>

      {/* Nav links */}
      <div className="space-y-1 flex-1 overflow-y-auto min-h-0">
        {NAV.map(item => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== '/portal/dashboard' && pathname.startsWith(item.href + (item.href.includes('new') ? '' : '/')))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Profile + logout */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        {profile && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs shrink-0">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{profile.full_name}</p>
              <p className="text-xs text-slate-400 truncate">{profile.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-56 bg-white border-r border-slate-100 fixed top-0 left-0 h-screen z-30">
        {Sidebar}
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-100 flex items-center justify-between px-4 py-3">
        <Image src="/eduplan.png" alt="EduPlan360" width={100} height={28} className="h-7 w-auto" />
        <button onClick={() => setOpen(true)} className="p-1.5 text-slate-600"><Menu className="w-5 h-5" /></button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 md:hidden flex flex-col">
            <div className="flex items-center justify-end px-4 pt-4">
              <button onClick={() => setOpen(false)} className="text-slate-500 bg-slate-50 p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            {Sidebar}
          </div>
        </>
      )}
    </>
  )
}
