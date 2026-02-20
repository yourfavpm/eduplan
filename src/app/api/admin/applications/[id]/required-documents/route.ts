import { NextResponse } from 'next/server'
import { getRequiredDocuments } from '@/lib/supabase/documents'

// GET /api/admin/applications/[id]/required-documents
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const docs = await getRequiredDocuments(id)
  return NextResponse.json(docs)
}
