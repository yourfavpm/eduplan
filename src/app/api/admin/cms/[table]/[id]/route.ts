import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditEvent } from '@/lib/supabase/audit'

// /api/admin/cms/[table]/[id] — PATCH update + DELETE remove
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { data: before } = await supabase.from(table).select('*').eq('id', id).single()
  const { data, error } = await supabase.from(table).update({ ...body, updated_at: new Date().toISOString() }).eq('id', id).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logAuditEvent({ actorId: user.id, action: `UPDATE_${table.toUpperCase()}`, entityType: table, entityId: id, before: before ?? undefined, after: data ?? undefined })

  return NextResponse.json(data)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: before } = await supabase.from(table).select('*').eq('id', id).single()
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logAuditEvent({ actorId: user.id, action: `DELETE_${table.toUpperCase()}`, entityType: table, entityId: id, before: before ?? undefined })

  return NextResponse.json({ success: true })
}
