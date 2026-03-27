import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
