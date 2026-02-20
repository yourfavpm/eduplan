'use server'

import { createClient } from '@/lib/supabase/server'
import { createPortalProfile } from '@/lib/supabase/portal'
import { redirect } from 'next/navigation'

export type AuthActionResult = {
  error?: string
  success?: string
}

// ─── Sign Up ─────────────────────────────────────────────
export async function signUpAction(formData: FormData): Promise<AuthActionResult> {
  const full_name = formData.get('full_name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const location = formData.get('location') as string
  const password = formData.get('password') as string

  if (!full_name || !email || !password) {
    return { error: 'Please fill in all required fields.' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/verify-email`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Create profile immediately (even before email verification)
    await createPortalProfile({
      id: data.user.id,
      full_name,
      email,
      phone,
      location,
    })
  }

  redirect('/portal/verify-email')
}

// ─── Sign In ─────────────────────────────────────────────
export async function signInAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please enter your email and password.' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Invalid email or password. Please try again.' }
  }

  if (!data.user.email_confirmed_at) {
    redirect('/portal/verify-email')
  }

  redirect('/portal/dashboard')
}

// ─── Sign Out ─────────────────────────────────────────────
export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/portal/sign-in')
}

// ─── Resend Verification Email ────────────────────────────
export async function resendVerificationAction(email: string): Promise<AuthActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/verify-email`,
    },
  })

  if (error) return { error: error.message }
  return { success: 'Verification email resent. Please check your inbox.' }
}

// ─── Forgot Password ─────────────────────────────────────
export async function forgotPasswordAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get('email') as string

  if (!email) return { error: 'Please enter your email address.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/reset-password`,
  })

  if (error) return { error: error.message }
  return { success: 'Password reset link sent. Check your inbox.' }
}

// ─── Reset Password ───────────────────────────────────────
export async function resetPasswordAction(formData: FormData): Promise<AuthActionResult> {
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (!password || password !== confirm) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) return { error: error.message }

  redirect('/portal/sign-in')
}
