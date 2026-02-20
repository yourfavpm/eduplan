import { getDocumentReviewQueue } from '@/lib/supabase/documents'
import DocumentReviewClient from './DocumentReviewClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Document Review | Admin — EduPlan360',
}

export default async function AdminDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const validFilter = filter === 'uploaded' || filter === 'approved' || filter === 'rejected'
    ? filter
    : undefined

  const docs = await getDocumentReviewQueue(validFilter)

  return <DocumentReviewClient docs={docs} activeFilter={validFilter} />
}
