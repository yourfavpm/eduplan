'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { QualificationLevel } from '@/types/portal'
import { ChevronRight, ChevronLeft, Plus, Trash2, Check, Search } from 'lucide-react'

// Full destination list (mirrors marketing site destinations)
const ALL_DESTINATIONS = [
  'United Kingdom', 'Canada', 'United States', 'Australia', 'Ireland',
  'Germany', 'France', 'Netherlands', 'Cyprus', 'Malta', 'New Zealand',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria',
  'Belgium', 'Portugal', 'Spain', 'Italy', 'Poland', 'Czech Republic',
  'Hungary', 'Romania', 'Bulgaria', 'Croatia', 'Slovenia', 'Slovakia',
  'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Greece',
  'Turkey', 'South Africa', 'Kenya', 'Ghana', 'Egypt', 'Morocco',
  'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Malaysia', 'Singapore',
  'China', 'Japan', 'South Korea', 'India', 'Thailand', 'Other',
].filter((v, i, a) => a.indexOf(v) === i).sort()

const SEASONS = ['Spring', 'Summer', 'Autumn / Fall', 'Winter']
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 6 }, (_, i) => String(currentYear + i))

interface CourseInput { course1: string; course2: string }
interface UniversityInput { university_name: string; university_country: string; courses: CourseInput }

const EMPTY_UNI: UniversityInput = { university_name: '', university_country: '', courses: { course1: '', course2: '' } }

interface Props { qualificationLevels: QualificationLevel[]; userId: string }

// Searchable destination dropdown
function DestinationSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = ALL_DESTINATIONS.filter(d => d.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function select(dest: string) {
    setQuery(dest)
    onChange(dest)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(''); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search country or region…"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
          {filtered.map(dest => (
            <button
              key={dest}
              type="button"
              onClick={() => select(dest)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${dest === value ? 'font-semibold text-blue-700 bg-blue-50' : 'text-slate-700'}`}
            >
              {dest}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NewApplicationWizard({ qualificationLevels, userId }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Step 1
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [season, setSeason] = useState('')
  const [intakeYear, setIntakeYear] = useState('')
  const [qualLevelId, setQualLevelId] = useState('')

  // Step 2
  const [universities, setUniversities] = useState<UniversityInput[]>([{ ...EMPTY_UNI }])

  function addUniversity() {
    if (universities.length >= 3) return
    setUniversities(prev => [...prev, { ...EMPTY_UNI }])
  }

  function removeUniversity(i: number) {
    setUniversities(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateUniversity(i: number, field: keyof Omit<UniversityInput, 'courses'>, value: string) {
    setUniversities(prev => prev.map((u, idx) => idx === i ? { ...u, [field]: value } : u))
  }

  function updateCourse(i: number, field: 'course1' | 'course2', value: string) {
    setUniversities(prev => prev.map((u, idx) => idx === i ? { ...u, courses: { ...u.courses, [field]: value } } : u))
  }

  function validateStep1() {
    if (!destination) { setError('Please select a study destination.'); return false }
    if (!ALL_DESTINATIONS.includes(destination)) {
      setError('Sorry, we do not process admission to this country at the moment.'); 
      return false;
    }
    if (!season) { setError('Please select an intake season.'); return false }
    if (!intakeYear) { setError('Please select an intake year.'); return false }
    if (!qualLevelId) { setError('Please select your highest qualification.'); return false }
    setError(null); return true
  }

  function validateStep2() {
    if (!universities[0]?.university_name.trim()) { setError('Please add at least one university.'); return false }
    if (!universities[0]?.courses.course1.trim()) { setError('Please enter at least one course for your first university.'); return false }
    setError(null); return true
  }

  function handleNext() {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep(s => s + 1)
  }

  const qualLabel = qualificationLevels.find(q => q.id === qualLevelId)?.name
  const autoTitle = destination && season && intakeYear ? `${destination} — ${season} ${intakeYear}` : ''

  function submit() {
    startTransition(async () => {
      setError(null)
      const res = await fetch('/api/portal/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title: title.trim() || autoTitle || null,
          study_destination: destination,
          intake_season: season,
          intake_year: intakeYear,
          qualification_level_id: qualLevelId,
          universities: universities
            .filter(u => u.university_name.trim())
            .map(u => ({
              university_name: u.university_name.trim(),
              university_country: u.university_country.trim() || undefined,
              courses: [u.courses.course1.trim(), u.courses.course2.trim()].filter(Boolean),
            })),
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) { setError(data.error ?? 'Failed to create application.'); return }
      router.push(`/portal/applications/${data.applicationId}?banner=created`)
    })
  }

  const STEPS = ['Study Plan', 'Universities & Courses', 'Review & Create']

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/portal/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-800">
          New Application
        </span>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">New Application</h1>
        <p className="text-slate-500 text-sm mt-1">Follow the steps below to create your application.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              i + 1 < step ? 'bg-green-500 text-white' : i + 1 === step ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i + 1 === step ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-slate-200 mx-1" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        {/* ── Step 1: Study Plan ── */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-base font-semibold text-slate-900">Step 1: Study Plan</h2>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Application Label <span className="text-slate-400">(optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={autoTitle || 'e.g. Canada – Fall 2026'}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1">If left blank, we&apos;ll use &ldquo;{autoTitle || 'Destination — Season Year'}&rdquo;</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Study Destination <span className="text-red-500">*</span>
              </label>
              <DestinationSearch value={destination} onChange={setDestination} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Intake Season <span className="text-red-500">*</span>
                </label>
                <select
                  value={season}
                  onChange={e => setSeason(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select season…</option>
                  {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Intake Year <span className="text-red-500">*</span>
                </label>
                <select
                  value={intakeYear}
                  onChange={e => setIntakeYear(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select year…</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Highest Qualification <span className="text-red-500">*</span>
              </label>
              <select
                value={qualLevelId}
                onChange={e => setQualLevelId(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select qualification…</option>
                {qualificationLevels.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
              </select>
              <p className="text-xs text-slate-400 mt-1">Used to auto-generate your required document checklist.</p>
            </div>
          </div>
        )}

        {/* ── Step 2: Universities & Courses ── */}
        {step === 2 && (
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">Step 2: University & Courses</h2>
            <p className="text-xs text-slate-400 mb-5">Add up to 3 universities. Each can have up to 2 course choices.</p>
            <div className="space-y-5">
              {universities.map((uni, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Choice {i + 1}</span>
                    {universities.length > 1 && (
                      <button onClick={() => removeUniversity(i)} className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">University Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={uni.university_name}
                        onChange={e => updateUniversity(i, 'university_name', e.target.value)}
                        placeholder="e.g. University of Toronto"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Country (optional)</label>
                      <input
                        type="text"
                        value={uni.university_country}
                        onChange={e => updateUniversity(i, 'university_country', e.target.value)}
                        placeholder="e.g. Canada"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Course Choice 1 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={uni.courses.course1}
                        onChange={e => updateCourse(i, 'course1', e.target.value)}
                        placeholder="e.g. MSc Computer Science"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Course Choice 2 <span className="text-slate-400">(optional)</span></label>
                      <input
                        type="text"
                        value={uni.courses.course2}
                        onChange={e => updateCourse(i, 'course2', e.target.value)}
                        placeholder="e.g. MSc Data Science"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {universities.length < 3 && (
                <button onClick={addUniversity} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-3.5 text-sm text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  <Plus className="w-4 h-4" /> Add University Choice ({universities.length}/3 added)
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && (
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-5">Step 3: Review & Create</h2>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-50 rounded-xl px-4 py-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Destination</p>
                  <p className="font-semibold text-slate-800">{destination}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Intake</p>
                  <p className="font-semibold text-slate-800">{season} {intakeYear}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl px-4 py-3">
                <p className="text-xs text-slate-400 mb-0.5">Qualification</p>
                <p className="font-semibold text-slate-800">{qualLabel}</p>
              </div>
              <div className="bg-slate-50 rounded-xl px-4 py-3 space-y-2.5">
                <p className="text-xs text-slate-400">University Choices</p>
                {universities.filter(u => u.university_name.trim()).map((u, i) => (
                  <div key={i}>
                    <p className="font-semibold text-slate-800">{i + 1}. {u.university_name}{u.university_country ? ` (${u.university_country})` : ''}</p>
                    <p className="text-xs text-slate-500 mt-0.5 ml-3">
                      {u.courses.course1}{u.courses.course2 ? ` · ${u.courses.course2}` : ''}
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="text-xs font-medium text-blue-700">
                  📋 Your required documents checklist will be automatically generated based on your{' '}
                  <strong>{qualLabel}</strong> qualification level.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} className="inline-flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < 3 ? (
          <button onClick={handleNext} className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={submit} disabled={isPending} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {isPending ? 'Creating…' : '✓ Create Application'}
          </button>
        )}
      </div>
    </div>
  )
}
