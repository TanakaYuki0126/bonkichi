"use server";

import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;
  const eyecatch = formData.get("eyecatch") as File;

  let eyecatchFileName: string | null = null;
  if (eyecatch) {
    const supabase = createClient();
    const fileName = `${Date.now()}-${eyecatch.name}`;
    const { error } = await supabase.storage
      .from("diary-images")
      .upload(fileName, eyecatch);
    if (error) throw error;
    eyecatchFileName = fileName;
  }

  const inserted = await db
    .insert(posts)
    .values({ title, content, slug, eyecatchFileName })
    .returning();

  revalidatePath("/diary");
  revalidatePath(`/diary/${slug}`);
  redirect(`/diary/${slug}`);
}
