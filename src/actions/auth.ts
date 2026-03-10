"use server";

import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    throw new Error("이메일/비밀번호를 입력하세요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  redirect("/");
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    throw new Error("이메일/비밀번호를 입력하세요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  redirect("/");
}
