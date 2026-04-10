'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    const supabase = createClient()

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portal/reset-password`,
    })

    if (resetError) {
      setError(resetError.message)
    } else {
      setSent(true)
    }
    setLoading(false)
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
              Secure Your Educational Journey
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed font-medium mb-10">
              Recover access to your account and continue your progress with thousands of institutions globally.
            </p>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
            <p className="text-slate-600 text-sm">Enter the email associated with your account.</p>
          </div>

          {sent ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center sm:p-10">
              <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Check your email</h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed max-w-xs mx-auto">
                We&apos;ve sent a password reset link to your email address. It will expire in 1 hour.
              </p>
              <Link
                href="/portal/sign-in"
                className="w-full inline-flex justify-center py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-lg text-sm transition-all duration-200"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <>
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
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition shadow-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending link...</>
                    ) : 'Send Reset Link'}
                  </button>
                </div>
              </form>

              <div className="text-center mt-10">
                <Link href="/portal/sign-in" className="text-sm text-slate-600 hover:text-slate-900 font-semibold transition-colors">
                  &larr; Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
