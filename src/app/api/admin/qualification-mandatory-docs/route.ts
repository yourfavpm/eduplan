import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditEvent } from '@/lib/supabase/audit'

// POST — upsert a qualification_mandatory_document mapping
export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { qualification_level_id, document_type_id, is_required } = await req.json()
  if (!qualification_level_id || !document_type_id)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const { data, error } = await supabase
    .from('qualification_mandatory_documents')
    .upsert(
      { qualification_level_id, document_type_id, is_required: is_required ?? true },
      { onConflict: 'qualification_level_id,document_type_id' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logAuditEvent({
    actorId: user.id,
    action: 'UPSERT_QUAL_MANDATORY_DOC',
    entityType: 'qualification_mandatory_documents',
    entityId: `${qualification_level_id}:${document_type_id}`,
    after: { is_required },
  })

  return NextResponse.json(data)
}

// DELETE — remove a mapping by id
export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const { data: before } = await supabase.from('qualification_mandatory_documents').select('*').eq('id', id).single()
  await supabase.from('qualification_mandatory_documents').delete().eq('id', id)

  await logAuditEvent({
    actorId: user.id,
    action: 'DELETE_QUAL_MANDATORY_DOC',
    entityType: 'qualification_mandatory_documents',
    entityId: id,
    before: before ?? undefined,
  })

  return NextResponse.json({ success: true })
}
