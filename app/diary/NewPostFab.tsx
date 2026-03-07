"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewPostFab() {
  const { data: session } = useSession();
  const pathname = usePathname();
  if (!session?.user) return;
  if (pathname === "/diary/new") return;
  return (
    <Link
      href="/diary/new"
      className="fixed bottom-10 right-10 bg-lime-600 text-white p-5 rounded-full shadow-md tracking-[1px] hover:bg-lime-700 transition"
    >
      + 新規投稿
    </Link>
  );
}
