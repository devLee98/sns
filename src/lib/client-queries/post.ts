import { createClient } from "@/lib/client";

const PAGE_SIZE = 5;

export async function fetchPostsClient({
  cursor,
  limit = PAGE_SIZE,
}: {
  cursor: number | null;
  limit: number;
}) {
  const supabase = createClient();
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

export async function fetchPostByIdClient(postId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id(*)")
    .eq("id", postId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
