import { db } from "@/lib/db";
import { contacts } from "@/lib/schema";

export async function saveContactService({
  name,
  email,
  message,
  ip,
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
}) {
  await db.insert(contacts).values({
    name,
    email,
    message,
    ip,
  });
}
