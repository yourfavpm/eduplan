'use client'

import { useState, useTransition } from 'react'
import { Check } from 'lucide-react'
import type { QualificationLevel, DocumentType } from '@/types/portal'

interface Mapping { id: string; qualification_level_id: string; document_type_id: string; is_required: boolean }

interface Props {
  qualificationLevels: QualificationLevel[]
  documentTypes: DocumentType[]
  initialMappings: Mapping[]
}

export default function QualMandatoryDocsClient({ qualificationLevels, documentTypes, initialMappings }: Props) {
  const [selectedLevelId, setSelectedLevelId] = useState(qualificationLevels[0]?.id ?? '')
  const [mappings, setMappings] = useState<Mapping[]>(initialMappings)
  const [isPending, startTransition] = useTransition()
  const [savedAt, setSavedAt] = useState<string | null>(null)

  const currentMappings = mappings.filter(m => m.qualification_level_id === selectedLevelId)
  const mappedDocIds = new Set(currentMappings.map(m => m.document_type_id))

  function isRequired(docId: string): boolean {
    const m = currentMappings.find(m => m.document_type_id === docId)
    return m?.is_required ?? false
  }

  function toggle(docId: string, newRequired: boolean) {
    startTransition(async () => {
      const res = await fetch('/api/admin/qualification-mandatory-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qualification_level_id: selectedLevelId,
          document_type_id: docId,
          is_required: newRequired,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMappings(prev => {
          const existing = prev.find(m => m.qualification_level_id === selectedLevelId && m.document_type_id === docId)
          if (existing) {
            return prev.map(m => m.id === existing.id ? { ...m, is_required: newRequired } : m)
          }
          return [...prev, { id: data.id, qualification_level_id: selectedLevelId, document_type_id: docId, is_required: newRequired }]
        })
        setSavedAt(new Date().toLocaleTimeString())
      }
    })
  }

  function remove(docId: string) {
    startTransition(async () => {
      const mapping = currentMappings.find(m => m.document_type_id === docId)
      if (!mapping) return
      await fetch('/api/admin/qualification-mandatory-docs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: mapping.id }),
      })
      setMappings(prev => prev.filter(m => m.id !== mapping.id))
    })
  }

  const selectedLevel = qualificationLevels.find(l => l.id === selectedLevelId)
  const requiredCount = currentMappings.filter(m => m.is_required).length

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Mandatory Document Rules</h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure which documents are required per qualification level. When a student creates an application, these are auto-assigned.
        </p>
      </div>

      {/* Level selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-600 mb-2">Select Qualification Level</label>
        <div className="flex flex-wrap gap-2">
          {qualificationLevels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevelId(level.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                level.id === selectedLevelId
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-700'
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 flex-1">
          <p className="text-sm font-medium text-blue-800">
            <strong>{selectedLevel?.name}</strong> — {requiredCount} document{requiredCount !== 1 ? 's' : ''} required
          </p>
        </div>
        {savedAt && (
          <div className="flex items-center gap-1.5 text-xs text-green-600">
            <Check className="w-3.5 h-3.5" /> Saved {savedAt}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          <span>Document Type</span>
          <span className="text-center">Required</span>
          <span className="text-center">Remove</span>
        </div>
        <div className="divide-y divide-slate-50">
          {documentTypes.map(dt => {
            const isMapped = mappedDocIds.has(dt.id)
            const required = isRequired(dt.id)

            return (
              <div key={dt.id} className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-center transition-colors ${isMapped ? '' : 'opacity-50'}`}>
                <div>
                  <p className="text-sm font-medium text-slate-800">{dt.name}</p>
                  {dt.description && <p className="text-xs text-slate-400 mt-0.5">{dt.description}</p>}
                </div>
                <div className="flex items-center justify-center">
                  {/* Toggle: click to toggle required on/off (also adds mapping if not mapped) */}
                  <button
                    onClick={() => isMapped && required ? toggle(dt.id, false) : toggle(dt.id, true)}
                    disabled={isPending}
                    className={`relative w-10 h-6 rounded-full transition-colors focus:outline-none ${
                      isMapped && required ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                    title={isMapped && required ? 'Required — click to make optional' : 'Not required — click to make required'}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isMapped && required ? 'translate-x-4' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => isMapped ? remove(dt.id) : toggle(dt.id, false)}
                    disabled={isPending}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                      isMapped
                        ? 'text-red-500 border-red-100 hover:bg-red-50'
                        : 'text-slate-400 border-slate-100 hover:text-blue-600 hover:border-blue-100'
                    }`}
                  >
                    {isMapped ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Changes take effect immediately for new applications. Existing applications are not affected.
      </p>
    </div>
  )
}
