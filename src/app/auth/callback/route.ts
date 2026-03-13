import { createClient } from "@/lib/server";
import { getRandomNickname } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(
      new URL("/signin?error=missing_code", url.origin),
    );
  }

  const supabase = createClient(await cookies());

  // 1) code -> session
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return NextResponse.redirect(
      new URL(
        `/signin?error=${encodeURIComponent(exchangeError.message)}`,
        url.origin,
      ),
    );
  }

  // 2) user id 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(
      new URL("/signin?error=user_not_found", url.origin),
    );
  }

  // 3) profile 보장 생성 (있으면 무시)
  const { error: profileError } = await supabase.from("profile").upsert(
    {
      id: user.id,
      nickname: getRandomNickname(),
      bio: "",
      avatar_url: user.user_metadata?.avatar_url ?? null,
    },
    {
      onConflict: "id",
      ignoreDuplicates: true,
    },
  );

  if (profileError) {
    return NextResponse.redirect(
      new URL(
        `/signin?error=${encodeURIComponent(profileError.message)}`,
        url.origin,
      ),
    );
  }

  // 4) 최종 이동
  return NextResponse.redirect(new URL(next, url.origin));
}
