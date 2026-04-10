'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Check, X, Loader2 } from 'lucide-react'

const CHECKS = [
  { id: 'length',    label: 'At least 8 characters',  test: (p: string) => p.length >= 8 },
  { id: 'upper',     label: 'One uppercase letter',    test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lower',     label: 'One lowercase letter',    test: (p: string) => /[a-z]/.test(p) },
  { id: 'number',    label: 'One number',              test: (p: string) => /[0-9]/.test(p) },
  { id: 'special',   label: 'One special character',   test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState(false)

  const allPassed = CHECKS.every(c => c.test(password))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!allPassed) {
      setTouched(true)
      return
    }

    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const full_name = formData.get('full_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const location = formData.get('location') as string

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name },
        emailRedirectTo: `${window.location.origin}/portal/dashboard`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('portal_profiles').insert({
        id: data.user.id,
        full_name,
        email,
        phone: phone || null,
        location: location || null,
        role: 'student',
        profile_completed: false,
      })
    }

    router.push('/portal/dashboard')
    router.refresh()
  }

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition shadow-sm"
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5"

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* LEFT PANEL - Visual & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-[40%] xl:w-1/2 relative bg-slate-900 border-r border-slate-200">
        <Image
          src="/images/auth.jpg"
          alt="Graduation success"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10" />

        <div className="absolute inset-0 p-12 xl:p-20 flex flex-col justify-between">
          <div>
            <Image
              src="/eduplan.png"
              alt="EduPlan360"
              width={240}
              height={68}
              className="h-14 xl:h-16 w-auto filter brightness-0 invert opacity-90"
              priority
            />
          </div>
          <div className="max-w-xl">
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Unlock Global Education Opportunities
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed font-medium mb-10">
              Connect with leading universities, institutions, and study abroad opportunities worldwide.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white mb-1">Trusted</div>
                <div className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Education Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Auth Form */}
      <div className="w-full lg:w-[60%] xl:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-20 bg-slate-50 relative overflow-y-auto">
        <div className="w-full max-w-[480px] py-10 lg:py-0">
          {/* Mobile-only logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Image
              src="/eduplan.png"
              alt="EduPlan360"
              width={200}
              height={56}
              className="h-12 sm:h-14 w-auto"
            />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
            <p className="text-slate-600 text-sm">Start your study abroad journey with EduPlan360.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
               {/* Full Name */}
               <div>
                 <label htmlFor="full_name" className={labelClasses}>
                   Full Name <span className="text-red-500">*</span>
                 </label>
                 <input
                   id="full_name"
                   name="full_name"
                   type="text"
                   required
                   placeholder="Jane Doe"
                   className={inputClasses}
                 />
               </div>

               {/* Email */}
               <div>
                 <label htmlFor="email" className={labelClasses}>
                   Email Address <span className="text-red-500">*</span>
                 </label>
                 <input
                   id="email"
                   name="email"
                   type="email"
                   required
                   placeholder="jane@example.com"
                   className={inputClasses}
                 />
               </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
               {/* Phone */}
               <div>
                 <label htmlFor="phone" className={labelClasses}>
                   Phone Number
                 </label>
                 <input
                   id="phone"
                   name="phone"
                   type="tel"
                   required
                   placeholder="+234 800 000 0000"
                   className={inputClasses}
                 />
               </div>

               {/* Location */}
               <div>
                 <label htmlFor="location" className={labelClasses}>
                   Location
                 </label>
                 <input
                   id="location"
                   name="location"
                   type="text"
                   placeholder="Lagos, Nigeria"
                   className={inputClasses}
                 />
               </div>
            </div>

            {/* Password with toggle */}
            <div>
              <label htmlFor="password" className={labelClasses}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => { setPassword(e.target.value); setTouched(true) }}
                  placeholder="Create a strong password"
                  className={`w-full px-4 py-3 pr-11 rounded-lg border bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition shadow-sm ${
                    touched && !allPassed
                      ? 'border-red-300 focus:ring-red-400'
                      : 'border-slate-200 focus:ring-brand-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength checklist */}
              {(touched || password.length > 0) && (
                <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                   <p className="text-xs font-semibold text-slate-700 mb-3">Password requirements:</p>
                   <ul className="space-y-2">
                     {CHECKS.map(({ id, label, test }) => {
                       const ok = test(password)
                       return (
                         <li key={id} className={`flex items-center gap-2 text-xs font-medium transition-colors ${ok ? 'text-green-600' : 'text-slate-500'}`}>
                           <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${ok ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                             {ok ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                           </span>
                           {label}
                         </li>
                       )
                     })}
                   </ul>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
                ) : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 mt-10">
            Already have an account?{' '}
            <Link href="/portal/sign-in" className="text-slate-900 font-bold hover:underline transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
