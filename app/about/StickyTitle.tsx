"use client";

export const titles = [
  { title: "story / ストーリー" },
  { title: "exterior / 外装" },
  { title: "interior / 内装" },
  { title: "function / 機能" },
  { title: "base / ベース車両" },
];

export default function StickyTitle({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed top-20 left-10 z-50">
      <h1 className="text-3xl font-bold text-gray-700">
        {titles[activeIndex]?.title}
      </h1>
    </div>
  );
}
