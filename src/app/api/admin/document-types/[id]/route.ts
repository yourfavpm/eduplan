import { NextResponse } from 'next/server'
import { updateDocumentType, deleteDocumentType } from '@/lib/supabase/documents'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const ok = await updateDocumentType(id, body)
  if (!ok) return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ok = await deleteDocumentType(id)
  if (!ok) return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  return NextResponse.json({ success: true })
}
