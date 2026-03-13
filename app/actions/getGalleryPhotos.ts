import { db } from "@/lib/db";
import { photos } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { asc, desc } from "drizzle-orm";

export async function getGalleryPhotos() {
  const galleryPhotos = await db
    .select()
    .from(photos)
    .orderBy(asc(photos.displayOrder));
  const supabase = createClient();
  const galleryPhotosWithUrl = await Promise.all(
    galleryPhotos.map(async (photo) => {
      let url: string;
      const { data } = await supabase.storage
        .from("gallery-images")
        .getPublicUrl(photo.fileName);
      return { ...photo, url: data.publicUrl };
    })
  );
  return galleryPhotosWithUrl;
}
