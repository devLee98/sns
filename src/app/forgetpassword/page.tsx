import { requestResetPasswordAction } from "@/actions/auth";
import AuthErrorToast from "@/components/toast/auth-error-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function ForgetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string | null }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <AuthErrorToast error={error} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold">비밀번호를 잊으셨나요?</div>
          <div className="text-muted-foreground text-sm">
            이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
          </div>
        </div>
        <form
          id="forgetpassword-form"
          action={requestResetPasswordAction}
          className="flex flex-col gap-2"
        >
          <Input type="email" name="email" placeholder="abc@example.com" />
        </form>
        <Button className="w-full" type="submit" form="forgetpassword-form">
          인증 링크 보내기
        </Button>
      </div>
    </>
  );
}
