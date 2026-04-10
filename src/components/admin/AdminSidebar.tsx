'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import LogoutModal from '@/components/shared/LogoutModal'
import {
  LayoutDashboard, Users, FileText,
  Globe, Home, MapPin, Award, CalendarDays, BookOpen,
  Briefcase, UserCheck, ImageIcon, ShieldCheck, KeyRound,
  ClipboardList, Settings, ChevronDown, ChevronRight, Menu, X,
  GraduationCap, ListChecks, Search,
} from 'lucide-react'

const NAV_GROUPS = [
  {
    label: 'OPERATIONS',
    items: [
      { href: '/admin/overview', label: 'Overview', icon: LayoutDashboard },
      { href: '/admin/applications', label: 'Applications', icon: FileText },
      { href: '/admin/students', label: 'Students', icon: Users },
      { href: '/admin/documents', label: 'Document Review', icon: Search },
    ]
  },
  {
    label: 'WEBSITE',
    items: [
      { href: '/admin/pages', label: 'All Pages', icon: Globe },
      { href: '/admin/homepage', label: 'Homepage', icon: Home },
      { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
      { href: '/admin/scholarships', label: 'Scholarships', icon: Award },
      { href: '/admin/events', label: 'Events', icon: CalendarDays },
      { href: '/admin/blog', label: 'Blog / News', icon: BookOpen },
      { href: '/admin/universities', label: 'Universities', icon: GraduationCap },
      { href: '/admin/about', label: 'About Page', icon: FileText },
      { href: '/admin/resources', label: 'Resource Guide', icon: BookOpen },
      { href: '/admin/services', label: 'Services', icon: Briefcase },
      { href: '/admin/associates', label: 'Associates', icon: UserCheck },
      { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/admin/document-types', label: 'Document Types', icon: ClipboardList },
      { href: '/admin/qualification-levels', label: 'Qualification Levels', icon: GraduationCap },
      { href: '/admin/qualification-mandatory-docs', label: 'Mandatory Doc Rules', icon: ListChecks },
      { href: '/admin/admin-users', label: 'Admin Users', icon: ShieldCheck },
      { href: '/admin/roles', label: 'Roles', icon: KeyRound },
      { href: '/admin/audit-log', label: 'Audit Log', icon: ClipboardList },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

interface Props {
  adminName: string
}

export default function AdminSidebar({ adminName }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  function toggleGroup(label: string) {
    setCollapsed(prev => ({ ...prev, [label]: !prev[label] }))
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/sign-in')
    router.refresh()
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-800 shrink-0">
        <Link href="/admin/overview" onClick={() => setOpen(false)}>
          <Image src="/eduplan.png" alt="EduPlan360" width={130} height={36} className="h-8 w-auto brightness-0 invert" priority />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto min-h-0 py-4 px-2">
        {NAV_GROUPS.map(group => {
          const isCollapsed = collapsed[group.label]
          return (
            <div key={group.label} className="mb-4">
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-3 py-1.5 mb-1 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {group.label}
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {group.items.map(item => {
                    const active = pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-800 px-4 py-3 bg-slate-900/50">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Signed in as</p>
        <p className="text-xs text-slate-200 truncate font-medium">{adminName}</p>
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="text-xs text-red-500 font-bold hover:text-red-400 transition-colors block mt-2 py-1"
        >
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-slate-900 h-screen fixed top-0 left-0 z-30 border-r border-slate-800">
        {SidebarContent()}
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <Image src="/eduplan.png" alt="EduPlan360" width={100} height={28} className="h-7 w-auto brightness-0 invert" />
        <button onClick={() => setOpen(v => !v)} className="text-slate-400 hover:text-white p-1">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-slate-900 h-full shadow-2xl animate-in slide-in-from-left duration-300">
            {SidebarContent()}
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setOpen(false)} />
        </div>
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
