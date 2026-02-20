import { Check, Circle } from 'lucide-react'
import type { ApplicationStatus } from '@/types/portal'

interface TimelineItemProps {
  label: string
  date?: string | null
  status: ApplicationStatus
  isCurrent?: boolean
  isCompleted?: boolean
  isLast?: boolean
  note?: string | null
}

export default function TimelineItem({
  label,
  date,
  isCurrent = false,
  isCompleted = false,
  isLast = false,
  note,
}: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      {/* Indicator column */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isCompleted
              ? 'bg-green-500 text-white'
              : isCurrent
              ? 'bg-blue-600 text-white ring-4 ring-blue-100'
              : 'bg-slate-100 text-slate-400'
          }`}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            <Circle className="w-3 h-3" fill={isCurrent ? 'white' : 'transparent'} />
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 min-h-[24px] ${isCompleted ? 'bg-green-200' : 'bg-slate-100'}`} />
        )}
      </div>

      {/* Content */}
      <div className="pb-6 min-w-0">
        <p
          className={`text-sm font-medium leading-tight ${
            isCompleted ? 'text-slate-700' : isCurrent ? 'text-blue-700' : 'text-slate-400'
          }`}
        >
          {label}
        </p>
        {date && (
          <p className="text-xs text-slate-400 mt-0.5">{date}</p>
        )}
        {note && (
          <p className="text-xs text-slate-500 mt-1 italic">{note}</p>
        )}
      </div>
    </div>
  )
}
