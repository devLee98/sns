import { createClient } from "@/lib/server";
import { ProfileEntity } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchProfileAction(
  userId: string,
): Promise<ProfileEntity> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    redirect(`/profile?error=${encodeURIComponent(error.message)}`);
  }
  if (!data) redirect("/profile?error=profile_not_found");

  return data;
}
