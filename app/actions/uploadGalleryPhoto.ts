"use server";

import { db } from "@/lib/db";
import { photoCategoryEnum, photos, posts } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageSize } from "image-size";
import exifr from "exifr";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type PhotoCategory = (typeof photoCategoryEnum.enumValues)[number];
export async function getImageSizeFromFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const { width, height } = imageSize(buffer);
  return { width, height };
}

export async function getExifDataFromFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const exif = await exifr.parse(buffer);
  return exif;
}

export async function uploadGalleryPhoto(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as PhotoCategory;
  const order = formData.get("order") as string;
  const location = formData.get("location") as string;
  const file = formData.get("eyecatch") as File;

  if (!file) {
    return;
  }
  const size = await getImageSizeFromFile(file);
  const exif = await getExifDataFromFile(file);

  let photoFileName = "";
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must be under 5MB");
  }
  if (file) {
    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("gallery-images")
      .upload(fileName, file);
    if (error) throw error;
    photoFileName = fileName;
  }

  type InsertPhoto = typeof photos.$inferInsert;

  const photo: InsertPhoto = {
    fileName: photoFileName,
    category,
    title,
    description,
    width: size.width,
    height: size.height,
    displayOrder: Number(order),
    location,
    takenAt: exif.DateTimeOriginal,
    camera: exif.Model,
    lens: exif.LensModel,
    aperture: exif.FNumber,
    shutter: exif.ExposureTime,
    iso: exif.ISO,
  };

  await db.insert(photos).values(photo);

  revalidatePath("/gallery");
  redirect(`/gallery`);
}
