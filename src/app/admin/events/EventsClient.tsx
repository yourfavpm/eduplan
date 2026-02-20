'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Check, Star, MapPin } from 'lucide-react'

type Event = {
  id: string; title: string; description: string | null; event_date: string | null;
  location: string | null; image: string | null; registration_link: string | null;
  featured: boolean; published: boolean
}

const EMPTY = { title: '', description: '', event_date: '', location: '', image: '', registration_link: '', featured: false, published: true }

export default function EventsClient({ initialItems }: { initialItems: Event[] }) {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [isPending, startTransition] = useTransition()

  function openNew() { setForm(EMPTY); setEditing(null); setShowForm(true) }
  function openEdit(item: Event) {
    setForm({ title: item.title, description: item.description ?? '', event_date: item.event_date ? item.event_date.slice(0, 16) : '', location: item.location ?? '', image: item.image ?? '', registration_link: item.registration_link ?? '', featured: item.featured, published: item.published })
    setEditing(item); setShowForm(true)
  }

  function save() {
    startTransition(async () => {
      const url = editing ? `/api/admin/cms/events/${editing.id}` : '/api/admin/cms/events'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.id) {
        if (editing) setItems(prev => prev.map(i => i.id === editing.id ? data : i))
        else setItems(prev => [data, ...prev])
        setShowForm(false)
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Delete this event?')) return
    startTransition(async () => {
      await fetch(`/api/admin/cms/events/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== id))
    })
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-slate-900">Events</h1><p className="text-slate-500 text-sm mt-1">{items.length} events</p></div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"><Plus className="w-4 h-4" /> Add Event</button>
      </div>

      {showForm && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">{editing ? 'Edit Event' : 'New Event'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {([['title', 'Title *', 'text'], ['event_date', 'Date & Time', 'datetime-local'], ['location', 'Location', 'text'], ['registration_link', 'Registration Link', 'text'], ['image', 'Image URL', 'text']] as [string, string, string][]).map(([key, label, type]) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                <input type={type} value={(form as Record<string, unknown>)[key] as string} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="rounded" /> Featured</label>
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="rounded" /> Published</label>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} disabled={isPending || !form.title.trim()} className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"><Check className="w-3.5 h-3.5" /> Save</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {items.length === 0 ? <div className="py-16 text-center"><p className="text-slate-400">No events yet.</p></div> : (
          <div className="divide-y divide-slate-50">
            {items.map(item => (
              <div key={item.id} className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    {item.featured && <Star className="w-3.5 h-3.5 text-amber-500" />}
                    {!item.published && <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Draft</span>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    {item.event_date && <span>{new Date(item.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                    {item.location && <><MapPin className="w-3 h-3" />{item.location}</>}
                  </p>
                </div>
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
