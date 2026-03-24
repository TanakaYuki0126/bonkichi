"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function BackButton() {
  const router = useRouter();
  return (
    <Link
      href={"/diary"}
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
    >
      <MdArrowBack />
      <p>一覧へ戻る</p>
    </Link>
  );
}
