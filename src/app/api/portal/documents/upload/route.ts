import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { uploadDocument } from '@/lib/supabase/documents'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const applicationId = formData.get('applicationId') as string | null
  const requiredDocId = formData.get('requiredDocId') as string | null
  const documentTypeId = formData.get('documentTypeId') as string | null

  if (!file || !applicationId || !requiredDocId || !documentTypeId)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const MAX_SIZE = 10 * 1024 * 1024
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })

  const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!ALLOWED.includes(file.type))
    return NextResponse.json({ error: 'Only PDF, JPG, PNG, WebP files are allowed.' }, { status: 400 })

  const result = await uploadDocument(user.id, applicationId, requiredDocId, documentTypeId, file)
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 500 })

  return NextResponse.json({ success: true })
}
