import { createClient } from "@/lib/client";

export async function fetchPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
