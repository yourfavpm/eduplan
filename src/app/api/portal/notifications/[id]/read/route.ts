import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// PATCH /api/portal/notifications/[id]/read
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Will inherently fail if the notification doesn't belong to the user due to RLS policies
    const { error } = await supabase
      .from('portal_notifications')
      .update({ is_read: true })
      .eq('id', id)

    if (error) {
      console.error('Failed to mark notification as read:', error)
      return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in mark notification read route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
