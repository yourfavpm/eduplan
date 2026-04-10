import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)

  const country = searchParams.get('country')
  const level = searchParams.get('level')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  try {
    let query = supabase
      .from('scholarships')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (country) query = query.ilike('country', `%${country}%`)
    if (level) query = query.ilike('level', `%${level}%`)
    if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)

    const { data, error } = await query

    if (error) {
      console.error('Scholarships API error:', error.message)
      return NextResponse.json([], { status: 200 })
    }

    // Client-side filter for type (column may not exist yet)
    let results = data ?? []
    if (type && results.length > 0) {
      results = results.filter((s: Record<string, unknown>) => s.type === type)
    }

    // Sort featured to top client-side (in case column doesn't exist)
    results.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    return NextResponse.json(results)
  } catch (err) {
    console.error('Scholarships API unexpected error:', err)
    return NextResponse.json([], { status: 200 })
  }
}
