"use server";

import { headers } from "next/headers";

export async function getIp() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";
  return ip;
}
