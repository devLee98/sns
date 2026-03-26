import { togglePostLikeAction } from "@/actions/post";
import { UseMutationCallback } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: togglePostLikeAction,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
