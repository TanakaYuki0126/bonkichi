import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function deletePostService(id: string) {
  await db.delete(posts).where(eq(posts.id, id));
}
