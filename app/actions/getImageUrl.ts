"use server";

import { createClient } from "@/lib/supabase/server";

export async function getImageUrl(fileName: string) {
  const supabase = createClient();
  const { data } = await supabase.storage
    .from("blog-images")
    .getPublicUrl(fileName);

  return data?.publicUrl;
}
