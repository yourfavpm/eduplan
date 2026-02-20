'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  DocumentType,
  RequiredDocument,
  UploadedDocument,
  DocumentReviewRow,
  QualificationMandatoryDoc,
} from '@/types/portal'

// ─── Document Types (Admin CRUD) ─────────────────────────

export async function getDocumentTypes(): Promise<DocumentType[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('document_types')
    .select('*')
    .order('name', { ascending: true })
  return (data ?? []) as DocumentType[]
}

export async function createDocumentType(fields: { name: string; description?: string }): Promise<DocumentType | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('document_types').insert({ ...fields, required: false }).select().single()
  if (error) { console.error('createDocumentType:', error); return null }
  return data as DocumentType
}

export async function updateDocumentType(id: string, fields: Partial<{ name: string; description: string }>): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('document_types').update(fields).eq('id', id)
  if (error) { console.error('updateDocumentType:', error); return false }
  return true
}

export async function deleteDocumentType(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('document_types').delete().eq('id', id)
  if (error) { console.error('deleteDocumentType:', error); return false }
  return true
}

// ─── Qualification Mandatory Docs ────────────────────────

export async function getQualificationMandatoryDocs(qualificationLevelId: string): Promise<QualificationMandatoryDoc[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('qualification_mandatory_documents')
    .select('*')
    .eq('qualification_level_id', qualificationLevelId)
  return (data ?? []) as QualificationMandatoryDoc[]
}

export async function upsertQualificationMandatoryDoc(
  qualificationLevelId: string,
  documentTypeId: string,
  isRequired: boolean
): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('qualification_mandatory_documents')
    .upsert({ qualification_level_id: qualificationLevelId, document_type_id: documentTypeId, is_required: isRequired },
      { onConflict: 'qualification_level_id,document_type_id' })
  if (error) { console.error('upsertQualificationMandatoryDoc:', error); return false }
  return true
}

export async function removeQualificationMandatoryDoc(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('qualification_mandatory_documents').delete().eq('id', id)
  if (error) { console.error('removeQualificationMandatoryDoc:', error); return false }
  return true
}

// ─── Required Documents (Per Application) ─────────────────

export async function getRequiredDocuments(applicationId: string): Promise<RequiredDocument[]> {
  const supabase = await createClient()

  const { data: reqDocs, error } = await supabase
    .from('application_required_documents')
    .select(`*, document_type:document_types(*)`)
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true })

  if (error) { console.error('getRequiredDocuments:', error); return [] }
  if (!reqDocs || reqDocs.length === 0) return []

  const reqDocIds = reqDocs.map(r => r.id)
  const { data: uploads } = await supabase
    .from('documents')
    .select('*')
    .in('required_document_id', reqDocIds)
    .order('created_at', { ascending: false })

  const uploadMap = new Map<string, UploadedDocument>()
  for (const upload of uploads ?? []) {
    if (upload.required_document_id && !uploadMap.has(upload.required_document_id)) {
      uploadMap.set(upload.required_document_id, upload as UploadedDocument)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return reqDocs.map((r: any) => ({
    id: r.id,
    application_id: r.application_id,
    document_type_id: r.document_type_id,
    source: r.source ?? 'auto_qualification',
    status: r.status,
    rejection_reason: r.rejection_reason,
    created_at: r.created_at,
    updated_at: r.updated_at ?? r.created_at,
    document_type: Array.isArray(r.document_type) ? r.document_type[0] : r.document_type,
    latest_upload: uploadMap.get(r.id) ?? null,
  })) as RequiredDocument[]
}

export async function assignDocumentType(
  applicationId: string,
  documentTypeId: string,
  source: 'auto_qualification' | 'manual_admin' = 'manual_admin'
): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('application_required_documents')
    .insert({ application_id: applicationId, document_type_id: documentTypeId, source, status: 'pending' })
  if (error) { console.error('assignDocumentType:', error); return false }
  return true
}

export async function removeAssignedDocument(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('application_required_documents').delete().eq('id', id)
  if (error) { console.error('removeAssignedDocument:', error); return false }
  return true
}

// ─── Student Upload ────────────────────────────────────────

export async function uploadDocument(
  userId: string,
  applicationId: string,
  requiredDocId: string,
  documentTypeId: string,
  file: File
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const ext = file.name.split('.').pop()
  // New storage path format per spec: documents/{user_id}/{application_id}/{document_type_id}/{filename}
  const storagePath = `documents/${userId}/${applicationId}/${documentTypeId}/${Date.now()}.${ext}`

  const { error: storageError } = await supabase.storage
    .from('documents')
    .upload(storagePath, file, { upsert: true })

  if (storageError) {
    console.error('uploadDocument storage:', storageError)
    return { success: false, error: 'Failed to upload file. Please try again.' }
  }

  const { error: insertError } = await supabase.from('documents').insert({
    user_id: userId,
    application_id: applicationId,
    document_type_id: documentTypeId,
    required_document_id: requiredDocId,
    file_path: storagePath,
    original_filename: file.name,
    file_size: file.size,
    status: 'uploaded',
  })

  if (insertError) { console.error('uploadDocument insert:', insertError); return { success: false, error: 'Failed to save document record.' } }

  await supabase
    .from('application_required_documents')
    .update({ status: 'uploaded', rejection_reason: null })
    .eq('id', requiredDocId)

  return { success: true }
}

// ─── Admin: Approve / Reject ──────────────────────────────

export async function approveDocument(requiredDocId: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('application_required_documents')
    .update({ status: 'approved', rejection_reason: null }).eq('id', requiredDocId)
  if (error) { console.error('approveDocument:', error); return false }
  await supabase.from('documents').update({ status: 'approved', rejection_reason: null }).eq('required_document_id', requiredDocId)
  return true
}

export async function rejectDocument(requiredDocId: string, reason: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('application_required_documents')
    .update({ status: 'rejected', rejection_reason: reason }).eq('id', requiredDocId)
  if (error) { console.error('rejectDocument:', error); return false }
  await supabase.from('documents').update({ status: 'rejected', rejection_reason: reason }).eq('required_document_id', requiredDocId)
  return true
}

// ─── Admin: Review Queue ──────────────────────────────────

export async function getDocumentReviewQueue(
  filter?: 'uploaded' | 'approved' | 'rejected'
): Promise<DocumentReviewRow[]> {
  const supabase = await createClient()

  let query = supabase
    .from('documents')
    .select(`
      id, required_document_id, file_path, original_filename,
      status, rejection_reason, created_at,
      document_type:document_types(id, name, description, required, created_at),
      profile:portal_profiles(full_name, email),
      application:applications(id, study_destination, title),
      required_doc:application_required_documents(source)
    `)
    .order('created_at', { ascending: false })

  if (filter) query = query.eq('status', filter)

  const { data, error } = await query
  if (error) { console.error('getDocumentReviewQueue:', error); return [] }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => ({
    id: row.id,
    required_document_id: row.required_document_id,
    file_path: row.file_path,
    original_filename: row.original_filename,
    status: row.status,
    rejection_reason: row.rejection_reason,
    created_at: row.created_at,
    source: (Array.isArray(row.required_doc) ? row.required_doc[0] : row.required_doc)?.source ?? null,
    document_type: Array.isArray(row.document_type) ? row.document_type[0] : row.document_type,
    profile: Array.isArray(row.profile) ? row.profile[0] : row.profile,
    application: Array.isArray(row.application) ? row.application[0] : row.application,
  })) as DocumentReviewRow[]
}

// ─── Signed download URL ──────────────────────────────────

export async function getDocumentDownloadUrl(filePath: string): Promise<string | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from('documents')
    .createSignedUrl(filePath, 3600)
  if (error) { console.error('getDocumentDownloadUrl:', error); return null }
  return data?.signedUrl ?? null
}
