'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  async function handleResend() {
    if (!email) return
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal/dashboard`,
      },
    })
    setResent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src="/eduplan.png"
            alt="EduPlan360"
            width={160}
            height={45}
            className="h-12 w-auto"
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox ✉️</h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          We sent you a confirmation link. Click on it to verify your email and access your student portal.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-left">
          <p className="text-sm text-slate-600 font-medium mb-3">Didn&apos;t receive it? Resend the link:</p>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 transition"
          />

          {resent ? (
            <div className="px-4 py-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-700">
              ✅ Email resent. Please check your inbox (and spam folder).
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading || !email}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-lg text-sm transition-colors duration-150"
            >
              {loading ? 'Sending…' : 'Resend Verification Email'}
            </button>
          )}
        </div>

        <p className="text-sm text-slate-500 mt-6">
          Already verified?{' '}
          <Link href="/portal/sign-in" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
