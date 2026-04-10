'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, FolderOpen, PlusCircle, FileText,
  User, Menu, X, LogOut, Bell
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import LogoutModal from '@/components/shared/LogoutModal'

const NAV = [
  { href: '/portal/dashboard',      label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/portal/applications',   label: 'Applications',  icon: FolderOpen },
  { href: '/portal/applications/new', label: 'New Application', icon: PlusCircle },
  { href: '/portal/documents',      label: 'Documents',     icon: FileText },
  { href: '/portal/notifications',  label: 'Notifications', icon: Bell },
  { href: '/portal/profile',        label: 'My Profile',    icon: User },
]

interface Props {
  profile: { full_name: string; email: string; role: string } | null
}

export default function PortalSidebar({ profile }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/sign-in')
    router.refresh()
  }

  const SidebarContent = (
    <nav className="flex flex-col h-full py-6 px-4">
      {/* Logo */}
      <div className="mb-8 px-2">
        <Link href="/portal/dashboard" onClick={() => setOpen(false)}>
          <Image src="/eduplan.png" alt="EduPlan360" width={130} height={36} className="h-8 w-auto brightness-0 invert" priority />
        </Link>
        <p className="text-[10px] text-slate-500 mt-1 ml-1 font-bold uppercase tracking-widest opacity-80">Student Portal</p>
      </div>

      {/* Nav links */}
      <div className="space-y-1 flex-1 overflow-y-auto min-h-0 custom-scrollbar">
        {NAV.map(item => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== '/portal/dashboard' && pathname.startsWith(item.href + (item.href.includes('new') ? '' : '/')))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Profile + logout */}
      <div className="mt-auto pt-4 border-t border-slate-800">
        {profile && (
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2 bg-slate-800/50 rounded-xl border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-100 truncate tracking-tight">{profile.full_name}</p>
              <p className="text-[10px] text-slate-500 truncate">{profile.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-slate-900 border-r border-slate-800 fixed top-0 left-0 h-screen z-30 shadow-xl">
        {SidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 py-3">
        <Link href="/portal/dashboard">
          <Image src="/eduplan.png" alt="EduPlan360" width={110} height={30} className="h-7 w-auto brightness-0 invert" />
        </Link>
        <button onClick={() => setOpen(true)} className="p-2 text-slate-400 hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 md:hidden flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-end px-4 pt-4 shrink-0">
              <button onClick={() => setOpen(false)} className="text-slate-400 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {SidebarContent}
          </div>
        </>
      )}

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </>
  )
}
