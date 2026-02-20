import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // ─── Protect /portal/* routes ─────────────────────────
  if (pathname.startsWith('/portal')) {
    // Auth pages: allow unauthenticated
    const authPages = [
      '/portal/sign-in',
      '/portal/sign-up',
      '/portal/forgot-password',
      '/portal/reset-password',
      '/portal/verify-email',
    ]
    const isAuthPage = authPages.some(p => pathname.startsWith(p))

    if (!user && !isAuthPage) {
      const signIn = new URL('/portal/sign-in', request.url)
      return NextResponse.redirect(signIn)
    }

    // If authenticated and on auth page (except reset-password), go to dashboard
    if (user && isAuthPage && !pathname.startsWith('/portal/reset-password')) {
      const dashboard = new URL('/portal/dashboard', request.url)
      return NextResponse.redirect(dashboard)
    }
  }

  // ─── Protect /admin/* routes ──────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const signIn = new URL('/portal/sign-in', request.url)
      return NextResponse.redirect(signIn)
    }

    // Check admin role from portal_profiles
    const { data: profile } = await supabase
      .from('portal_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      const dashboard = new URL('/portal/dashboard', request.url)
      return NextResponse.redirect(dashboard)
    }
  }

  return supabaseResponse
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
