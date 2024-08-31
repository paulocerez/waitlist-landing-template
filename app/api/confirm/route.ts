import { supabase } from "@/lib/supabase/client";
import verifyToken from "@/lib/supabase/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const email = await verifyToken(token);
    if (!email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const { error } = await supabase
      .from("subscribers")
      .update({ confirmed: true, token: null })
      .eq("email", email);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Subscription confirmed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error confirming subscription:", error);
    return NextResponse.json(
      { error: "Failed to confirm subscription" },
      { status: 500 }
    );
  }
}
