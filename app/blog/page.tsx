import { getPostSlugs } from "@/lib/posts";
import Link from "next/link";

export default function BlogPage() {
  const slugs = getPostSlugs();
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl mb-6">Blog</h1>
      <ul>
        {slugs.map((slug) => {
          const cleanSlug = slug.replace(/\.mdx$/, "");
          return (
            <li key={cleanSlug}>
              <Link href={`/blog/${cleanSlug}`}>{cleanSlug}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
