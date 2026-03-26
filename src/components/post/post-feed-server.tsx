import { getUserAction } from "@/actions/auth";
import { fetchPostsServer } from "@/lib/server-queries/post";
import PostFeedClient from "./post-feed-client";

export default async function PostFeedServer() {
  const user = await getUserAction();

  const { posts, nextCursor } = await fetchPostsServer({
    cursor: null,
    limit: 5,
    userId: user!.id,
  });

  return (
    <PostFeedClient
      initialPosts={posts}
      initialNextCursor={nextCursor}
      userId={user!.id}
    />
  );
}
