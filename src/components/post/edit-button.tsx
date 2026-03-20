import { useOpenEditPostEditModal } from "@/app/store/post-edit-modal";
import { PostEntity } from "@/lib/types";
import { Button } from "../ui/button";

export default function EditButton(props: PostEntity) {
  const openPostEditorModal = useOpenEditPostEditModal();
  const handleClick = () => {
    openPostEditorModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };
  return (
    <Button className="cursor-pointer" variant={"ghost"} onClick={handleClick}>
      수정
    </Button>
  );
}
