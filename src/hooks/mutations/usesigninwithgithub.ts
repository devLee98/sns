import { signInWithGithub } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithGithub() {
  return useMutation({
    mutationFn: signInWithGithub,
  });
}
