'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ProfileCompleteFormProps {
  userId: string
  existingApplicationId?: string
  prefillData: {
    full_name: string
    email: string
    phone?: string | null
    location?: string | null
  }
}

export default function ProfileCompleteForm({ userId, existingApplicationId, prefillData }: ProfileCompleteFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.value ?? ''

    const destination = get('destination')
    const preferred_university = get('preferred_university')
    const proposed_course_1 = get('proposed_course_1')
    const proposed_course_2 = get('proposed_course_2')
    const highest_qualification = get('highest_qualification')

    if (!destination || !proposed_course_1 || !highest_qualification) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Upsert application
    if (existingApplicationId) {
      const { error: updateErr } = await supabase
        .from('portal_applications')
        .update({ destination, preferred_university: preferred_university || null, proposed_course_1, proposed_course_2: proposed_course_2 || null, highest_qualification, updated_at: new Date().toISOString() })
        .eq('id', existingApplicationId)
      if (updateErr) { setError(updateErr.message); setLoading(false); return }
    } else {
      const { data: app, error: insertErr } = await supabase
        .from('portal_applications')
        .insert({ user_id: userId, destination, preferred_university: preferred_university || null, proposed_course_1, proposed_course_2: proposed_course_2 || null, highest_qualification, status: 'INCOMPLETE_DOCUMENTS' })
        .select()
        .single()
      if (insertErr) { setError(insertErr.message); setLoading(false); return }

      // Seed status history
      await supabase.from('portal_status_history').insert({ application_id: app.id, status: 'INCOMPLETE_DOCUMENTS', note: 'Application created', changed_by: userId })
    }

    // Mark profile_completed
    await supabase.from('portal_profiles').update({ profile_completed: true }).eq('id', userId)

    router.push('/portal/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">{error}</div>
      )}

      {/* Read-only sign-up info */}
      <div className="bg-slate-50 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Your Account Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReadOnlyField label="Full Name" value={prefillData.full_name} />
          <ReadOnlyField label="Email" value={prefillData.email} />
          {prefillData.phone && <ReadOnlyField label="Phone" value={prefillData.phone} />}
          {prefillData.location && <ReadOnlyField label="Location" value={prefillData.location} />}
        </div>
        <p className="text-xs text-slate-400">This information was collected at sign-up.</p>
      </div>

      {/* Application fields */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Study Details</h3>

        <Field
          id="destination"
          label="Study Destination"
          placeholder="e.g. United Kingdom"
          required
        />
        <Field
          id="preferred_university"
          label="Preferred University"
          placeholder="e.g. University of Manchester (optional)"
        />
        <Field
          id="proposed_course_1"
          label="Proposed Course 1"
          placeholder="e.g. MSc Computer Science"
          required
        />
        <Field
          id="proposed_course_2"
          label="Proposed Course 2"
          placeholder="e.g. MSc Data Science (optional)"
        />
        <div>
          <label htmlFor="highest_qualification" className="block text-sm font-medium text-slate-700 mb-1.5">
            Highest Qualification <span className="text-red-500">*</span>
          </label>
          <select
            id="highest_qualification"
            name="highest_qualification"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          >
            <option value="">Select qualification…</option>
            <option value="O Level / WAEC">O Level / WAEC</option>
            <option value="A Level / NABTEB">A Level / NABTEB</option>
            <option value="OND / HND">OND / HND</option>
            <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
            <option value="Master's Degree">Master&apos;s Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-colors duration-150 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Saving…
          </>
        ) : 'Save & Continue to Dashboard'}
      </button>
    </form>
  )
}

function Field({ id, label, placeholder, required }: { id: string; label: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
  )
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm text-slate-700 font-medium">{value}</p>
    </div>
  )
}
