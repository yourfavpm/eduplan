import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

const SLUG_TO_KEY: Record<string, string[]> = {
  'why': ['resource_why_hero', 'resource_why_benefits'],
  'process': ['resource_process_hero', 'resource_process_steps'],
  'requirements': ['resource_reqs_hero', 'resource_reqs_list'],
  'interviews': ['resource_interviews_hero', 'resource_interviews_tips'],
  'personal-statement': ['resource_ps_hero', 'resource_ps_structure'],
  'choosing-course': ['resource_course_hero', 'resource_course_factors'],
  'choosing-university': ['resource_uni_hero', 'resource_uni_rankings'],
  'apply': ['resource_apply_hero', 'resource_apply_steps'],
}

export default async function ResourceSubPage({ params }: Props) {
  const { slug } = await params
  const keys = SLUG_TO_KEY[slug]
  if (!keys) return notFound()

  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', keys)

  const content: Record<string, Record<string, string>> = {}
  settings?.forEach(s => { content[s.key] = s.value })

  // Find hero and sections
  const heroKey = keys[0]
  const hero = content[heroKey] ?? {}
  const detailKey = keys[1]
  const details = content[detailKey] ?? {}

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-brand-700 text-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/study-abroad" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mb-4">{hero.title || hero.headline || slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h1>
          <p className="text-white/80 text-lg leading-relaxed">{hero.description || hero.intro || hero.subtitle || hero.subtext || 'Guiding you through every step of your international education journey.'}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid gap-12">
          {Object.entries(details).map(([key, value]) => (
            <section key={key} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 capitalize">{key.split('_').join(' ')}</h2>
                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-brand-50 border border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">Ready to start your journey?</h3>
                <p className="text-brand-700">Book a free consultation with our expert advisors today.</p>
            </div>
            <Link href="/portal/sign-up" className="bg-brand-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md flex items-center gap-2">
                Get Started <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </div>
  )
}
