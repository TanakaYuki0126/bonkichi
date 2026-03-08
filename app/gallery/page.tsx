import JustifiedGallery from "@/components/JustifiedGallery";
import { getGalleryPhotos } from "../actions/getGalleryPhotos";

export default async function AboutPage() {
  const photos = await getGalleryPhotos();
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10 min-h-screen w-full ">
      <div className="mt-16 w-full">
        <h1 className="text-2xl mb-6 text-gray-700 text-center w-full ">
          gallery / ギャラリー
        </h1>
        <JustifiedGallery photos={photos} />
      </div>
    </div>
  );
}
