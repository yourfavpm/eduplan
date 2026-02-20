import { NextResponse } from 'next/server'
import { getDocumentDownloadUrl } from '@/lib/supabase/documents'

// GET /api/admin/documents/download?path=documents/...
export async function GET(req: Request) {
  const url = new URL(req.url)
  const filePath = url.searchParams.get('path')
  if (!filePath) return NextResponse.json({ error: 'path is required' }, { status: 400 })

  const signedUrl = await getDocumentDownloadUrl(filePath)
  if (!signedUrl) return NextResponse.json({ error: 'Could not generate download URL' }, { status: 500 })

  // Redirect to the signed URL so the browser downloads/previews the file
  return NextResponse.redirect(signedUrl)
}
