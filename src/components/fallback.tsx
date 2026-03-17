import { TriangleAlert } from "lucide-react";

export default function Fallback() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
      <TriangleAlert className="size-6" />
      <div>오루가 발생했습니다. 잠시후 다시 시도해주세요.</div>
    </div>
  );
}
