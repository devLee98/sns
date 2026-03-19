import { fetchPosts } from "@/lib/client-queries/post";
import { QUERY_KEYS } from "@/lib/constants";
import { Post } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const PageSize = 5;

export default function useInfinitePostData(initialPosts: Post[]) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam = 1 }) => {
      const from = pageParam * PageSize;
      const to = from + PageSize - 1;
      const posts = await fetchPosts({ from, to });
      return posts;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PageSize) return undefined;
      return allPages.length;
    },
    initialData: {
      pages: [initialPosts],
      pageParams: [0],
    },
  });
}
