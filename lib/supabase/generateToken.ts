import { TokenPayLoad } from "@/types/token";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase/client";
import { hashToken } from "./verifyToken";

export const jwtSecret = process.env.JWT_SECRET!;

export default function generateToken(email: string): string {
  const payload: TokenPayLoad = {
    email: email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  const token = jwt.sign(payload, jwtSecret);
  const hashedToken = hashToken(token);

  supabase
    .from("subscribers")
    .update({
      token: hashedToken,
      token_created_at: new Date().toISOString(),
    })
    .eq("email", email)
    .then(({ error }) => {
      if (error) console.error("Error storing token:", error);
    });

  return token;
}
