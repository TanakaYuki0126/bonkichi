import LandingMenu from "@/components/three/LandingMenu";
import { db } from "@/lib/db";
import { getPostSlugs } from "@/lib/posts";
import { posts } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export default async function diaryPage() {
  const slugs = getPostSlugs();
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "draft"))
    .orderBy(desc(posts.createdAt));

  return (
    <main className="relative bg-lime-900 h-screen">
      <LandingMenu />
      <div className="relative max-w-2xl mx-auto py-10 ">
        <h1 className="text-3xl mb-6">diary</h1>
        <ul>
          {allPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/diary/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
