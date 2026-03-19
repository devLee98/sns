import { fetchPostsClient } from "@/lib/client-queries/post";
import { QUERY_KEYS } from "@/lib/constants";
import { Post } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseInfinitePostDataParams = {
  initialPosts: Post[];
  initialNextCursor: number | null;
};

export default function useInfinitePostData({
  initialPosts,
  initialNextCursor,
}: UseInfinitePostDataParams) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      fetchPostsClient({ cursor: pageParam, limit: 5 }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialData: {
      pages: [{ posts: initialPosts, nextCursor: initialNextCursor }],
      pageParams: [null as number | null],
    },
  });
}
