import useTogglePostLike from "@/hooks/mutations/use-toggle-post-like";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

export default function LikePostButton({
  id,
  likeCount,
}: {
  id: number;
  likeCount: number;
}) {
  const { mutate: togglePostLike } = useTogglePostLike({
    onError: () => {
      toast.error("좋아요 요청에 실패했습니다.", { position: "top-center" });
    },
  });
  const handleLikeClick = () => {
    togglePostLike({ postId: id });
  };
  return (
    <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
      <HeartIcon className="h-4 w-4" onClick={handleLikeClick} />
      <span>{likeCount}</span>
    </div>
  );
}
