"use server";

import { createClient } from "@/lib/server";
import { PostEntity } from "@/lib/types";
import { cookies } from "next/headers";
import { uploadImageAction } from "./image";

export async function createPostAction(formData: FormData) {
  const content = formData.get("content") as string;
  if (!content.trim()) throw new Error("내용을 채워주세요");

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("post")
    .insert({ content })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createWithdImagesAction(
  formData: FormData,
): Promise<void> {
  const content = formData.get("content") as string;
  const images = formData.getAll("image") as File[];
  const {
    data: { user },
    error,
  } = await createClient(await cookies()).auth.getUser();

  const userId = user!.id; //이미 로그인한 상태가 명확

  if (!content.trim()) return;
  //1. 포스트생성
  const post = await createPostAction(formData);
  try {
    //2. 이미지 업로드
    if (images.length === 0) {
      await createPostAction(formData);
      return;
    }
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;
        const imageUrl = await uploadImageAction({
          file: image,
          filePath: filePath,
        });
        return imageUrl;
      }),
    );
    //3. 포스트 업데이트
    const updatedPost = await updatePostAction({
      id: post.id,
      image_urls: imageUrls,
    });
  } catch (error) {
    await deletePostAction(post.id);
    throw error;
  }
}

export async function updatePostAction(
  post: Partial<PostEntity> & { id: number },
) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deletePostAction(id: number) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
