import { NextResponse } from "next/server";
import { sendAdminNotification, EmailPayload } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const payload: EmailPayload = await req.json();

    if (!payload.type || !payload.subject || !payload.data) {
      return NextResponse.json(
        { error: "Invalid payload. Missing type, subject, or data." },
        { status: 400 }
      );
    }

    const result = await sendAdminNotification(payload);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email via Resend" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, simulated: result.simulated });
  } catch (err) {
    console.error("/api/send-email Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
