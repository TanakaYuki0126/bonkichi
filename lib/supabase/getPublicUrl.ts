import { createClient } from "@/lib/supabase/server";

export function getPublicUrl(fileName: string, bucketName: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return data?.publicUrl;
}
