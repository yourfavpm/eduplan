import { NextResponse } from 'next/server'
import { approveDocument, rejectDocument } from '@/lib/supabase/documents'

// PATCH /api/admin/documents/[reqDocId]/review
export async function PATCH(req: Request, { params }: { params: Promise<{ reqDocId: string }> }) {
  const { reqDocId } = await params
  const { action, reason } = await req.json()

  if (action === 'approve') {
    const ok = await approveDocument(reqDocId)
    if (!ok) return NextResponse.json({ error: 'Failed to approve' }, { status: 500 })
    return NextResponse.json({ success: true })
  }

  if (action === 'reject') {
    if (!reason?.trim()) return NextResponse.json({ error: 'Reason required' }, { status: 400 })
    const ok = await rejectDocument(reqDocId, reason.trim())
    if (!ok) return NextResponse.json({ error: 'Failed to reject' }, { status: 500 })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
