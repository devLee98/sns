import { createClient } from "@/lib/server";
import { cookies } from "next/headers";

export async function uploadImageAction({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(filePath, file);
  if (error) {
    throw new Error(error.message);
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("uploads").getPublicUrl(filePath);

  return publicUrl;
}
