import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll(); //현제 세션 쿠기 읽음
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => request.cookies.set(name, value), //현재 요청과 상태 동기화
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(
            ({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options), //브라우저에 최종 저장
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims(); //현재 엑세스토큰 확인(유효성검사), 문제시 세선 갱신 시도

  const user = data?.claims;
  const path = request.nextUrl.pathname;

  // 1) 로그인 유저는 auth 페이지 접근 막기
  if (user && (path.startsWith("/signin") || path.startsWith("/signup"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 2) 비로그인 유저는 로그인 페이지 접근 막기
  if (
    !user &&
    !path.startsWith("/signin") &&
    !path.startsWith("/signup") &&
    !path.startsWith("/forgetpassword") &&
    !path.startsWith("/resetpassword") &&
    !path.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
