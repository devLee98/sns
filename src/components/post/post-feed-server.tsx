import { fetchPostsServer } from "@/lib/server-queries/post";
import PostFeedClient from "./post-feed-client";

export default async function PostFeedServer() {
  const { posts, nextCursor } = await fetchPostsServer({
    cursor: null,
    limit: 5,
  });
  return <PostFeedClient initialPosts={posts} initialNextCursor={nextCursor} />;
}
