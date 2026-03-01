'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Check, Star, MapPin, Link as LinkIcon, GraduationCap } from 'lucide-react'

type Course = { name: string; level: string; duration: string; fees?: string }

type University = {
  id: string; 
  name: string; 
  slug: string; 
  country: string; 
  location: string | null;
  logo_url: string | null; 
  website_url: string | null;
  description: string | null;
  admission_requirements: string | null;
  courses: Course[];
  intakes: string[];
  featured: boolean; 
  published: boolean
}

const EMPTY = { 
  name: '', 
  slug: '', 
  country: '', 
  location: '', 
  logo_url: '', 
  website_url: '', 
  description: '', 
  admission_requirements: '',
  courses: [] as Course[],
  intakes: [] as string[],
  featured: false, 
  published: true 
}

function toSlug(s: string) { 
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') 
}

export default function UniversitiesClient({ initialItems }: { initialItems: University[] }) {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<University | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [isPending, startTransition] = useTransition()

  function openNew() { setForm(EMPTY); setEditing(null); setShowForm(true) }
  function openEdit(item: University) {
    setForm({ 
      name: item.name, 
      slug: item.slug, 
      country: item.country, 
      location: item.location ?? '', 
      logo_url: item.logo_url ?? '', 
      website_url: item.website_url ?? '', 
      description: item.description ?? '', 
      admission_requirements: item.admission_requirements ?? '',
      courses: Array.isArray(item.courses) ? item.courses : [],
      intakes: Array.isArray(item.intakes) ? item.intakes : [],
      featured: item.featured, 
      published: item.published 
    })
    setEditing(item); setShowForm(true)
  }

  function save() {
    startTransition(async () => {
      const payload = { ...form, slug: form.slug || toSlug(form.name) }
      const url = editing ? `/api/admin/cms/universities/${editing.id}` : '/api/admin/cms/universities'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.id) {
        if (editing) setItems(prev => prev.map(i => i.id === editing.id ? data : i))
        else setItems(prev => [data, ...prev])
        setShowForm(false)
      } else if (data.error) {
        alert('Error: ' + data.error)
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Delete this university?')) return
    startTransition(async () => {
      await fetch(`/api/admin/cms/universities/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== id))
    })
  }

  function addCourse() {
    setForm(f => ({ ...f, courses: [...f.courses, { name: '', level: 'Undergraduate', duration: '' }] }))
  }

  function removeCourse(idx: number) {
    setForm(f => ({ ...f, courses: f.courses.filter((_, i) => i !== idx) }))
  }

  function updateCourse(idx: number, field: keyof Course, value: string) {
    setForm(f => ({
      ...f,
      courses: f.courses.map((c, i) => i === idx ? { ...c, [field]: value } : c)
    }))
  }

  function addIntake() {
    setForm(f => ({ ...f, intakes: [...f.intakes, ''] }))
  }

  function removeIntake(idx: number) {
    setForm(f => ({ ...f, intakes: f.intakes.filter((_, i) => i !== idx) }))
  }

  function updateIntake(idx: number, value: string) {
    setForm(f => ({
      ...f,
      intakes: f.intakes.map((it, i) => i === idx ? value : it)
    }))
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">University Directory</h1>
          <p className="text-slate-500 text-sm mt-1">{items.length} universities</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> New University
        </button>
      </div>

      {showForm && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">{editing ? 'Edit University' : 'New University'}</h3>
          
          <div className="space-y-6">
            <section className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3">Basic Info</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">University Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: toSlug(e.target.value) }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Slug</label>
                  <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Country *</label>
                  <input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Location / Campus</label>
                  <input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Website URL</label>
                  <input type="url" value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Logo URL</label>
                  <input type="text" value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </section>

            <section className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3">Academic Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Admission Requirements</label>
                  <textarea rows={3} value={form.admission_requirements} onChange={e => setForm(f => ({ ...f, admission_requirements: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-300"
                    placeholder="List requirements, IELTS scores, etc." />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-600">Courses & Levels</label>
                  <button onClick={addCourse} className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Plus className="w-3 h-3" /> ADD COURSE
                  </button>
                </div>
                <div className="space-y-2">
                  {form.courses.map((course, i) => (
                    <div key={i} className="flex gap-2 items-start bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Course Name" value={course.name} onChange={e => updateCourse(i, 'name', e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none" />
                        <select value={course.level} onChange={e => updateCourse(i, 'level', e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none">
                          <option>Undergraduate</option>
                          <option>Postgraduate</option>
                          <option>PhD / Research</option>
                          <option>Foundation</option>
                          <option>English Program</option>
                        </select>
                        <input type="text" placeholder="Duration (e.g. 3 Years)" value={course.duration} onChange={e => updateCourse(i, 'duration', e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none" />
                        <input type="text" placeholder="Estimated Fees" value={course.fees} onChange={e => updateCourse(i, 'fees', e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none" />
                      </div>
                      <button onClick={() => removeCourse(i)} className="text-slate-400 hover:text-red-500 p-1"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-600">Available Intakes</label>
                  <button onClick={addIntake} className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Plus className="w-3 h-3" /> ADD INTAKE
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.intakes.map((intake, i) => (
                    <div key={i} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                      <input type="text" placeholder="e.g. Sept" value={intake} onChange={e => updateIntake(i, e.target.value)}
                        className="w-16 border-none bg-transparent text-xs focus:outline-none p-0" />
                      <button onClick={() => removeIntake(i)} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-blue-100">
            <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-slate-700">
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="rounded text-blue-600 w-4 h-4" /> Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-slate-700">
              <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="rounded text-blue-600 w-4 h-4" /> Published
            </label>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button onClick={save} disabled={isPending || !form.name.trim() || !form.country.trim()} className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
              <Check className="w-4 h-4" /> Save University
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400">No universities in directory yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {items.map(item => (
              <div key={item.id} className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                {item.logo_url ? (
                  <img src={item.logo_url} alt="" className="w-12 h-12 rounded-lg bg-slate-100 object-contain shrink-0 border border-slate-50" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 flex items-center justify-center border border-slate-50">
                    <GraduationCap className="w-6 h-6 text-slate-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                    {item.featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    {!item.published && <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Draft</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.country}{item.location ? `, ${item.location}` : ''}
                    </p>
                    {Array.isArray(item.courses) && item.courses.length > 0 && (
                      <p className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md font-medium uppercase">
                        {item.courses.length} Courses
                      </p>
                    )}
                    {item.website_url && (
                      <a href={item.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> Website
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(item.id)} disabled={isPending} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { X } from 'lucide-react'
