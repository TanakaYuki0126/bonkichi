import LandingMenu from "@/components/three/LandingMenu";
import { getPostSlugs } from "@/lib/posts";
import Link from "next/link";

export default function diaryPage() {
  const slugs = getPostSlugs();
  return (
    <main className="relative bg-lime-900 h-screen">
      <LandingMenu />
      <div className="relative max-w-2xl mx-auto py-10 ">
        <h1 className="text-3xl mb-6">diary</h1>
        <ul>
          {slugs.map((slug) => {
            const cleanSlug = slug.replace(/\.mdx$/, "");
            return (
              <li key={cleanSlug}>
                <Link href={`/diary/${cleanSlug}`}>{cleanSlug}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
