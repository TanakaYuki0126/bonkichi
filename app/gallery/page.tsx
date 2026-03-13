import JustifiedGallery from "@/components/JustifiedGallery";
import { getGalleryPhotos } from "../actions/getGalleryPhotos";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AboutPage() {
  const photos = await getGalleryPhotos();
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-2xl mb-6 text-gray-700 text-center w-full ">
        gallery / ギャラリー
      </h1>
      {session?.user?.role === "admin" && (
        <Link href="/gallery/edit">編集</Link>
      )}
      <Suspense>
        <JustifiedGallery photos={photos} />
      </Suspense>
    </>
  );
}
