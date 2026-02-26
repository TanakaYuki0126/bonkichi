import { getPostSlugs, getPostsBySlug } from "@/lib/posts";
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
  try {
    const post = getPostsBySlug(slug);
    return (
      <div>
        <article className="prose mx-auto py-10">
          <MDXRemote source={post.content} />
        </article>
        <Link href="/diary">back</Link>
      </div>
    );
  } catch {
    notFound();
  }
}
