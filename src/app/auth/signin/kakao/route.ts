import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const supabase = createClient(await cookies());

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      new URL(`/signin?error=${encodeURIComponent(error.message)}`, origin),
    );
  }

  if (!data.url) {
    return NextResponse.redirect(new URL("/signin", origin));
  }

  return NextResponse.redirect(data.url);
}
