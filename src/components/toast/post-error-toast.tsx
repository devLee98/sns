"use client";

import { useClosePostEditModal } from "@/app/store/posteditmodal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
  error: string | null;
};

export default function PostErrorToast({ error }: Props) {
  const shownRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const closePostModal = useClosePostEditModal();

  useEffect(() => {
    if (!error || shownRef.current) return;
    shownRef.current = true;

    // 1) 성공 토스트
    toast.error(error, { position: "top-center" });

    // 2) 모달 닫기 (zustand)
    closePostModal();

    // 3) URL에서 success 파라미터 제거
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    const next = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(next);
  }, [error, closePostModal, pathname, router, searchParams]);

  return null;
}
