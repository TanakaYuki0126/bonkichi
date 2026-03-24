"use server";

import { createPostSercie } from "@/features/diary/services/createPostService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;
  const eyecatch = formData.get("eyecatch") as File;
  const post = await createPostSercie({ title, content, slug, eyecatch });
  revalidatePath("/diary");
  revalidatePath(`/diary/${post.slug}`);
  redirect(`/diary/${post.slug}`);
}
