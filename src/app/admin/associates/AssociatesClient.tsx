'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Check, ToggleLeft, ToggleRight } from 'lucide-react'

type Associate = { id: string; name: string; country: string | null; state: string | null; image: string | null; bio: string | null; status_active: boolean }
const EMPTY = { name: '', country: '', state: '', image: '', bio: '', status_active: true }

export default function AssociatesClient({ initialItems }: { initialItems: Associate[] }) {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Associate | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [isPending, startTransition] = useTransition()

  function openNew() { setForm(EMPTY); setEditing(null); setShowForm(true) }
  function openEdit(item: Associate) { setForm({ name: item.name, country: item.country ?? '', state: item.state ?? '', image: item.image ?? '', bio: item.bio ?? '', status_active: item.status_active }); setEditing(item); setShowForm(true) }

  function save() {
    startTransition(async () => {
      const url = editing ? `/api/admin/cms/associates/${editing.id}` : '/api/admin/cms/associates'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.id) { if (editing) setItems(prev => prev.map(i => i.id === editing.id ? data : i)); else setItems(prev => [data, ...prev]); setShowForm(false) }
    })
  }

  function remove(id: string) {
    if (!confirm('Delete this associate?')) return
    startTransition(async () => { await fetch(`/api/admin/cms/associates/${id}`, { method: 'DELETE' }); setItems(prev => prev.filter(i => i.id !== id)) })
  }

  function toggleActive(item: Associate) {
    startTransition(async () => {
      await fetch(`/api/admin/cms/associates/${item.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status_active: !item.status_active }) })
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status_active: !i.status_active } : i))
    })
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-slate-900">Associates</h1><p className="text-slate-500 text-sm mt-1">{items.length} associates</p></div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"><Plus className="w-4 h-4" /> Add Associate</button>
      </div>

      {showForm && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">{editing ? 'Edit Associate' : 'New Associate'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Name *</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Country</label><input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">State / City</label><input type="text" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Profile Image URL</label><input type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Bio</label><textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" /></div>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.status_active} onChange={e => setForm(f => ({ ...f, status_active: e.target.checked }))} className="rounded" /> Active</label>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} disabled={isPending || !form.name.trim()} className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"><Check className="w-3.5 h-3.5" /> Save</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {items.length === 0 ? <div className="py-16 text-center"><p className="text-slate-400">No associates yet.</p></div> : (
          <div className="divide-y divide-slate-50">
            {items.map(item => (
              <div key={item.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm shrink-0">{item.name.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{[item.state, item.country].filter(Boolean).join(', ')}</p>
                </div>
                <button onClick={() => toggleActive(item)} disabled={isPending} className="text-sm font-medium flex items-center gap-1.5">
                  {item.status_active ? <><ToggleRight className="w-5 h-5 text-green-500" /><span className="text-green-600 text-xs">Active</span></> : <><ToggleLeft className="w-5 h-5 text-slate-400" /><span className="text-slate-400 text-xs">Inactive</span></>}
                </button>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(item.id)} disabled={isPending} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
