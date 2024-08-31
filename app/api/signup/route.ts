import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  try {
    const { data, error } = await supabase
      .from("subscribers")
      .upsert({ name, email })
      .select();

    if (error) throw error;

    // Check if this is a new signup
    const isNewSignup = data && data.length > 0 && !data[0].confirmed;

    if (isNewSignup) {
      const emailResponse = await fetch(
        `${request.nextUrl.origin}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );
      if (!emailResponse.ok) {
        console.error("Failed to send confirmation email");
      }

      console.log(`New signup: ${name} (${email})`);
    }

    return NextResponse.json(
      {
        message: isNewSignup
          ? "Thank you for joining our waitlist! Please check your email for confirmation (100% spam rate right now 🔥)."
          : "You're already on our waitlist. We'll keep you updated!",
        isNewSignup,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
