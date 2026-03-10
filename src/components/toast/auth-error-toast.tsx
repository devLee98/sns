"use client";

import { generateErrorMessage } from "@/lib/error";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
  error: string | null;
};

export default function AuthErrorToast({ error }: Props) {
  const shownRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!error || shownRef.current) return;
    shownRef.current = true;

    toast.error(generateErrorMessage(error), { position: "top-center" });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    const next = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(next);
  }, [error, pathname, router, searchParams]);

  return null;
}
