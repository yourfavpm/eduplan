import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditEvent } from '@/lib/supabase/audit'

// POST /api/admin/applications/[id]/notes
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { note } = await req.json()
  if (!note?.trim()) return NextResponse.json({ error: 'Note is required' }, { status: 400 })

  const { data, error } = await supabase.from('admin_notes').insert({
    application_id: id,
    author_admin_id: user.id,
    note: note.trim(),
  }).select(`*, portal_profiles(full_name)`).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logAuditEvent({ actorId: user.id, action: 'ADD_NOTE', entityType: 'application', entityId: id })
  return NextResponse.json(data)
}

// GET /api/admin/applications/[id]/notes
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('admin_notes').select(`*, portal_profiles(full_name)`).eq('application_id', id).order('created_at', { ascending: false })
  return NextResponse.json(data ?? [])
}
