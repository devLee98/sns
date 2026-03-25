import Loader from "@/components/loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { usePostById } from "@/hooks/queries/use-post-by-id";
import { HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import Fallback from "../fallback";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

export default function PostItem({
  postId,
  UserId,
}: {
  postId: number;
  UserId: string;
}) {
  const {
    data: post,
    isPending,
    error,
  } = usePostById({ postId, type: "FEED" });
  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <Image
            src={post.author.avatar_url || "/default-avatar.png"}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {UserId === post.author.id && <EditButton {...post} />}
          {UserId === post.author.id && <DeleteButton post={post} />}
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-5">
        <div className="wrap-break-words line-clamp-2 whitespace-pre-wrap">
          {post.content}
        </div>

        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={url}
                    alt=""
                    width={300}
                    height={300}
                    className="h-full max-h-[350px] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2">
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
