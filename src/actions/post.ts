"use server";

import { createClient } from "@/lib/server";
import { PostEntity } from "@/lib/types";
import { cookies } from "next/headers";
import { uploadImageAction } from "./image";

export async function createPostAction(formData: FormData) {
  const content = formData.get("content") as string;
  if (!content.trim()) throw new Error("Please enter content.");

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
    error: authError,
  } = await createClient(await cookies()).auth.getUser();

  if (authError || !user) {
    throw new Error(authError?.message ?? "Unauthorized");
  }

  if (!content.trim()) return;

  const post = await createPostAction(formData);
  if (images.length === 0) return;

  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${user.id}/${post.id}/${fileName}`;

        const imageUrl = await uploadImageAction({
          file: image,
          filePath,
        });

        return imageUrl;
      }),
    );

    await updatePostAction({
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
