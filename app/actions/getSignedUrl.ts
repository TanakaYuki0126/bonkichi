"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSignedUrl(fileName: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("diary-images")
    .createSignedUrl(fileName, 60 * 60);

  if (error || !data?.signedUrl) {
    console.error(error);
    return null;
  }
  return data.signedUrl;
}
