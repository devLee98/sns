import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export async function fetchPostsServer({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id(*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return data;
}
