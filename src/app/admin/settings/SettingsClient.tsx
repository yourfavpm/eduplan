'use client'

import { useState, useTransition } from 'react'
import { Save, Check } from 'lucide-react'

type SettingSection = {
  key: string
  label: string
  fields: { key: string; label: string; type?: 'text' | 'email' | 'tel' | 'url' }[]
}

const SECTIONS: SettingSection[] = [
  {
    key: 'contact',
    label: '📞 Contact Information',
    fields: [
      { key: 'email', label: 'Email Address', type: 'email' },
      { key: 'phone', label: 'Phone Number', type: 'tel' },
      { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel' },
      { key: 'address', label: 'Office Address', type: 'text' },
    ],
  },
  {
    key: 'socials',
    label: '🌐 Social Media Links',
    fields: [
      { key: 'instagram', label: 'Instagram URL', type: 'url' },
      { key: 'facebook', label: 'Facebook URL', type: 'url' },
      { key: 'twitter', label: 'Twitter / X URL', type: 'url' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
    ],
  },
  {
    key: 'footer',
    label: '🏠 Footer',
    fields: [
      { key: 'tagline', label: 'Footer Tagline', type: 'text' },
    ],
  },
]

export default function SettingsClient({ settings }: { settings: Record<string, unknown> }) {
  const [form, setForm] = useState<Record<string, Record<string, string>>>(() => {
    const init: Record<string, Record<string, string>> = {}
    SECTIONS.forEach(sec => {
      const existing = (settings[sec.key] ?? {}) as Record<string, string>
      init[sec.key] = {}
      sec.fields.forEach(f => { init[sec.key][f.key] = existing[f.key] ?? '' })
    })
    return init
  })
  const [savedSection, setSavedSection] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function updateField(section: string, field: string, value: string) {
    setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
    setSavedSection(null)
  }

  function saveSection(key: string) {
    startTransition(async () => {
      await fetch('/api/admin/cms/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: form[key] }),
      })
      setSavedSection(key)
      setTimeout(() => setSavedSection(null), 3000)
    })
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Global configuration used across the website.</p>
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
                {savedSection === section.key
                  ? <><Check className="w-3.5 h-3.5 text-green-600" /> Saved!</>
                  : <><Save className="w-3.5 h-3.5" /> Save</>
                }
              </button>
            </div>
            <div className="p-6 grid gap-4">
              {section.fields.map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{field.label}</label>
                  <input
                    type={field.type ?? 'text'}
                    value={form[section.key][field.key]}
                    onChange={e => updateField(section.key, field.key, e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
