import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: asset } = await supabase.from('media_assets').select('file_path').eq('id', id).single()
  if (asset?.file_path) await supabase.storage.from('media').remove([asset.file_path])

  await supabase.from('media_assets').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
