import { togglePostLikeAction } from "@/actions/post";
import { QUERY_KEYS } from "@/lib/constants";
import { Post, UseMutationCallback } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: togglePostLikeAction,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });
      const previousPost = queryClient.getQueryData<Post>([
        QUERY_KEYS.post.byId(postId),
      ]);
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (old) => {
        if (!old) throw new Error("포스트가 존재하지 않습니다.");
        return {
          ...old,
          isLiked: !old.isLiked,
          like_count: old.like_count + (old.isLiked ? -1 : 1),
        };
      });
      return { previousPost };
    },
    onError: (error, _, context) => {
      if (context && context.previousPost) {
        queryClient.setQueryData(
          QUERY_KEYS.post.byId(context.previousPost.id),
          context.previousPost,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
