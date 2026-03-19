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
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, //이코드의 값이 PageParam으로 전달됨
    //서버에서 받은 데이터를 초기 데이터로 설정(하이브리드 방식에서 초기 데이터를 설정하는 방법)
    initialData: {
      pages: [{ posts: initialPosts, nextCursor: initialNextCursor }],
      pageParams: [null as number | null],
    },
  });
}
