'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Check, Star, Globe } from 'lucide-react'

type Post = {
  id: string; title: string; slug: string; category: string | null; excerpt: string | null;
  body: string | null; cover_image: string | null; published_at: string | null;
  featured: boolean; published: boolean
}

const EMPTY = { title: '', slug: '', category: '', excerpt: '', body: '', cover_image: '', published_at: '', featured: false, published: false }

function toSlug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

export default function BlogClient({ initialItems }: { initialItems: Post[] }) {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [isPending, startTransition] = useTransition()

  function openNew() { setForm(EMPTY); setEditing(null); setShowForm(true) }
  function openEdit(item: Post) {
    setForm({ title: item.title, slug: item.slug, category: item.category ?? '', excerpt: item.excerpt ?? '', body: item.body ?? '', cover_image: item.cover_image ?? '', published_at: item.published_at ?? '', featured: item.featured, published: item.published })
    setEditing(item); setShowForm(true)
  }

  function save() {
    startTransition(async () => {
      const payload = { ...form, slug: form.slug || toSlug(form.title) }
      const url = editing ? `/api/admin/cms/posts/${editing.id}` : '/api/admin/cms/posts'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.id) {
        if (editing) setItems(prev => prev.map(i => i.id === editing.id ? data : i))
        else setItems(prev => [data, ...prev])
        setShowForm(false)
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Delete this post?')) return
    startTransition(async () => {
      await fetch(`/api/admin/cms/posts/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== id))
    })
  }

  const CATEGORIES = ['Admissions', 'Scholarships', 'Visa', 'Study Tips', 'Destinations', 'News']

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-slate-900">Blog / News</h1><p className="text-slate-500 text-sm mt-1">{items.length} posts</p></div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"><Plus className="w-4 h-4" /> New Post</button>
      </div>

      {showForm && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">{editing ? 'Edit Post' : 'New Post'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: toSlug(e.target.value) }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Cover Image URL</label>
              <input type="text" value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Publish Date</label>
              <input type="datetime-local" value={form.published_at} onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Excerpt</label>
              <textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Body (Markdown supported)</label>
              <textarea rows={6} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
        {items.length === 0 ? <div className="py-16 text-center"><p className="text-slate-400">No posts yet.</p></div> : (
          <div className="divide-y divide-slate-50">
            {items.map(item => (
              <div key={item.id} className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    {item.featured && <Star className="w-3.5 h-3.5 text-amber-500" />}
                    {item.published ? <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">Published</span> : <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Draft</span>}
                    {item.category && <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Globe className="w-3 h-3" />{item.slug}</p>
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
