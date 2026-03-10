import { signInWithPasswordAction } from "@/actions/auth";
import AuthErrorToast from "@/components/toast/auth-error-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string | null }>;
}) {
  // TODO(auth): 제출 중 버튼 비활성화(useFormStatus) 적용
  const { error } = await searchParams;
  return (
    <>
      <AuthErrorToast error={error} />
      <div className="flex flex-col gap-8">
        <div className="text-xl font-bold">로그인</div>
        <div className="flex flex-col gap-2">
          <form
            id="signin-form"
            action={signInWithPasswordAction}
            className="flex flex-col gap-2"
          >
            <Input
              name="email"
              type="email"
              placeholder="이메일"
              className="py-6"
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              className="py-6"
            />
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full" type="submit" form="signin-form">
            로그인
          </Button>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/auth/signin/github">깃허브 로그인</Link>
          </Button>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/auth/signin/kakao">카카오 로그인</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/signup"
            className="text-muted-foreground text-sm hover:underline"
          >
            계정이 없으신가요?
          </Link>
          <Link
            className="text-muted-foreground text-sm hover:underline"
            href="/forgetpassword"
          >
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>
      </div>
    </>
  );
}
