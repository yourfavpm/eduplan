import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditEvent } from '@/lib/supabase/audit'

// Generic CMS CRUD handler for any table
// Usage: /api/admin/cms/[table] — GET list + POST create
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params
  const supabase = await createClient()
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { data, error } = await supabase.from(table).insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await logAuditEvent({ actorId: user.id, action: `CREATE_${table.toUpperCase()}`, entityType: table, entityId: data?.id })

  return NextResponse.json(data)
}
