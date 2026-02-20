'use client'

import { useState, useTransition } from 'react'
import { Save, Check } from 'lucide-react'

interface Props {
  settings: Record<string, unknown>
}

type Section = {
  key: string
  label: string
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'url' }[]
}

const SECTIONS: Section[] = [
  {
    key: 'hero',
    label: '🎯 Hero Section',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subtext', label: 'Subtext', type: 'textarea' },
      { key: 'cta_primary_label', label: 'Primary CTA Label', type: 'text' },
      { key: 'cta_primary_href', label: 'Primary CTA Link', type: 'url' },
      { key: 'cta_secondary_label', label: 'Secondary CTA Label', type: 'text' },
      { key: 'hero_image', label: 'Hero Image URL', type: 'url' },
    ],
  },
  {
    key: 'stats',
    label: '📊 Stats Bar',
    fields: [
      { key: 'stat_students', label: 'Students Placed (number)', type: 'text' },
      { key: 'stat_universities', label: 'Partner Universities', type: 'text' },
      { key: 'stat_countries', label: 'Countries', type: 'text' },
      { key: 'stat_success_rate', label: 'Success Rate (%)', type: 'text' },
    ],
  },
  {
    key: 'how_it_works',
    label: '🔄 How It Works',
    fields: [
      { key: 'step_1_title', label: 'Step 1 Title', type: 'text' },
      { key: 'step_1_body', label: 'Step 1 Description', type: 'textarea' },
      { key: 'step_2_title', label: 'Step 2 Title', type: 'text' },
      { key: 'step_2_body', label: 'Step 2 Description', type: 'textarea' },
      { key: 'step_3_title', label: 'Step 3 Title', type: 'text' },
      { key: 'step_3_body', label: 'Step 3 Description', type: 'textarea' },
    ],
  },
  {
    key: 'consultation_cta',
    label: '📞 Consultation CTA',
    fields: [
      { key: 'consultation_headline', label: 'Headline', type: 'text' },
      { key: 'consultation_subtext', label: 'Subtext', type: 'textarea' },
      { key: 'consultation_cta_label', label: 'Button Label', type: 'text' },
    ],
  },
  {
    key: 'portal_cta',
    label: '🎓 Student Portal CTA',
    fields: [
      { key: 'portal_headline', label: 'Headline', type: 'text' },
      { key: 'portal_subtext', label: 'Subtext', type: 'textarea' },
      { key: 'portal_cta_label', label: 'Button Label', type: 'text' },
    ],
  },
]

export default function HomepageClient({ settings }: Props) {
  const [form, setForm] = useState<Record<string, Record<string, string>>>(() => {
    const init: Record<string, Record<string, string>> = {}
    SECTIONS.forEach(sec => {
      init[sec.key] = {}
      const stored = (settings[sec.key] ?? {}) as Record<string, string>
      sec.fields.forEach(f => { init[sec.key][f.key] = stored[f.key] ?? '' })
    })
    return init
  })
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  function updateField(section: string, field: string, value: string) {
    setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
    setSaved(false)
  }

  function saveSection(sectionKey: string) {
    startTransition(async () => {
      await fetch('/api/admin/cms/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: sectionKey, value: form[sectionKey] }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Homepage Editor</h1>
        <p className="text-slate-500 text-sm mt-1">Structured section editor. Each section saves independently.</p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map(section => (
          <div key={section.key} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">{section.label}</h2>
              <button
                onClick={() => saveSection(section.key)}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
              >
                {saved ? <><Check className="w-3.5 h-3.5 text-green-600" /> Saved</> : <><Save className="w-3.5 h-3.5" /> Save Section</>}
              </button>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              {section.fields.map(field => (
                <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={form[section.key][field.key]}
                      onChange={e => updateField(section.key, field.key, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <input
                      type={field.type === 'url' ? 'url' : 'text'}
                      value={form[section.key][field.key]}
                      onChange={e => updateField(section.key, field.key, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
