import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export async function fetchPostsServer({
  cursor,
  limit,
}: {
  cursor: number | null;
  limit: number;
}) {
  const supabase = createClient(await cookies());
  let query = supabase
    .from("post")
    .select("*, author: profile!author_id(*)")
    .order("id", { ascending: false }) // 커서(id) 기준 컬럼
    .limit(limit + 1);

  if (cursor !== null) {
    query = query.lt("id", cursor); // cursor보다 작은 id만 요청
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const hasMore = data.length > limit;
  const posts = hasMore ? data.slice(0, limit) : data;
  const nextCursor = hasMore ? posts[posts.length - 1].id : null;

  return { posts, nextCursor };
}
