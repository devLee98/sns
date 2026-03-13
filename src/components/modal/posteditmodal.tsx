"use client";

import { usePostEditModal } from "@/app/store/posteditmodal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function PostEditModal({
  createPostAction,
}: {
  createPostAction: (formData: FormData) => Promise<void>;
}) {
  const { isOpen, close } = usePostEditModal();

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    setContent("");
    close();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // 서버에서는 바로 null 반환 (document 없음)
  if (typeof window === "undefined") {
    return null;
  }

  // 클라이언트에서만 modal-root를 찾고, 없으면 null
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <form action={createPostAction} id="post-edit-form">
          <textarea
            ref={textareaRef}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="max-h-125 min-h-25 w-full focus:outline-none"
            placeholder="무슨 일이 있었나요?"
          />
        </form>
        <Button variant="outline" className="cursor-pointer">
          <ImageIcon />
          이미지 추가
        </Button>
        <Button className="cursor-pointer" type="submit" form="post-edit-form">
          저장
        </Button>
      </DialogContent>
    </Dialog>,
    modalRoot,
  );
}
