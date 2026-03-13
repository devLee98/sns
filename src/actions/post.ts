"use server";

import { createClient } from "@/lib/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData): Promise<void> {
  const content = formData.get("content") as string;
  if (!content.trim()) return;

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.from("post").insert({ content });
  if (error)
    redirect(`/?error=${encodeURIComponent("포스트 생성에 실패했습니다.")}`);
  redirect(`/?success=${encodeURIComponent("포스트가 생성되었습니다.")}`);
}
