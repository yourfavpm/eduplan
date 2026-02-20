import { redirect } from 'next/navigation'

// This page is superseded by the multi-application system.
// Redirect to the new applications list.
export default function LegacyApplicationPage() {
  redirect('/portal/applications')
}
