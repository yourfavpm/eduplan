import Link from 'next/link'
import type { Metadata } from 'next'
import { Home, MapPin, Award, CalendarDays, BookOpen, Briefcase, UserCheck, Settings, Globe } from 'lucide-react'

export const metadata: Metadata = { title: 'Pages | Admin — EduPlan360' }

const CMS_MODULES = [
  { href: '/admin/homepage', label: 'Homepage', description: 'Hero, services, destinations, stats, CTAs, partnerships', icon: Home, status: 'live' },
  { href: '/admin/destinations', label: 'Destinations', description: 'Country profiles, benefits, partner universities', icon: MapPin, status: 'live' },
  { href: '/admin/scholarships', label: 'Scholarships', description: 'Scholarship listings with deadline and level filters', icon: Award, status: 'live' },
  { href: '/admin/events', label: 'Events', description: 'Events calendar with featured and location', icon: CalendarDays, status: 'live' },
  { href: '/admin/blog', label: 'Blog / News', description: 'Higher Education News posts with categories', icon: BookOpen, status: 'live' },
  { href: '/admin/services', label: 'Services', description: 'Service tiles shown on homepage and services page', icon: Briefcase, status: 'live' },
  { href: '/admin/associates', label: 'Associates', description: 'Associate directory and public landing page copy', icon: UserCheck, status: 'live' },
  { href: '/admin/media', label: 'Media Library', description: 'Upload and manage images and PDF assets', icon: Globe, status: 'live' },
  { href: '/admin/settings', label: 'Site Settings', description: 'Contact details, social links, footer config', icon: Settings, status: 'live' },
]

export default function PagesPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Website Modules</h1>
        <p className="text-slate-500 text-sm mt-1">Manage public-facing content for every section of the website. Structured editors only — no free-form editing.</p>
      </div>

      <div className="grid gap-3">
        {CMS_MODULES.map(m => {
          const Icon = m.icon
          return (
            <Link
              key={m.href}
              href={m.href}
              className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-4 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-800">{m.label}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">Live</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{m.description}</p>
              </div>
              <span className="text-slate-400 group-hover:text-blue-600 text-sm transition-colors">→</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
