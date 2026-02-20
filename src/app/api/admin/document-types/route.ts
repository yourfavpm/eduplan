import { NextResponse } from 'next/server'
import { createDocumentType, getDocumentTypes } from '@/lib/supabase/documents'

export async function GET() {
  const types = await getDocumentTypes()
  return NextResponse.json(types)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description } = body
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  const result = await createDocumentType({ name, description })
  if (!result) return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  return NextResponse.json(result)
}
