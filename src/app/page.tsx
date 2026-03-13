import PostButton from "@/components/post/postbutton";
import PostErrorToast from "@/components/toast/post-error-toast";
import PostSuccessToast from "@/components/toast/post-success-toast";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  return (
    <>
      <PostErrorToast error={error ?? null} />
      <PostSuccessToast success={success ?? null} />
      <div className="flex flex-col gap-10">
        <PostButton />
      </div>
    </>
  );
}
