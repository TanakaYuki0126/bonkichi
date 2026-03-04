"use server";

import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;

  const inserted = await db
    .insert(posts)
    .values({ title, content, slug })
    .returning();

  revalidatePath("/diary");
  revalidatePath(`/diary/${slug}`);
  redirect(`/diary/${slug}`);
}
