import JustifiedGallery from "@/components/JustifiedGallery";
import { getGalleryPhotos } from "../actions/getGalleryPhotos";

export default async function AboutPage() {
  const photos = await getGalleryPhotos();
  console.log(photos);
  return (
    <div className="relative max-w-2xl mx-auto px-6 py-10">
      <div className="mt-16">
        <h1 className="text-2xl mb-6 text-gray-700 text-center">
          gallery / ギャラリー
        </h1>
        <JustifiedGallery photos={photos} />
      </div>
    </div>
  );
}
