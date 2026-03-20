import Loader from "@/components/loader";
import CreateButton from "@/components/post/create-button";
import PostFeedServer from "@/components/post/post-feed-server";
import PostErrorToast from "@/components/toast/post-error-toast";
import PostSuccessToast from "@/components/toast/post-success-toast";
import { Suspense } from "react";
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
        <CreateButton />
        <Suspense fallback={<Loader />}>
          <PostFeedServer />
        </Suspense>
      </div>
    </>
  );
}
