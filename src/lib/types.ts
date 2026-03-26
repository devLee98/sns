import type { Database } from "@/lib/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

export type Post = PostEntity & {
  author: ProfileEntity;
};

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  onMutate?: () => void;
};
