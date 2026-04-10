import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const body = await req.json()

  const { university_id, university_name, full_name, email, phone, highest_qualification, gender, country_of_birth, city_of_residence } = body

  if (!full_name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('university_applications')
    .insert({
      university_id: university_id || null,
      university_name: university_name || null,
      full_name,
      email,
      phone: phone || null,
      highest_qualification: highest_qualification || null,
      gender: gender || null,
      country_of_birth: country_of_birth || null,
      city_of_residence: city_of_residence || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, id: data?.id })
}
