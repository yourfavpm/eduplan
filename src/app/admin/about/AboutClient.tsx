'use client'

import { useState, useTransition } from 'react'
import { Save, Check, ChevronDown, User, Sparkles } from 'lucide-react'

interface Props {
  settings: Record<string, unknown>
}

type SectionField = { key: string; label: string; type: 'text' | 'textarea' | 'url' }

type SubPage = {
  id: string
  label: string
  sections: {
    key: string
    label: string
    fields: SectionField[]
  }[]
}

const ABOUT_PAGES: SubPage[] = [
  {
    id: 'who-we-are',
    label: 'Who We Are (Main About)',
    sections: [
      {
        key: 'about_hero',
        label: '✨ Hero Section',
        fields: [
          { key: 'headline', label: 'Headline', type: 'text' },
          { key: 'subtext', label: 'Subtext', type: 'textarea' },
          { key: 'image_url', label: 'Hero Image URL', type: 'url' },
        ],
      },
      {
        key: 'about_mission',
        label: '🎯 Our Mission',
        fields: [
          { key: 'mission_title', label: 'Title', type: 'text' },
          { key: 'mission_body', label: 'Description', type: 'textarea' },
        ],
      },
      {
        key: 'about_story',
        label: '📖 Our Story',
        fields: [
          { key: 'story_title', label: 'Title', type: 'text' },
          { key: 'story_body', label: 'Description', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'why-choose-us',
    label: 'Why You Should Choose Us',
    sections: [
      {
        key: 'why_us_hero',
        label: '✨ Page Header',
        fields: [
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'description', label: 'Main Description', type: 'textarea' },
        ],
      },
      {
        key: 'about_why_us',
        label: '💡 Key Benefits',
        fields: [
          { key: 'benefit_1_title', label: 'Benefit 1 Title', type: 'text' },
          { key: 'benefit_1_body', label: 'Benefit 1 Body', type: 'textarea' },
          { key: 'benefit_2_title', label: 'Benefit 2 Title', type: 'text' },
          { key: 'benefit_2_body', label: 'Benefit 2 Body', type: 'textarea' },
          { key: 'benefit_3_title', label: 'Benefit 3 Title', type: 'text' },
          { key: 'benefit_3_body', label: 'Benefit 3 Body', type: 'textarea' },
        ],
      },
    ],
  },
]

export default function AboutClient({ settings }: Props) {
  const [activePageId, setActivePageId] = useState('who-we-are')
  const activePage = ABOUT_PAGES.find(p => p.id === activePageId)!

  const [form, setForm] = useState<Record<string, Record<string, string>>>(() => {
    const init: Record<string, Record<string, string>> = {}
    ABOUT_PAGES.forEach(page => {
      page.sections.forEach(sec => {
        init[sec.key] = {}
        const stored = (settings[sec.key] ?? {}) as Record<string, string>
        sec.fields.forEach(f => { init[sec.key][f.key] = stored[f.key] ?? '' })
      })
    })
    return init
  })

  const [savedSection, setSavedSection] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function updateField(section: string, field: string, value: string) {
    setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
  }

  function saveSection(sectionKey: string) {
    startTransition(async () => {
      await fetch('/api/admin/cms/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: sectionKey, value: form[sectionKey] }),
      })
      setSavedSection(sectionKey)
      setTimeout(() => setSavedSection(null), 3000)
    })
  }

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">About Page Editor</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your company profile, mission, and unique value propositions.</p>
        </div>
        <div className="relative group min-w-[240px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Select Section to Edit</label>
          <div className="relative">
            <select
              value={activePageId}
              onChange={e => setActivePageId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10 shadow-sm"
            >
              {ABOUT_PAGES.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                {activePageId === 'who-we-are' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div>
                <h2 className="text-sm font-bold text-slate-800">{activePage.label}</h2>
                <p className="text-[10px] text-slate-400 font-medium">Currently Editing</p>
            </div>
        </div>

        {activePage.sections.map(section => (
          <div key={section.key} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">{section.label}</h2>
              <button
                onClick={() => saveSection(section.key)}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-white border border-blue-100 shadow-sm px-4 py-2 rounded-lg hover:border-blue-200 hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                {savedSection === section.key ? <><Check className="w-3.5 h-3.5 text-green-600" /> Saved</> : <><Save className="w-3.5 h-3.5" /> Save Section</>}
              </button>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-5">
              {section.fields.map(field => (
                <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={field.key.includes('subtext') || field.key.includes('mission_body') ? 3 : 5}
                      value={form[section.key][field.key]}
                      onChange={e => updateField(section.key, field.key, e.target.value)}
                      className="w-full border border-slate-100 bg-slate-50/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-400 transition-all resize-none shadow-inner"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type={field.type === 'url' ? 'url' : 'text'}
                      value={form[section.key][field.key]}
                      onChange={e => updateField(section.key, field.key, e.target.value)}
                      className="w-full border border-slate-100 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-400 transition-all shadow-inner"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
