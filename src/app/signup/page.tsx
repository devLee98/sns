import { signUpAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <form
          id="signup-form"
          action={signUpAction}
          className="flex flex-col gap-2"
        >
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
        </form>
      </div>
      <div>
        <Button className="w-full" type="submit" form="signup-form">
          회원가입
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
