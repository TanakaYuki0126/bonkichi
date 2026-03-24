import { db } from "@/lib/db";
import { photos } from "@/lib/schema";
import { getPublicUrl } from "@/lib/supabase/getPublicUrl";
import { asc } from "drizzle-orm";

export async function getGalleryPhotosService() {
  const galleryPhotos = await db
    .select()
    .from(photos)
    .orderBy(asc(photos.displayOrder));
  const galleryPhotosWithUrl = await Promise.all(
    galleryPhotos.map(async (photo) => {
      const url = await getPublicUrl(photo.fileName, "gallery-images");
      return { ...photo, url };
    })
  );
  return galleryPhotosWithUrl;
}
