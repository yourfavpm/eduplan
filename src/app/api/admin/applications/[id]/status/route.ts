import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditEvent } from '@/lib/supabase/audit'

// PATCH /api/admin/applications/[id]/status
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { status, note } = await req.json()
  if (!status) return NextResponse.json({ error: 'status is required' }, { status: 400 })

  // Get before state
  const { data: before } = await supabase.from('applications').select('status').eq('id', id).single()

  // Update application status
  const { error } = await supabase.from('applications').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Insert status history
  await supabase.from('portal_status_history').insert({
    application_id: id,
    status,
    note: note ?? null,
    author_admin_id: user.id,
  })

  // Audit log
  await logAuditEvent({
    actorId: user.id,
    action: 'UPDATE_STATUS',
    entityType: 'application',
    entityId: id,
    before: { status: before?.status },
    after: { status },
  })

  return NextResponse.json({ success: true })
}
