import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendAdminNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, phone, study_level, country_of_interest, preferred_date, message, source } = body;

    // 1. Validation
    if (!full_name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields: full_name, email, and phone are mandatory." }, { status: 400 });
    }

    // 2. Insert into Database
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("consultations")
      .insert({
        full_name,
        email,
        phone,
        study_level,
        country_of_interest,
        preferred_date,
        message,
        source,
        status: "pending"
      })
      .select()
      .single();

    if (error) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: "Failed to save consultation request." }, { status: 500 });
    }

    // 3. Send Notification Email
    try {
      await sendAdminNotification({
        type: "GENERAL",
        subject: `New Consultation Request: ${full_name}`,
        data: {
          ...body,
          form_type: "Consultation Booking",
          submitted_at: new Date().toISOString()
        }
      });
    } catch (emailError) {
      console.error("Email Notification Error:", emailError);
      // We don't fail the request if only the email fails, as the DB save was successful.
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
