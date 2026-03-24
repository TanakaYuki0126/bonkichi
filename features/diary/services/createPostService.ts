import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
export async function createPostSercie({
  title,
  content,
  slug,
  eyecatch,
}: {
  title: string;
  content: string;
  slug: string;
  eyecatch?: File;
}) {
  let eyecatchFileName: string | null = null;
  if (eyecatch && eyecatch.size > MAX_FILE_SIZE) {
    throw new Error("File size must be under 5MB");
  }
  if (eyecatch) {
    const supabase = createClient();
    const fileName = `${Date.now()}-${eyecatch.name}`;
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, eyecatch);
    if (error) throw error;
    eyecatchFileName = fileName;
  }

  const inserted = await db
    .insert(posts)
    .values({ title, content, slug, eyecatchFileName })
    .returning();
  return inserted[0];
}
