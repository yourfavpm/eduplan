import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify application existence and ownership
    const { data: app, error: appError } = await supabase
      .from('applications')
      .select('user_id, status')
      .eq('id', id)
      .single()

    if (appError || !app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    if (app.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (app.status === 'WITHDRAWN') {
      return NextResponse.json({ error: 'Application already withdrawn' }, { status: 400 })
    }

    // Update application status
    const { error: updateError } = await supabase
      .from('applications')
      .update({ status: 'WITHDRAWN' })
      .eq('id', id)

    if (updateError) throw updateError

    // Insert history log
    await supabase.from('application_status_history').insert({
      application_id: id,
      status: 'WITHDRAWN',
      note: 'Application withdrawn by student'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error withdrawing application:', error)
    return NextResponse.json({ error: 'Failed to withdraw application' }, { status: 500 })
  }
}
