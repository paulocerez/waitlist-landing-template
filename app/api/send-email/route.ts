import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import generateToken from "@/lib/supabase/generateToken";
import waitlistConfirmationTemplate from "@/lib/email-templates/waitlist-confirmation";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
  const token = generateToken(email);
  const confirmationUrl = `${baseUrl}/confirm?token=${token}`;

  const message = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || "paulo.ramirez@code.berlin",
    subject: "Welcome to our Waitlist!",
    text: `Hello ${name},\n\nThank you for joining our waitlist. We'll keep you updated on our progress!`,
    html: waitlistConfirmationTemplate(name, confirmationUrl),
  };

  try {
    await sgMail.send(message);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
