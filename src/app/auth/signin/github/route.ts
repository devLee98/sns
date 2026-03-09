import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const supabase = createClient(await cookies());

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  //예외처리1
  if (error) {
    return NextResponse.redirect(
      new URL(`/signin?error=${encodeURIComponent(error.message)}`, origin),
    );
  }

  //예외처리2
  if (!data.url) {
    return NextResponse.redirect(new URL("/signin", origin));
  }

  return NextResponse.redirect(data.url);
}
