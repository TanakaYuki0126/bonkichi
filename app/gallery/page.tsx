import JustifiedGallery from "@/features/gallery/components/JustifiedGallery";
import { getGalleryPhotosService } from "../../features/gallery/services/getGalleryPhotos";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AboutPage() {
  const photos = await getGalleryPhotosService();
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-2xl mb-6 text-center w-full ">
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
