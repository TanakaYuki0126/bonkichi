"use client";

import { deletePost } from "@/app/actions/deletePost";
import { useTransition } from "react";

export default function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    const confirmed = confirm("本当に削除しますか？");
    if (!confirmed) return;
    startTransition(() => {
      deletePost(postId);
    });
  };
  return (
    <button
      onClick={handleDelete}
      className="text-sm bg-red-600  text-white  font-bold rounded-md px-3 py-2"
    >
      {isPending ? "削除中..." : "投稿を削除"}
    </button>
  );
}
