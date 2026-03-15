"use client";

import { usePostEditModal } from "@/app/store/posteditmodal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
}: {
  createWithdImagesAction: (formData: FormData) => Promise<void>;
}) {
  const { isOpen, close } = usePostEditModal();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleCloseModal = () => {
    setContent("");
    setImages([]);
    close();
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    images.forEach((img) => formData.append("image", img.file));
    await createWithdImagesAction(formData);
    handleCloseModal();
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
        <form id="post-edit-form" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            name="content"
            value={content}
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
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => imageInputRef.current?.click()}
        >
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
