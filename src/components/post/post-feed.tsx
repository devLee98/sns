"use client";
import { usePostData } from "@/hooks/queries/use-post-data";
import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";

export default function PostFeed() {
  const { data, isPending, error } = usePostData();

  if (isPending) return <Loader />;

  if (error) return <Fallback />;

  return (
    <div className="flex flex-col gap-10">
      {data.map((post) => {
        return <PostItem key={post.id} {...post} />;
      })}
    </div>
  );
}
