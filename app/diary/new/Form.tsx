"use client";
import { createPost } from "@/app/actions/createPost";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export default function NewPostForm() {
  const { pending } = useFormStatus();

  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("5MB以下の画像を選択してください");
      e.target.value = "";
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const removeImage = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">新規投稿</h1>
        <form action={createPost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              タイトル
            </label>
            <input type-="text" name="title" required className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              スラッジ
            </label>
            <input name="slug" required className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              本文
            </label>
            <textarea
              name="content"
              required
              className="input-base h-80  resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              アイキャッチ画像
            </label>
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              name="eyecatch"
              accept="image/*"
              onChange={handleChange}
            />
            {preview ? (
              <div className="relative">
                <Image src={preview} alt={preview} width={200} height={200} />
                <button
                  type="button"
                  className="absolute -top-2 -left-2 h-7 w-7 rounded-full bg-black text-white text-sm flex items-center justify-center hover:bg-gray-800"
                  onClick={removeImage}
                >
                  ✗
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="flex h-40 w-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition"
                onClick={() => inputRef.current?.click()}
              >
                <span className="text-sm text-gray-500">
                  画像を選択(5MB以下)
                </span>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "送信中..." : "投稿"}
          </button>
        </form>
      </div>
    </div>
  );
}
