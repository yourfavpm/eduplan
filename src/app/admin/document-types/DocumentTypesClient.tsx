'use client'

import { useState, useTransition } from 'react'
import type { DocumentType } from '@/types/portal'
import { FileText, Plus, Pencil, Trash2, Check, X, ToggleLeft, ToggleRight } from 'lucide-react'

// Server actions called from client via fetch pattern
async function serverCreateType(name: string, description: string, required: boolean) {
  const res = await fetch('/api/admin/document-types', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, required }),
  })
  return res.json()
}

async function serverUpdateType(id: string, fields: object) {
  const res = await fetch(`/api/admin/document-types/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  })
  return res.json()
}

async function serverDeleteType(id: string) {
  await fetch(`/api/admin/document-types/${id}`, { method: 'DELETE' })
}

interface Props {
  initialTypes: DocumentType[]
}

export default function DocumentTypesClient({ initialTypes }: Props) {
  const [types, setTypes] = useState<DocumentType[]>(initialTypes)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Form state
  const [form, setForm] = useState({ name: '', description: '', required: true })
  const [editForm, setEditForm] = useState({ name: '', description: '', required: true })

  function openEdit(type: DocumentType) {
    setEditId(type.id)
    setEditForm({ name: type.name, description: type.description ?? '', required: type.required })
  }

  function handleCreate() {
    if (!form.name.trim()) return
    startTransition(async () => {
      const result = await serverCreateType(form.name.trim(), form.description.trim(), form.required)
      if (result?.id) {
        setTypes(prev => [result, ...prev])
        setForm({ name: '', description: '', required: true })
        setShowAdd(false)
      }
    })
  }

  function handleUpdate(id: string) {
    startTransition(async () => {
      await serverUpdateType(id, editForm)
      setTypes(prev => prev.map(t => t.id === id ? { ...t, ...editForm } : t))
      setEditId(null)
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this document type? This cannot be undone.')) return
    startTransition(async () => {
      await serverDeleteType(id)
      setTypes(prev => prev.filter(t => t.id !== id))
    })
  }

  function handleToggle(type: DocumentType) {
    startTransition(async () => {
      await serverUpdateType(type.id, { required: !type.required })
      setTypes(prev => prev.map(t => t.id === type.id ? { ...t, required: !t.required } : t))
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Types</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Define which document types students can be asked to upload.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(v => !v)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Type
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">New Document Type</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Passport"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Optional description for student"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.required}
                onChange={e => setForm(f => ({ ...f, required: e.target.checked }))}
                className="rounded"
              />
              Required
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={isPending || !form.name.trim()}
                className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {types.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No document types yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Type" to create the first one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-[2fr_3fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <span>Name</span>
            <span>Description</span>
            <span>Required</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-slate-50">
            {types.map(type => (
              <div key={type.id} className="grid grid-cols-[2fr_3fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors">
                {editId === type.id ? (
                  <>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      className="border border-blue-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                      className="border border-blue-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Description"
                    />
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.required}
                        onChange={e => setEditForm(f => ({ ...f, required: e.target.checked }))}
                        className="rounded"
                      />
                    </label>
                    <div className="flex gap-1">
                      <button onClick={() => handleUpdate(type.id)} disabled={isPending} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditId(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-sm font-medium text-slate-800">{type.name}</span>
                    </div>
                    <span className="text-sm text-slate-500 truncate">{type.description ?? '—'}</span>
                    <button
                      onClick={() => handleToggle(type)}
                      disabled={isPending}
                      title="Toggle required"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    >
                      {type.required ? (
                        <><ToggleRight className="w-5 h-5 text-blue-600" /><span className="text-blue-600">Required</span></>
                      ) : (
                        <><ToggleLeft className="w-5 h-5 text-slate-400" /><span className="text-slate-400">Optional</span></>
                      )}
                    </button>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(type)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(type.id)} disabled={isPending} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
