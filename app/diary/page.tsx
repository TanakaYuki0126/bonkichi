import Link from "next/link";
import PageFadeIn from "@/components/Fade/PageFadeIn";
import FadeInImage from "../../features/diary/components/FadeInImage";
import { getPostsSerivce } from "@/features/diary/services/getPostsService";

export const revalidate = 60;

export default async function diaryPage() {
  const posts = await getPostsSerivce();

  return (
    <>
      <PageFadeIn />
      <div className="relative max-w-2xl mx-auto px-6 py-10">
        <div className="mt-16">
          <h1 className="text-2xl mb-6 text-center">diary / 日記</h1>
          <ul className="flex flex-col gap-6">
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <Link
                    href={`/diary/${post.slug}`}
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    {post.createdAt && (
                      <p className=" text-gray-500 text-sm">
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
