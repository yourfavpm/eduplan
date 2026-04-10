import { Resend } from "resend";

const ADMIN_EMAIL = "web@eduplan360.com";
const FROM_EMAIL = "system@eduplan360.com"; // This needs to be a verified domain on Resend

export type EmailPayload = {
  type: "PARTNERSHIP" | "SCHOLARSHIP_INQUIRY" | "CONTACT" | "GENERAL";
  subject: string;
  data: Record<string, string | undefined>;
};

function formatDataToHtml(data: Record<string, string | undefined>) {
  return `
    <table style="width: 100%; border-collapse: collapse; max-width: 600px; margin: 0 auto; font-family: sans-serif;">
      ${Object.entries(data)
        .filter(([, val]) => Boolean(val)) // Only show populated fields
        .map(
          ([key, val]) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <th style="text-align: left; padding: 12px; color: #475569; width: 40%; text-transform: capitalize;">
            ${key.replace(/_/g, " ")}
          </th>
          <td style="padding: 12px; color: #0f172a;">
            ${val}
          </td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
}

export async function sendAdminNotification(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not defined. Skipping email dispatch.");
    return { success: true, simulated: true };
  }

  // Initialize Resend inside the function to avoid build-time errors when the API key is missing
  const resend = new Resend(apiKey);

  const htmlContent = `
    <div style="background-color: #f8fafc; padding: 40px 20px;">
      <div style="background-color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="font-family: sans-serif; color: #0f172a; margin-top: 0; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0;">
          New ${payload.type.replace(/_/g, " ")} Form Submission
        </h2>
        <div style="margin-top: 24px;">
          ${formatDataToHtml(payload.data)}
        </div>
        <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; font-family: sans-serif; text-align: center;">
          This is an automated notification from the EduPlan360 Platform.
        </p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `EduPlan360 System <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `[EduPlan Delivery] ${payload.subject}`,
      html: htmlContent,
      replyTo: payload.data.email, // Conveniently allows admin to just click "Reply"
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err };
  }
}
