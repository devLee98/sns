import { fetchPostsAction } from "@/lib/server-queries/post";
import PostItem from "./post-item";

export default async function PostFeed() {
  const data = await fetchPostsAction();
  // const { data, isPending, error } = usePostData();

  // if (isPending) return <Loader />;

  // if (error) return <Fallback />;

  return (
    <div className="flex flex-col gap-10">
      {data.map((post) => {
        return <PostItem key={post.id} {...post} />;
      })}
    </div>
  );
}
