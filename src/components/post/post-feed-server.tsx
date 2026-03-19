import { fetchPostsServer } from "@/lib/server-queries/post";
import PostFeedClient from "./post-feed-client";

export default async function PostFeedServer() {
  const data = await fetchPostsServer({ from: 0, to: 4 });

  return <PostFeedClient initialPosts={data} />;
}
