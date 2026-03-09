"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/usesigninwithpassword";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const { mutate: signIn, isPending } = useSignInWithPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) return;

    signIn({ email: cleanEmail, password: cleanPassword });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
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
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSignIn} disabled={isPending}>
          로그인
        </Button>
        <Button className="w-full" variant="outline" asChild>
          <Link href="/auth/signin/github">깃허브 로그인</Link>
        </Button>
        <Button className="w-full" variant="outline" asChild>
          <Link href="/auth/signin/kakao">카카오 로그인</Link>
        </Button>
      </div>
      <div>
        <Link
          href="/signup"
          className="text-muted-foreground text-sm hover:underline"
        >
          계정이 없으신가요?
        </Link>
      </div>
    </div>
  );
}
