"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return null;
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/diary");
  redirect("/diary");
}
