"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SignInSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full py-6"
      type="submit"
      form="signin-form"
      disabled={pending}
    >
      로그인
    </Button>
  );
}
