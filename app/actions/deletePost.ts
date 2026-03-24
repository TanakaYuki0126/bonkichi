"use server";

import { deletePostService } from "@/features/diary/services/deletePostService";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return null;
  await deletePostService(id);
  revalidatePath("/diary");
  redirect("/diary");
}
