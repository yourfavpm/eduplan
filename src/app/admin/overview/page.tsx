import { getOverviewStats } from '@/lib/supabase/admin'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Users, FileText, CreditCard, Mic, Globe, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Overview | Admin — EduPlan360' }

function StatCard({
  label, value, sub, href, color,
}: {
  label: string; value: number; sub?: string; href: string; color: string
}) {
  return (
    <Link href={href} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-shadow group">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      <div className="flex items-center gap-1 mt-4 text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
        View <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  )
}

export default async function OverviewPage() {
  const stats = await getOverviewStats()

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Operations Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Actionable summary — items requiring your attention today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="New Signups (7d)"
          value={stats.newSignups}
          sub="Students registered this week"
          href="/admin/students"
          color="text-blue-600"
        />
        <StatCard
          label="Docs Needing Review"
          value={stats.docsNeedingReview}
          sub="Uploaded, awaiting approval"
          href="/admin/documents"
          color="text-amber-600"
        />
        <StatCard
          label="Unpaid App Fees"
          value={stats.unpaidApplicationFees}
          sub="At PAY_APPLICATION_FEES stage"
          href="/admin/payments"
          color="text-red-600"
        />
        <StatCard
          label="Interview Prep"
          value={stats.interviewPrep}
          sub="Currently in interview stage"
          href="/admin/applications"
          color="text-purple-600"
        />
        <StatCard
          label="Visa Processing"
          value={stats.visaProcessing}
          sub="At PROCESS_VISA stage"
          href="/admin/applications"
          color="text-green-600"
        />
        <StatCard
          label="Total Applications"
          value={stats.totalApplications}
          sub="All time"
          href="/admin/applications"
          color="text-slate-700"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Review Document Queue', href: '/admin/documents', icon: FileText, color: 'text-amber-600 bg-amber-50' },
            { label: 'View All Students', href: '/admin/students', icon: Users, color: 'text-blue-600 bg-blue-50' },
            { label: 'Manage Payments', href: '/admin/payments', icon: CreditCard, color: 'text-green-600 bg-green-50' },
            { label: 'Add Event', href: '/admin/events', icon: Mic, color: 'text-purple-600 bg-purple-50' },
            { label: 'Add Scholarship', href: '/admin/scholarships', icon: Globe, color: 'text-rose-600 bg-rose-50' },
          ].map(a => {
            const Icon = a.icon
            return (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700">{a.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
