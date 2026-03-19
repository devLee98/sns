"use client";

import Loader from "@/components/loader";
import useInfinitePostData from "@/hooks/queries/use-infinite-post-data";
import type { Post } from "@/lib/types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Fallback from "../fallback";
import PostItem from "./post-item";

type Props = {
  initialPosts: Post[];
  initialNextCursor: number | null;
};

export default function PostFeedClient({
  initialPosts,
  initialNextCursor,
}: Props) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, error } =
    useInfinitePostData({ initialPosts, initialNextCursor });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // const posts = data?.pages.flat() ?? [];
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  if (error) return <Fallback />;
  return (
    <div className="flex flex-col gap-10">
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
