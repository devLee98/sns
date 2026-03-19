import { fetchPostsServer } from "@/lib/server-queries/post";
import PostFeedClient from "./post-feed-client";

export default async function PostFeedServer() {
  const { posts, nextCursor } = await fetchPostsServer({
    cursor: null, //첫 페이지 요청
    limit: 5, //한 페이지에 보여줄 게시물 수
  });
  return <PostFeedClient initialPosts={posts} initialNextCursor={nextCursor} />;
}
