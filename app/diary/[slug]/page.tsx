import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";
import { getSignedUrl } from "@/app/actions/getSignedUrl";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, "draft")))
    .limit(1);

  const post = result[0];
  if (!post) {
    notFound();
  }
  let eyecatchUrl: string | null = null;
  if (post.eyecatchFileName) {
    eyecatchUrl = await getSignedUrl(post.eyecatchFileName);
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <article className="max-w-3xl mx-auto p-8 md:p-12 relative">
        <Link href={"/diary"} className="text-sm text-gray-500">
          一覧へ戻る
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mt-10 mb-6 leading-tight">
          {post.title}
        </h1>
        {post.createdAt && (
          <p className="text-sm text-gray-600 mb-8">
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </p>
        )}
        {eyecatchUrl && (
          <Image
            src={eyecatchUrl}
            alt={post.title}
            width={500}
            height={500}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}

        <div className="prose prose-gray max-w-none">
          <p className="whitespace-pre-line text-gray-700 leading-relaxed">
            {post.content}
          </p>
        </div>
        <div className="absolute top-5 right-5">
          <DeleteButton postId={post.id} />
        </div>
      </article>
    </div>
  );
}
