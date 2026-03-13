import { signUpAction } from "@/actions/auth";
import { SignUpSubmitButton } from "@/components/signup/signup-submit-button";
import AuthErrorToast from "@/components/toast/auth-error-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function SignUpPage({
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
        <div className="text-xl font-bold">회원가입</div>
        <form
          id="signup-form"
          action={signUpAction}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                name="email"
                placeholder="이메일"
                className="py-6"
              />
              <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                className="py-6"
              />
            </div>
            <div>
              <SignUpSubmitButton />
            </div>
          </div>
        </form>
        <div>
          <Link
            href="/signin"
            className="text-muted-foreground text-sm hover:underline"
          >
            이미 계정이 있으신가요?
          </Link>
        </div>
      </div>
    </>
  );
}
