import { deleteImageAction } from "@/actions/image";
import { deletePostAction } from "@/actions/post";
import { useOpenAlertModal } from "@/app/store/alert-modal";
import { Post } from "@/lib/types";
import { Button } from "../ui/button";

export default function DeleteButton({ post }: { post: Post }) {
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
