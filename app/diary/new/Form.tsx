"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function NewPostForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (res.ok) {
      alert("投稿成功☝️");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} />
      <input name="slug" value={form.slug} onChange={handleChange} />
      <textarea name="content" value={form.content} onChange={handleChange} />
      <button type="submit">{loading ? "送信中..." : "投稿"}</button>
    </form>
  );
}
