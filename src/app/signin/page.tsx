"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithGithub } from "@/hooks/mutations/usesigninwithgithub";
import { useSignInWithKakao } from "@/hooks/mutations/usesigninwithkakao";
import { useSignInWithPassword } from "@/hooks/mutations/usesigninwithpassword";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const { mutate: signin, isPending: isSigninPending } =
    useSignInWithPassword();
  const { mutate: signinWithGithub, isPending: isSigninWithGithubPending } =
    useSignInWithGithub();
  const { mutate: signinWithKakao, isPending: isSigninWithKakaoPending } =
    useSignInWithKakao();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    signin({ email, password });
  };

  const handleSigninWithGithub = () => {
    signinWithGithub({ provider: "github" });
  };

  const handleSigninWithKakao = () => {
    signinWithKakao({ provider: "kakao" });
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
        <Button
          className="w-full"
          onClick={handleSignin}
          disabled={isSigninPending}
        >
          로그인
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={handleSigninWithGithub}
          disabled={isSigninWithGithubPending}
        >
          깃허브 로그인
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={handleSigninWithKakao}
          disabled={isSigninWithKakaoPending}
        >
          카카오 로그인
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
