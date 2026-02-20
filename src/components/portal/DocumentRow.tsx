import { DOC_TYPE_LABELS } from '@/types/portal'
import StatusBadge from './StatusBadge'
import type { PortalDocument } from '@/types/portal'

interface DocumentRowProps {
  document: PortalDocument
  onUpload?: () => void
}

export default function DocumentRow({ document, onUpload }: DocumentRowProps) {
  const label = DOC_TYPE_LABELS[document.doc_type] ?? document.doc_type
  const date = new Date(document.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="flex items-center justify-between py-4 px-0 group">
      <div className="flex items-center gap-3 min-w-0">
        {/* Icon */}
        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{label}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {document.file_name} · {date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <StatusBadge status={document.status} />
        <button
          onClick={onUpload}
          className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-blue-50"
        >
          Replace
        </button>
      </div>
    </div>
  )
}
