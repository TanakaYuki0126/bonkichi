"use server";

import { db } from "@/lib/db";
import { photos } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function updateDisplayOrders(
  updates: { id: string; displayOrder: number }[]
) {
  await db.transaction(async (tx) => {
    for (const item of updates) {
      await tx
        .update(photos)
        .set({ displayOrder: item.displayOrder })
        .where(eq(photos.id, item.id));
    }
  });
}
