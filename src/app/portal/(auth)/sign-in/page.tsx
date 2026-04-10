'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const supabase = createClient()
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    // Fetch role to route admin to admin portal, students to student portal
    const { data: profile } = await supabase
      .from('portal_profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single()

    if (profile?.role === 'admin') {
      router.push('/admin/overview')
    } else {
      router.push('/portal/dashboard')
    }
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT PANEL - Visual & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 border-r border-slate-200">
        <Image
          src="/images/auth.jpg"
          alt="Graduation success"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Dark subtle gradient for readability */}
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
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Partner Institutions</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white mb-1">Global</div>
                <div className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Student Network</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-20 bg-slate-50 relative">
        <div className="w-full max-w-[420px]">
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
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600 text-sm">Please sign in to access your dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@example.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition shadow-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link href="/portal/forgot-password" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition shadow-sm"
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
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                ) : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 mt-10">
            Don&apos;t have an account?{' '}
            <Link href="/portal/sign-up" className="text-slate-900 font-bold hover:underline transition-all">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
