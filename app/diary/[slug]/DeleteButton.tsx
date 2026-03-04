"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("本当に削除しますか？");
    if (!confirmed) return;

    await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    router.push("/diary");
  };
  return (
    <button
      onClick={handleDelete}
      className="text-sm bg-red-600  text-white  font-bold rounded-md px-3 py-2"
    >
      投稿を削除
    </button>
  );
}
