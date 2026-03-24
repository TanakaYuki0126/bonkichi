"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  PhotoCategory,
  updatePhotoService,
} from "@/features/gallery/services/updatePhotoService";

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
  await updatePhotoService({
    title,
    description,
    category,
    order,
    location,
    file,
  });

  revalidatePath("/gallery");
  redirect(`/gallery`);
}
