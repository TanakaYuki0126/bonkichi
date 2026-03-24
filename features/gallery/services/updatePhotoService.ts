import { photoCategoryEnum, photos } from "@/lib/schema";
import imageSize from "image-size";
import exifr from "exifr";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export type PhotoCategory = (typeof photoCategoryEnum.enumValues)[number];
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
export async function updatePhotoService({
  title,
  description,
  category,
  order,
  location,
  file,
}: {
  title?: string;
  description?: string;
  category: PhotoCategory;
  order?: string;
  location?: string;
  file: File;
}) {
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
    focalLength: exif.FocalLength,
  };

  await db.insert(photos).values(photo);
}
