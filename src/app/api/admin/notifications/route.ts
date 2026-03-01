import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    // Simple admin check (can be enhanced based on roles table)
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { userId, title, message, applicationId } = body

    if (!userId || !title || !message) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const { data, error } = await supabase
      .from('portal_notifications')
      .insert({
        user_id: userId,
        title,
        message,
        application_id: applicationId || null,
        sender_admin_id: user.id
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error sending notification:', error)
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 })
  }
}
