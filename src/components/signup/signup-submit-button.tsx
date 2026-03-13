"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SignUpSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      type="submit"
      form="signup-form"
      disabled={pending}
    >
      회원가입
    </Button>
  );
}
