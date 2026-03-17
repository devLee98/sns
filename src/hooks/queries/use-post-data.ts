import { QUERY_KEYS } from "@/lib/constants";
import { fetchPosts } from "@/lib/queries/post";
import { useQuery } from "@tanstack/react-query";

export function usePostData() {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => fetchPosts(),
  });
}
