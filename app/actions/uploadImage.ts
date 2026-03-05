"use server";

import { authOptions } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getServerSession } from "next-auth";

export async function uploadImage(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const file = formData.get("file") as File;
  if (!file) return;

  const supabase = createClient();
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file);
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
  return data.publicUrl;
}
