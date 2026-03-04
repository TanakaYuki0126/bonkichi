"use client";

import { useSession } from "next-auth/react";
import DeleteButton from "./DeleteButton";

export default function AdminControls({ postId }: { postId: string }) {
  const { data: session } = useSession();
  if (session?.user?.role !== "admin") return null;
  return <DeleteButton postId={postId} />;
}
