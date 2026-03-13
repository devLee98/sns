"use client";

import { useClosePostEditModal } from "@/app/store/posteditmodal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
  success: string | null;
};

export default function PostSuccessToast({ success }: Props) {
  const shownRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const closePostModal = useClosePostEditModal();

  useEffect(() => {
    if (!success || shownRef.current) return;
    shownRef.current = true;

    // 1) 성공 토스트
    toast.success(success, { position: "top-center" });

    // 2) 모달 닫기 (zustand)
    closePostModal();

    // 3) URL에서 success 파라미터 제거
    const params = new URLSearchParams(searchParams.toString());
    params.delete("success");
    const next = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(next);
  }, [success, closePostModal, pathname, router, searchParams]);

  return null;
}
