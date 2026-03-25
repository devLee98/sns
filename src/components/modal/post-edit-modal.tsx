"use client";

import { useOpenAlertModal } from "@/app/store/alert-modal";
import { usePostEditModal } from "@/app/store/post-edit-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QUERY_KEYS } from "@/lib/constants";
import { PostEntity } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditModal({
  createWithdImagesAction,
  updatePostAction,
}: {
  createWithdImagesAction: (formData: FormData) => Promise<void>;
  updatePostAction: (
    post: Partial<PostEntity> & { id: number },
  ) => Promise<PostEntity>;
}) {
  const queryClient = useQueryClient();
  const postEditModal = usePostEditModal();
  const openAlertModal = useOpenAlertModal();
  const isEdit = postEditModal.isOpen && postEditModal.type === "EDIT";
  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const resetAndCloseModal = () => {
    setContent("");
    setImages([]);
    postEditModal.actions.close();
  };
  const handleCloseModal = () => {
    if (content !== "" || images.length > 0) {
      openAlertModal({
        title: "게시글 작성이 마무리되지 않았습니다.",
        description: "게시글 작성을 취소하시겠습니까?",
        onPositive: () => {
          resetAndCloseModal();
        },
        onNegative: () => {},
      });

      return;
    }
    resetAndCloseModal();
  };
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prev) =>
      prev.filter((img) => img.previewUrl !== image.previewUrl),
    );
    URL.revokeObjectURL(image.previewUrl); //메모리 누수 방지
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postEditModal.isOpen && postEditModal.type === "EDIT") {
      await updatePostAction({
        id: postEditModal.postId,
        content,
      });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
      resetAndCloseModal();
      return;
    }

    // CREATE
    const formData = new FormData();
    formData.append("content", content);
    images.forEach((img) => formData.append("image", img.file));
    await createWithdImagesAction(formData);
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
    resetAndCloseModal();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    if (!postEditModal.isOpen) {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl)); //메모리 누수 방지
      return;
    }
  }, [postEditModal.isOpen, images]);

  // 서버에서는 바로 null 반환 (document 없음)
  if (typeof window === "undefined") {
    return null;
  }

  // 클라이언트에서만 modal-root를 찾고, 없으면 null
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <Dialog
      open={postEditModal.isOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal();
      }}
    >
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <form id="post-edit-form" onSubmit={handleSubmit}>
          <textarea
            key={isEdit ? `edit-${postEditModal.postId}` : "create"}
            defaultValue={isEdit ? postEditModal.content : ""}
            ref={textareaRef}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            className="max-h-125 min-h-25 w-full focus:outline-none"
            placeholder="무슨 일이 있었나요?"
          />
          <input
            onChange={handleSelectImages}
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
          />
        </form>
        {postEditModal.isOpen && postEditModal.type === "EDIT" && (
          <Carousel className="flex flex-wrap gap-2">
            <CarouselContent>
              {postEditModal.imageUrls?.map((url) => (
                <CarouselItem className="basis-2/5" key={url}>
                  <div className="relative">
                    <Image
                      src={url}
                      alt={url}
                      width={600}
                      height={600}
                      className="rounded-sm object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {images.length > 0 && (
          <Carousel className="flex flex-wrap gap-2">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <Image
                      src={image.previewUrl}
                      alt={image.file.name}
                      width={600}
                      height={600}
                      className="rounded-sm object-cover"
                    />
                    <div className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1">
                      <XIcon
                        className="size-4 text-white"
                        onClick={() => handleDeleteImage(image)}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {postEditModal.isOpen && postEditModal.type === "CREATE" && (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon />
            이미지 추가
          </Button>
        )}
        <Button className="cursor-pointer" type="submit" form="post-edit-form">
          저장
        </Button>
      </DialogContent>
    </Dialog>,
    modalRoot,
  );
}
