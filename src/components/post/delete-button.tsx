import { deleteImageAction } from "@/actions/image";
import { deletePostAction } from "@/actions/post";
import { useOpenAlertModal } from "@/app/store/alert-modal";
import { QUERY_KEYS } from "@/lib/constants";
import { Post } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

export default function DeleteButton({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const openAlertModal = useOpenAlertModal();
  const handleDeleteClick = async () => {
    openAlertModal({
      title: "게시글 삭제",
      description: "게시글을 삭제하시겠습니까?",
      onPositive: async () => {
        await deletePostAction(post.id);

        if (post.image_urls?.length) {
          await deleteImageAction(`${post.author.id}/${post.id}`);
        }
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
      },
    });
  };
  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleDeleteClick}
    >
      삭제
    </Button>
  );
}
