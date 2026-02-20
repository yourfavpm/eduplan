'use client'

import Link from 'next/link'
import type { Application, RequiredDocument } from '@/types/portal'
import { APPLICATION_STATUSES, getStatusIndex, getNextAction } from '@/types/portal'
import DocumentRequirementRow from '@/components/portal/DocumentRequirementRow'

interface Props {
  app: Application
  requiredDocs: RequiredDocument[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statusHistory: any[]
  userId: string
  showCreatedBanner: boolean
}

const STATUS_COLORS: Record<string, string> = {
  INCOMPLETE_DOCUMENTS: 'bg-amber-50 text-amber-700 border-amber-200',
  PAY_APPLICATION_FEES: 'bg-orange-50 text-orange-700 border-orange-200',
  APPLICATION_SUBMITTED: 'bg-blue-50 text-blue-700 border-blue-200',
  OFFER_SENT: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  PREPARE_FOR_INTERVIEW: 'bg-purple-50 text-purple-700 border-purple-200',
  PAY_TUITION_DEPOSIT: 'bg-pink-50 text-pink-700 border-pink-200',
  CAS_ISSUED: 'bg-teal-50 text-teal-700 border-teal-200',
  PROCESS_VISA: 'bg-green-50 text-green-700 border-green-200',
}

export default function AppDetailClient({ app, requiredDocs, statusHistory, userId, showCreatedBanner }: Props) {
  const docs = requiredDocs
  const currentIdx = getStatusIndex(app.status)
  const nextAction = getNextAction({
    status: app.status,
    required_docs_total: docs.length,
    required_docs_done: docs.filter(d => d.status === 'approved' || d.status === 'uploaded').length,
  })

  const approved = docs.filter(d => d.status === 'approved')
  const uploaded = docs.filter(d => d.status === 'uploaded')

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/portal/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/portal/applications" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Applications
        </Link>
      </div>

      {/* Created banner */}
      {showCreatedBanner && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <div>
            <p className="text-sm font-semibold text-green-800">Application created successfully!</p>
            <p className="text-xs text-green-600 mt-0.5">Your document checklist is ready below. Upload your documents to move forward.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{app.title || app.study_destination}</h1>
            {app.title && <p className="text-slate-400 text-sm mt-0.5">{app.study_destination}</p>}
            {app.qualification_level && (
              <p className="text-xs text-slate-400 mt-1">Qualification: {app.qualification_level.name}</p>
            )}
          </div>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS_COLORS[app.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
            {APPLICATION_STATUSES.find(s => s.value === app.status)?.label ?? app.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Application Progress</h2>
        {/* Horizontal on desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {APPLICATION_STATUSES.map((s, i) => {
            const isDone = i < currentIdx
            const isCurrent = i === currentIdx
            return (
              <div key={s.value} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${isDone ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <p className={`text-xs text-center leading-tight ${isCurrent ? 'font-semibold text-blue-700' : isDone ? 'text-green-600' : 'text-slate-400'}`}>
                    {s.shortLabel}
                  </p>
                </div>
                {i < APPLICATION_STATUSES.length - 1 && (
                  <div className={`h-px flex-1 mb-4 ${isDone ? 'bg-green-300' : 'bg-slate-200'}`} />
                )}
              </div>
            )
          })}
        </div>
        {/* Vertical on mobile */}
        <div className="sm:hidden space-y-3">
          {APPLICATION_STATUSES.map((s, i) => {
            const isDone = i < currentIdx
            const isCurrent = i === currentIdx
            return (
              <div key={s.value} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isDone ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {isDone ? '✓' : i + 1}
                </div>
                <p className={`text-sm ${isCurrent ? 'font-semibold text-blue-700' : isDone ? 'text-green-600' : 'text-slate-400'}`}>
                  {s.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Next Action card */}
      {nextAction && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Next Action</p>
          <p className="text-sm font-medium text-blue-900">{nextAction}</p>
        </div>
      )}

      {/* Document Checklist */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-slate-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Document Checklist</h2>
            <span className="text-xs text-slate-400">{approved.length + uploaded.length}/{docs.length} ready</span>
          </div>
        </div>
        {docs.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-slate-400 text-sm">No documents required yet. Your advisor may add requirements soon.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {docs.map(doc => (
              <DocumentRequirementRow
                key={doc.id}
                doc={doc}
                userId={userId}
                applicationId={app.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* University Choices */}
      {app.university_choices && app.university_choices.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">University Choices</h2>
          <div className="space-y-4">
            {app.university_choices.map((uni, i) => (
              <div key={uni.id} className="bg-slate-50 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-slate-800 mb-2">
                  {i + 1}. {uni.university_name}
                  {uni.university_country && <span className="text-slate-400 font-normal ml-1.5">· {uni.university_country}</span>}
                </p>
                {uni.course_choices && uni.course_choices.length > 0 && (
                  <ul className="space-y-1">
                    {uni.course_choices.map(c => (
                      <li key={c.id} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="text-slate-300">→</span> {c.course_name}
                        <span className="text-xs text-slate-400">(Choice {c.priority})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      {statusHistory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">Status Timeline</h2>
          <div className="relative pl-5 space-y-4">
            <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200" />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {statusHistory.map((h: any) => (
              <div key={h.id} className="relative">
                <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white" />
                <p className="text-sm font-medium text-slate-800">{h.status?.replace(/_/g, ' ')}</p>
                {h.note && <p className="text-xs text-slate-400 mt-0.5 italic">&ldquo;{h.note}&rdquo;</p>}
                <p className="text-xs text-slate-300 mt-0.5">
                  {new Date(h.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
