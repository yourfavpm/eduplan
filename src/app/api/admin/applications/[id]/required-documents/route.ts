import { NextResponse } from 'next/server'
import { getRequiredDocuments } from '@/lib/supabase/documents'
import { createClient } from '@/lib/supabase/server'

// GET /api/admin/applications/[id]/required-documents
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const docs = await getRequiredDocuments(id)
  return NextResponse.json(docs)
}

// POST /api/admin/applications/[id]/required-documents
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Verify auth & admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('portal_profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { documentTypeId, customDocTitle } = await req.json()

  let finalDocTypeId = documentTypeId

  if (customDocTitle) {
    // Create an ad-hoc document type for this request
    const { data: newType, error: typeErr } = await supabase
      .from('document_types')
      .insert({
        name: customDocTitle,
        description: 'Custom document requested by admin',
        required: true,
      })
      .select('id')
      .single()

    if (typeErr || !newType) {
      return NextResponse.json({ error: 'Failed to create document type' }, { status: 500 })
    }
    finalDocTypeId = newType.id
  }

  if (!finalDocTypeId) {
    return NextResponse.json({ error: 'Missing document type' }, { status: 400 })
  }

  const { error } = await supabase
    .from('application_required_documents')
    .insert({
      application_id: id,
      document_type_id: finalDocTypeId,
      status: 'pending',
    })

  if (error) {
    // 23505 = unique_violation
    if (error.code === '23505') {
      return NextResponse.json({ error: 'This document is already assigned' }, { status: 400 })
    }
    console.error('Assign doc error:', error)
    return NextResponse.json({ error: 'Failed to assign document' }, { status: 500 })
  }

  // If the admin requests a new document, the app status should revert back to INCOMPLETE_DOCUMENTS
  // so the student knows they have a pending task, unless the application is already approved/rejected.
  await supabase
    .from('applications')
    .update({ status: 'INCOMPLETE_DOCUMENTS', updated_at: new Date().toISOString() })
    .eq('id', id)
    .in('status', ['UNDER_REVIEW', 'PENDING'])

  return NextResponse.json({ success: true })
}

// DELETE /api/admin/applications/[id]/required-documents?reqDocId=UUID
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const url = new URL(req.url)
  const reqDocId = url.searchParams.get('reqDocId')

  if (!reqDocId) {
    return NextResponse.json({ error: 'Missing reqDocId' }, { status: 400 })
  }

  const supabase = await createClient()

  // Verify auth & admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('portal_profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { error } = await supabase
    .from('application_required_documents')
    .delete()
    .eq('id', reqDocId)
    .eq('application_id', id)

  if (error) {
    console.error('Delete doc error:', error)
    return NextResponse.json({ error: 'Failed to remove document' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
