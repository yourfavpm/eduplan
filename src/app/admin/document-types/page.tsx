import { getDocumentTypes } from '@/lib/supabase/documents'
import DocumentTypesClient from './DocumentTypesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Document Types | Admin — EduPlan360',
}

export default async function DocumentTypesPage() {
  const documentTypes = await getDocumentTypes()
  return <DocumentTypesClient initialTypes={documentTypes} />
}
