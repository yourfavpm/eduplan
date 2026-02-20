import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getPortalProfile, getPortalApplication } from '@/lib/supabase/portal'
import StatusStepper from '@/components/portal/StatusStepper'
import ActionCard from '@/components/portal/ActionCard'
import StatusBadge from '@/components/portal/StatusBadge'
import { FileText, Upload, CreditCard, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Student Portal — EduPlan360',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/sign-in')

  const [profile, application] = await Promise.all([
    getPortalProfile(user.id),
    getPortalApplication(user.id),
  ])

  if (!profile) redirect('/portal/sign-in')

  const firstName = profile.full_name.split(' ')[0]
  const profileComplete = profile.profile_completed && !!application

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">

      {/* ── Welcome ─────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-slate-500 mt-1">Here&apos;s your application progress.</p>
      </div>

      {/* ── Incomplete Profile Banner ────────────────────── */}
      {!profileComplete && (
        <div className="bg-blue-600 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-white font-semibold text-lg">Complete your student profile</h2>
            <p className="text-blue-100 text-sm mt-1">
              Tell us about your study goals to get your application started.
            </p>
          </div>
          <Link
            href="/portal/profile"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors shrink-0"
          >
            Complete Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* ── Status Stepper ───────────────────────────────── */}
      {application && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">Application Progress</h2>
          <StatusStepper currentStatus={application.status} />
        </div>
      )}

      {/* ── Next Action Card ─────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Next Action Required</h2>
        <ActionCard profileComplete={profileComplete} application={application} />
      </div>

      {/* ── Application Summary Mini Panel ──────────────── */}
      {application && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Application Summary</h2>
            <Link href="/portal/application" className="text-xs text-blue-600 hover:underline font-medium">
              View full details →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SummaryItem label="Destination" value={application.destination ?? '—'} />
            <SummaryItem label="Preferred University" value={application.preferred_university ?? '—'} />
            <SummaryItem label="Course 1" value={application.proposed_course_1 ?? '—'} />
            <SummaryItem label="Qualification" value={application.highest_qualification ?? '—'} />
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <StatusBadge status={application.status} size="md" />
          </div>
        </div>
      )}

      {/* ── Quick Links ──────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Quick Links</h2>
        <div className="grid grid-cols-3 gap-3">
          <QuickLink href="/portal/documents" icon={<Upload className="w-5 h-5" />} label="Documents" />
          <QuickLink href="/portal/payments" icon={<CreditCard className="w-5 h-5" />} label="Payments" />
          <QuickLink href="/portal/application" icon={<FileText className="w-5 h-5" />} label="Track Application" />
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm text-slate-800 font-medium">{value}</p>
    </div>
  )
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 py-5 bg-white rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors duration-150 text-xs font-medium"
    >
      {icon}
      {label}
    </Link>
  )
}
