import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)

  const country = searchParams.get('country')
  const level = searchParams.get('level')
  const course = searchParams.get('course')
  const search = searchParams.get('search')

  try {
    let query = supabase
      .from('universities')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (country) query = query.ilike('country', `%${country}%`)
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)

    const { data, error } = await query

    if (error) {
      console.error('Universities API error:', error.message)
      return NextResponse.json([], { status: 200 })
    }

    let results = data ?? []

    // Sort featured to top
    results.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    // Client-side filter for level and course (within JSONB courses array)
    if (level && results.length > 0) {
      results = results.filter((u: Record<string, unknown>) => {
        const courses = Array.isArray(u.courses) ? u.courses : []
        return courses.some((c: Record<string, unknown>) =>
          String(c.level ?? '').toLowerCase().includes(level.toLowerCase())
        )
      })
    }

    if (course && results.length > 0) {
      results = results.filter((u: Record<string, unknown>) => {
        const courses = Array.isArray(u.courses) ? u.courses : []
        return courses.some((c: Record<string, unknown>) =>
          String(c.name ?? '').toLowerCase().includes(course.toLowerCase())
        )
      })
    }

    return NextResponse.json(results)
  } catch (err) {
    console.error('Universities API unexpected error:', err)
    return NextResponse.json([], { status: 200 })
  }
}
