"use client";

export const titles = [
  { title: "story / ストーリー", start: 0 },
  { title: "exterior / 外装" },
  { title: "interior / 内装" },
  { title: "function / 機能" },
  { title: "base / ベース車両" },
];

export default function StickyTitle() {
  return (
    <div className="fixed top-20 left-10 z-50">
      <h1 className="text-3xl font-bold text-gray-700">story / ストーリー</h1>
    </div>
  );
}
