import Link from "next/link";
import { getPostsWithImageUrls } from "../actions/getPostsWithImageUrl";
import PageFadeIn from "@/components/PageFadeIn";
import FadeInImage from "./[slug]/FadeInImage";

export const revalidate = 60;

export default async function diaryPage() {
  const posts = await getPostsWithImageUrls();

  return (
    <>
      <PageFadeIn />
      <div className="relative max-w-2xl mx-auto py-10">
        <div className="mt-16">
          <h1 className="text-2xl mb-6 text-gray-700 text-center">
            diary / 日誌
          </h1>
          <ul className="flex flex-col gap-6">
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <Link href={`/diary/${post.slug}`} className="text-gray-600">
                    {post.createdAt && (
                      <p className=" text-gray-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                      </p>
                    )}
                    <p className="text-md font-bold">{post.title}</p>
                    {post.eyecatchUrl && (
                      <FadeInImage src={post.eyecatchUrl} alt={post.title} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
