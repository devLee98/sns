import { signInWithKakao } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithKakao() {
  return useMutation({
    mutationFn: signInWithKakao,
  });
}
