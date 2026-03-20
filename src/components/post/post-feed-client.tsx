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
  UserId: string;
};

export default function PostFeedClient({
  initialPosts,
  initialNextCursor,
  UserId,
}: Props) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, error, hasNextPage } =
    useInfinitePostData({ initialPosts, initialNextCursor });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  if (error) return <Fallback />;
  return (
    <div className="flex flex-col gap-10">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} UserId={UserId} />
      ))}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
