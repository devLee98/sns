"use server";

import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  // TODO(auth): 쿼리스트링 에러 전달 대신 flash cookie로 전환해서 화면 깜빡임 제거
  // TODO(auth): 실패 시 이메일/비밀번호 입력값 초기화 정책 정리(회원가입/로그인 공통)
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect("/signin?error=이메일과 비밀번호를 입력하세요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/signin?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/");
}

export async function signInWithPasswordAction(formData: FormData) {
  // TODO(auth): 쿼리스트링 에러 전달 대신 flash cookie로 전환해서 화면 깜빡임 제거
  // TODO(auth): 실패 시 이메일/비밀번호 입력값 초기화 정책 정리(회원가입/로그인 공통)
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect("/signin?error=이메일과 비밀번호를 입력하세요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/signin?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/");
}

export async function requestResetPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    redirect("/forgetpassword?error=이메일을 입력하세요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/resetpassword`,
  });

  if (error) {
    redirect(`/forgetpassword?error=${encodeURIComponent(error.message)}`);
  }
}

export async function updatePasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "").trim();

  if (!password) {
    redirect("/resetpassword?error=비밀번호를 입력하세요.");
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/resetpassword?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/");
}
