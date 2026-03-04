"use server";

import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id: string) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/diary");
  redirect("/diary");
}
