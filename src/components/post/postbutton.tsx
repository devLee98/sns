"use client";

import { useOpenPostEditModal } from "@/app/store/post-edit-modal";
import { PlusCircleIcon } from "lucide-react";

export default function PostButton() {
  const open = useOpenPostEditModal();
  return (
    <div
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
      onClick={open}
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <PlusCircleIcon className="size-5" />
      </div>
    </div>
  );
}
