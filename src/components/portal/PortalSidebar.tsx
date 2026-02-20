'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Upload,
  CreditCard,
  User,
  LogOut,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/application', label: 'My Application', icon: FileText },
  { href: '/portal/documents', label: 'Documents', icon: Upload },
  { href: '/portal/payments', label: 'Payments', icon: CreditCard },
  { href: '/portal/profile', label: 'Profile', icon: User },
]

const MOBILE_NAV = [
  { href: '/portal/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/portal/application', label: 'Application', icon: FileText },
  { href: '/portal/documents', label: 'Upload', icon: Upload },
  { href: '/portal/profile', label: 'Profile', icon: User },
]

interface PortalSidebarProps {
  firstName: string
  role: string
}

export default function PortalSidebar({ firstName, role }: PortalSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/sign-in')
    router.refresh()
  }

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-100 min-h-screen fixed top-0 left-0 z-20">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">EduPlan360</span>
              <p className="text-xs text-slate-400">Student Portal</p>
            </div>
          </div>
        </div>

        {/* Student info */}
        <div className="px-6 py-4 border-b border-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{firstName}</p>
              <p className="text-xs text-slate-400">
                {role === 'admin' ? 'Administrator' : 'Student'}
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-100 ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                {label}
              </Link>
            )
          })}

          {role === 'admin' && (
            <Link
              href="/admin/applications"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mt-2"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-100"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Spacer for fixed sidebar */}
      <div className="hidden md:block w-60 shrink-0" />

      {/* ── Mobile Bottom Nav ───────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-slate-100 flex items-center justify-around px-2 py-1 safe-area-bottom">
        {MOBILE_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors ${
                active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
