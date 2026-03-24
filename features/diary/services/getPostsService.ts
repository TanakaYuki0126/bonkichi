import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { getPublicUrl } from "@/lib/supabase/getPublicUrl";
import { desc, eq } from "drizzle-orm";

export async function getPostsSerivce() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "draft"))
    .orderBy(desc(posts.createdAt));
  const postsWithImageUrls = await Promise.all(
    allPosts.map(async (post) => {
      let eyecatchUrl: string | null = null;
      if (post.eyecatchFileName) {
        const url = getPublicUrl(post.eyecatchFileName, "blog-images");
        eyecatchUrl = url;
      }
      return { ...post, eyecatchUrl };
    })
  );
  return postsWithImageUrls;
}
