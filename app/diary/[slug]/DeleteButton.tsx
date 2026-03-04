"use client";

import { deletePost } from "@/app/actions/deletePost";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export default function DeleteButton({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    const confirmed = confirm("本当に削除しますか？");
    if (!confirmed) return;
    startTransition(() => {
      deletePost(postId);
    });
  };
  if (session?.user?.role !== "admin") return null;
  return (
    <button
      onClick={handleDelete}
      className="text-sm bg-red-600  text-white  font-bold rounded-md px-3 py-2"
    >
      {isPending ? "削除中..." : "投稿を削除"}
    </button>
  );
}
