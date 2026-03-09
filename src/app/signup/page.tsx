"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/usesignup";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const { mutate: signup, isPending: isSignupPending } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    signup({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="py-6"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="py-6"
        />
      </div>
      <div>
        <Button
          className="w-full"
          onClick={handleSignup}
          disabled={isSignupPending}
        >
          로그인
        </Button>
      </div>
      <div>
        <Link
          href="/signin"
          className="text-muted-foreground text-sm hover:underline"
        >
          이미 계정이 있으신가요?
        </Link>
      </div>
    </div>
  );
}
