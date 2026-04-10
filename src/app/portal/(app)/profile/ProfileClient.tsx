'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { PortalProfile, QualificationLevel } from '@/types/portal'
import { updatePortalProfile } from '@/lib/supabase/portal'
import { Loader2, CheckCircle2, User, Mail, Phone, MapPin, GraduationCap, Users } from 'lucide-react'

interface Props {
  profile: PortalProfile
  qualifications: QualificationLevel[]
}

export default function ProfileClient({ profile, qualifications }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    full_name: profile.full_name,
    phone: profile.phone ?? '',
    location: profile.location ?? '',
    gender: profile.gender ?? '',
    highest_qualification: profile.highest_qualification ?? '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const ok = await updatePortalProfile(profile.id, {
        full_name: formData.full_name,
        phone: formData.phone || null,
        location: formData.location || null,
        gender: (formData.gender as 'male' | 'female') || null,
        highest_qualification: formData.highest_qualification || null,
        profile_completed: true,
      })

      if (ok) {
        setSuccess(true)
        router.refresh()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('Failed to update profile. Please try again.')
      }
    })
  }

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5"

  return (
    <div className="space-y-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          <p className="text-sm font-medium">Profile updated successfully!</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className={labelClasses}>Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className={labelClasses}>Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className={inputClasses + " bg-slate-50 cursor-not-allowed text-slate-500"}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 ml-1">Email cannot be changed once registered.</p>
            </div>

            {/* Phone */}
            <div>
              <label className={labelClasses}>Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClasses}
                  placeholder="+234..."
                />
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className={labelClasses}>Gender</label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className={inputClasses + " appearance-none"}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className={labelClasses}>Residential Location</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className={inputClasses}
                  placeholder="Lagos, Nigeria"
                />
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Highest Qualification */}
            <div className="md:col-span-2">
              <label className={labelClasses}>Highest Qualification</label>
              <div className="relative">
                <select
                  value={formData.highest_qualification}
                  onChange={e => setFormData({ ...formData, highest_qualification: e.target.value })}
                  className={inputClasses + " appearance-none"}
                >
                  <option value="">Select your highest qualification</option>
                  {qualifications.map(q => (
                    <option key={q.id} value={q.name}>{q.name}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                <GraduationCap className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
