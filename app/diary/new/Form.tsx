"use client";
import { createPost } from "@/app/actions/createPost";
import { useFormStatus } from "react-dom";

export default function NewPostForm() {
  const { pending } = useFormStatus();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">新規投稿</h1>
        <form action={createPost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              タイトル
            </label>
            <input
              type-="text"
              name="title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              スラッジ
            </label>
            <input
              name="slug"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              本文
            </label>
            <textarea
              name="content"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
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
