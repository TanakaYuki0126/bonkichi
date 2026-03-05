import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { getPostsWithImageUrls } from "../actions/getPostsWithImageUrl";
import Image from "next/image";

export const revalidate = 60;

export default async function diaryPage() {
  const posts = await getPostsWithImageUrls();

  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="mt-16">
        <h1 className="text-2xl mb-6 text-gray-700 text-center">
          diary / 日誌
        </h1>
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/diary/${post.slug}`} className="text-gray-600">
                {post.createdAt && (
                  <p className=" text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                  </p>
                )}
                <p className="text-md font-bold">{post.title}</p>
                {post.eyecatchUrl && (
                  <Image
                    src={post.eyecatchUrl}
                    width={600}
                    height={100}
                    alt={post.title}
                    className="hover:opacity-50 transition hover:transition my-3"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
