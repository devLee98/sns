export const QUERY_KEYS = {
  post: {
    all: ["posts"],
    list: ["post", "list"],
    byId: (postId: number) => ["post", "byId", postId],
  },
};
