import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export async function fetchPostsAction() {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
