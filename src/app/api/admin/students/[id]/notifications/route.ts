import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/admin/students/[id]/notifications
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: studentId } = await params
    const { title, message } = await req.json()

    if (!title?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Title and message are required' }, { status: 400 })
    }

    const supabase = await createClient()

    // The user must be an admin (RLS will automatically enforce this via public.is_admin())
    const { error } = await supabase
      .from('portal_notifications')
      .insert({
        user_id: studentId,
        title: title.trim(),
        message: message.trim(),
      })

    if (error) {
      console.error('Failed to create notification:', error)
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in send notification route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
