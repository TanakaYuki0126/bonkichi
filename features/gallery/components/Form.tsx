"use client";
import { uploadGalleryPhoto } from "@/app/actions/uploadGalleryPhoto";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { categories } from "@/features/gallery/data/categories";

export default function NewGalleryForm() {
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
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">画像を追加</h1>
        <form action={uploadGalleryPhoto} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              画像
            </label>
            <input
              required
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
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              カテゴリ
            </label>
            <select
              name="category"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              タイトル
            </label>
            <input
              type-="text"
              name="title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              概要
            </label>
            <input
              type-="text"
              name="description"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              撮影場所
            </label>
            <input
              type-="text"
              name="location"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              表示順
            </label>
            <input
              type-="number"
              name="order"
              defaultValue={0}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
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
