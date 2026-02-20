'use server'

import { createClient } from '@/lib/supabase/server'

export async function logAuditEvent({
  actorId,
  action,
  entityType,
  entityId,
  before,
  after,
}: {
  actorId: string
  action: string
  entityType: string
  entityId?: string
  before?: Record<string, unknown>
  after?: Record<string, unknown>
}): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.from('audit_log').insert({
      actor_admin_id: actorId,
      action,
      entity_type: entityType,
      entity_id: entityId ?? null,
      before_json: before ?? null,
      after_json: after ?? null,
    })
  } catch (error) {
    // Audit log failures should never crash the main flow
    console.error('logAuditEvent failed:', error)
  }
}
