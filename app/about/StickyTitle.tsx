"use client";

export const titles = [
  { title: "story / ストーリー" },
  { title: "exterior / 外装" },
  { title: "interior / 内装" },
  { title: "function / 機能" },
  { title: "base / ベース車両" },
];

export default function StickyTitle({ activeIndex }: { activeIndex: number }) {
  const text = titles[activeIndex]?.title ?? "";
  const chars = Array.from(text);
  return (
    <div className="fixed top-20 left-10 z-50">
      <h1 key={activeIndex} className="text-3xl font-bold text-gray-700">
        {chars.map((ch, i) => (
          <span
            key={`${activeIndex}-${i}-${ch}`}
            className="inline-block will-change-transform opacity-0 animate-titleCharIn"
            style={{ animationDelay: `${i * 35}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>
    </div>
  );
}
