"use server";

import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";

export async function getPostsWithImageUrls() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "draft"))
    .orderBy(desc(posts.createdAt));
  const supabase = createClient();

  const postsWithImageUrls = await Promise.all(
    allPosts.map(async (post) => {
      let eyecatchUrl: string | null = null;
      if (post.eyecatchFileName) {
        const { data, error } = await supabase.storage
          .from("diary-images")
          .createSignedUrl(post.eyecatchFileName, 60 * 60);
        if (!error && data?.signedUrl) {
          eyecatchUrl = data.signedUrl;
        }
      }
      return { ...post, eyecatchUrl };
    })
  );
  return postsWithImageUrls;
}
