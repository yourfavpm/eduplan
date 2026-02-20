import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createApplication } from '@/lib/supabase/portal'
import type { CreateApplicationInput } from '@/lib/supabase/portal'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { userId, title, study_destination, intake_season, intake_year, qualification_level_id, universities } = body

  if (userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (!study_destination || !qualification_level_id)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const input: CreateApplicationInput = {
    userId: user.id,
    title,
    study_destination,
    intake_season,
    intake_year,
    qualification_level_id,
    universities: universities ?? [],
  }


  const app = await createApplication(input)
  if (!app) return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })

  return NextResponse.json({ applicationId: app.id })
}
