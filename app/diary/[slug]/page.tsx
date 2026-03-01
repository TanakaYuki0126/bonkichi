import { db } from "@/lib/db";
import { getPostSlugs, getPostsBySlug } from "@/lib/posts";
import { posts } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

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
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href={"/diary"}>戻る</Link>
    </main>
  );
}
