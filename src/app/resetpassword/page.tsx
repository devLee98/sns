import { updatePasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정</div>
        <div className="text-muted-foreground text-sm">
          새로운 비밀번호를 입력해주세요.
        </div>
      </div>
      <form action={updatePasswordAction} className="flex flex-col gap-2">
        <Input type="password" name="password" placeholder="비밀번호" />
        <Button className="w-full" type="submit">
          비밀번호 변경하기
        </Button>
      </form>
    </div>
  );
}
