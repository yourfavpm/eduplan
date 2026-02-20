import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditEvent } from '@/lib/supabase/audit'

// POST /api/admin/cms/site-settings { key, value }
export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key, value } = await req.json()
  if (!key) return NextResponse.json({ error: 'key is required' }, { status: 400 })

  const { data: before } = await supabase.from('site_settings').select('value').eq('key', key).single()
  const { error } = await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logAuditEvent({ actorId: user.id, action: 'UPDATE_SITE_SETTINGS', entityType: 'site_settings', entityId: key, before: { value: before?.value }, after: { value } })

  return NextResponse.json({ success: true })
}
