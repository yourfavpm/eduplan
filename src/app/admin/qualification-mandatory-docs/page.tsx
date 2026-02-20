import { createClient } from '@/lib/supabase/server'
import QualMandatoryDocsClient from './QualMandatoryDocsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mandatory Doc Rules | Admin — EduPlan360' }

export default async function QualMandatoryDocsPage() {
  const supabase = await createClient()

  const [{ data: levels }, { data: docTypes }, { data: mappings }] = await Promise.all([
    supabase.from('qualification_levels').select('*').order('sort_order'),
    supabase.from('document_types').select('*').order('name'),
    supabase.from('qualification_mandatory_documents').select('*'),
  ])

  return (
    <QualMandatoryDocsClient
      qualificationLevels={levels ?? []}
      documentTypes={docTypes ?? []}
      initialMappings={mappings ?? []}
    />
  )
}
