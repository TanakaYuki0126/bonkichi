import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export default async function diaryPage() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "draft"))
    .orderBy(desc(posts.createdAt));

  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="mt-16">
        <h1 className="text-2xl mb-6 text-white text-center">diary / 日誌</h1>
        <ul className="flex flex-col gap-4">
          {allPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/diary/${post.slug}`} className="text-white">
                {post.createdAt && (
                  <p className=" text-gray-300">
                    {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                  </p>
                )}
                <p className="text-md font-bold">{post.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
