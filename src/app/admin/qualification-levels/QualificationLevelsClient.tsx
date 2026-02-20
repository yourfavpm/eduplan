'use client'

import { useState, useTransition } from 'react'
import { Plus, Trash2, Edit2, Check, X, GripVertical } from 'lucide-react'
import type { QualificationLevel } from '@/types/portal'

export default function QualificationLevelsClient({ initialLevels }: { initialLevels: QualificationLevel[] }) {
  const [levels, setLevels] = useState(initialLevels)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', description: '' })
  const [newForm, setNewForm] = useState({ name: '', description: '' })
  const [showNew, setShowNew] = useState(false)
  const [isPending, startTransition] = useTransition()

  function startEdit(l: QualificationLevel) {
    setEditingId(l.id)
    setEditForm({ name: l.name, description: l.description ?? '' })
  }

  function save(id: string) {
    startTransition(async () => {
      const res = await fetch(`/api/admin/cms/qualification_levels/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (res.ok) {
        setLevels(prev => prev.map(l => l.id === id ? { ...l, ...editForm } : l))
        setEditingId(null)
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Delete this qualification level? This will affect mandatory doc mappings.')) return
    startTransition(async () => {
      await fetch(`/api/admin/cms/qualification_levels/${id}`, { method: 'DELETE' })
      setLevels(prev => prev.filter(l => l.id !== id))
    })
  }

  function create() {
    if (!newForm.name.trim()) return
    startTransition(async () => {
      const res = await fetch('/api/admin/cms/qualification_levels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newForm, sort_order: levels.length + 1 }),
      })
      const data = await res.json()
      if (data.id || data[0]?.id) {
        setLevels(prev => [...prev, data[0] ?? data])
        setNewForm({ name: '', description: '' })
        setShowNew(false)
      }
    })
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Qualification Levels</h1>
          <p className="text-slate-500 text-sm mt-1">Manage qualification types. These drive the mandatory document mapping.</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Level
        </button>
      </div>

      {/* New form */}
      {showNew && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">New Qualification Level</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
              <input value={newForm.name} onChange={e => setNewForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Bachelor's" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
              <input value={newForm.description} onChange={e => setNewForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional description" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={create} disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">Create</button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {levels.length === 0 ? (
          <div className="py-12 text-center text-slate-400">No qualification levels yet.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {levels.map(level => (
              <div key={level.id} className="flex items-center gap-3 px-5 py-4">
                <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
                <div className="flex-1 min-w-0">
                  {editingId === level.id ? (
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="border border-blue-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input value={editForm.description} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))} placeholder="Description" className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none" />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-slate-800">{level.name}</p>
                      {level.description && <p className="text-xs text-slate-400 mt-0.5">{level.description}</p>}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {editingId === level.id ? (
                    <>
                      <button onClick={() => save(level.id)} disabled={isPending} className="w-7 h-7 bg-green-100 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors"><Check className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditingId(null)} className="w-7 h-7 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"><X className="w-3.5 h-3.5" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(level)} className="w-7 h-7 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => remove(level.id)} disabled={isPending} className="w-7 h-7 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
