'use client'

import { useState, useTransition } from 'react'
import { Save, Check, ChevronDown, FileText, Globe } from 'lucide-react'

interface Props {
  settings: Record<string, unknown>
}

type SectionField = { key: string; label: string; type: 'text' | 'textarea' }

type SubPage = {
  id: string
  label: string
  sections: {
    key: string
    label: string
    fields: SectionField[]
  }[]
}

const RESOURCE_PAGES: SubPage[] = [
  {
    id: 'why',
    label: 'Why Study Abroad',
    sections: [
      {
        key: 'resource_why_hero',
        label: '✨ Hero Section',
        fields: [
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'description', label: 'Introduction', type: 'textarea' },
        ],
      },
      {
        key: 'resource_why_benefits',
        label: '🌟 Top Benefits',
        fields: [
          { key: 'benefit_1', label: 'Benefit 1 (Title:Body)', type: 'textarea' },
          { key: 'benefit_2', label: 'Benefit 2 (Title:Body)', type: 'textarea' },
          { key: 'benefit_3', label: 'Benefit 3 (Title:Body)', type: 'textarea' },
          { key: 'benefit_4', label: 'Benefit 4 (Title:Body)', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'process',
    label: 'The Study Abroad Process',
    sections: [
      {
        key: 'resource_process_hero',
        label: '✨ Hero Section',
        fields: [
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'description', label: 'Introduction', type: 'textarea' },
        ],
      },
      {
        key: 'resource_process_steps',
        label: '🛤️ Step-by-Step Path',
        fields: [
          { key: 'step_1', label: 'Step 1: Counseling', type: 'textarea' },
          { key: 'step_2', label: 'Step 2: Admission', type: 'textarea' },
          { key: 'step_3', label: 'Step 3: Visa', type: 'textarea' },
          { key: 'step_4', label: 'Step 4: Pre-Departure', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'requirements',
    label: 'Document Requirements',
    sections: [
      {
        key: 'resource_reqs_hero',
        label: '📜 Hero Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
        ],
      },
      {
        key: 'resource_reqs_list',
        label: '✅ Checklist Sections',
        fields: [
          { key: 'academic_docs', label: 'Academic Documents', type: 'textarea' },
          { key: 'financial_docs', label: 'Financial Documents', type: 'textarea' },
          { key: 'personal_docs', label: 'Personal Documents', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'interviews',
    label: 'Preparing for Interviews',
    sections: [
      {
        key: 'resource_interviews_hero',
        label: '🤝 Hero Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'intro', label: 'Intro Text', type: 'textarea' },
        ],
      },
      {
        key: 'resource_interviews_tips',
        label: '💡 Tips & Common Questions',
        fields: [
          { key: 'common_questions', label: 'Common Questions', type: 'textarea' },
          { key: 'preparation_tips', label: 'Prep Tips', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'personal-statement',
    label: 'Personal Statement Guideline',
    sections: [
      {
        key: 'resource_ps_hero',
        label: '✍️ Hero Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'intro', label: 'Guidline Intro', type: 'textarea' },
        ],
      },
      {
        key: 'resource_ps_structure',
        label: '🏗️ Statement Structure',
        fields: [
          { key: 'introduction', label: 'The Opening', type: 'textarea' },
          { key: 'body_paragraphs', label: 'What to Include in Body', type: 'textarea' },
          { key: 'conclusion', label: 'The Closing', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'choosing-course',
    label: 'Choosing a Course',
    sections: [
      {
        key: 'resource_course_hero',
        label: '🎓 Hero Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        key: 'resource_course_factors',
        label: '🔍 Factors to Consider',
        fields: [
          { key: 'career_goals', label: 'Career Goals', type: 'textarea' },
          { key: 'interest_alignment', label: 'Personal Interest', type: 'textarea' },
          { key: 'market_demand', label: 'Industry Demand', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'choosing-university',
    label: 'Choosing a University',
    sections: [
      {
        key: 'resource_uni_hero',
        label: '🏛️ Hero Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'intro', label: 'Intro', type: 'textarea' },
        ],
      },
      {
        key: 'resource_uni_rankings',
        label: '📊 Rankings vs Reality',
        fields: [
          { key: 'rankings_guide', label: 'Using Rankings', type: 'textarea' },
          { key: 'location_factors', label: 'Location & Campus', type: 'textarea' },
          { key: 'cost_factors', label: 'Budget & ROI', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'apply',
    label: 'Apply to Study',
    sections: [
      {
        key: 'resource_apply_hero',
        label: '🚀 Hero Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'cta_text', label: 'CTA Message', type: 'textarea' },
        ],
      },
      {
        key: 'resource_apply_steps',
        label: '⚡ Quick Start Guide',
        fields: [
          { key: 'how_it_works', label: 'How EduPlan Helps', type: 'textarea' },
          { key: 'eligibility', label: 'Basic Eligibility', type: 'textarea' },
        ],
      },
    ],
  },
]

export default function ResourcesClient({ settings }: Props) {
  const [activePageId, setActivePageId] = useState('why')
  const activePage = RESOURCE_PAGES.find(p => p.id === activePageId)!

  const [form, setForm] = useState<Record<string, Record<string, string>>>(() => {
    const init: Record<string, Record<string, string>> = {}
    RESOURCE_PAGES.forEach(page => {
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
          <h1 className="text-2xl font-bold text-slate-900">Resource Guide Editor</h1>
          <p className="text-slate-500 text-sm mt-1">Manage the content of your Study Abroad guides and resources.</p>
        </div>
        <div className="relative group min-w-[240px]">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Select Page to Edit</label>
          <div className="relative">
            <select
              value={activePageId}
              onChange={e => setActivePageId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10 shadow-sm"
            >
              {RESOURCE_PAGES.map(p => (
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
                <FileText className="w-4 h-4" />
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
                      rows={field.key.includes('description') || field.key.includes('intro') ? 3 : 5}
                      value={form[section.key][field.key]}
                      onChange={e => updateField(section.key, field.key, e.target.value)}
                      className="w-full border border-slate-100 bg-slate-50/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-400 transition-all resize-none shadow-inner"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type="text"
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

        {activePageId !== 'main' && (
            <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <Globe className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-bold text-amber-800">Public Route Active</p>
                    <p className="text-[10px] text-amber-700 mt-1 leading-relaxed">
                        Changes to this page will be live at <code className="bg-amber-100 px-1 rounded">/study-abroad/{activePageId}</code> once the dynamic route is deployed.
                    </p>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}
