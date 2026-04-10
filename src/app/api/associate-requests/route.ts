import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendAdminNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, phone, occupation, city, country, gender, qualification } = body;

    if (!full_name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("associate_requests")
      .insert({
        full_name,
        email,
        phone,
        occupation,
        city,
        country,
        gender,
        qualification,
        status: "pending"
      })
      .select()
      .single();

    if (error) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: "Failed to save request." }, { status: 500 });
    }

    // Email notification
    try {
      await sendAdminNotification({
        type: "GENERAL",
        subject: `New Associate Application: ${full_name}`,
        data: {
          ...body,
          form_type: "Associate Application",
          submitted_at: new Date().toISOString()
        }
      });
    } catch (e) {
      console.error("Email Error:", e);
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
