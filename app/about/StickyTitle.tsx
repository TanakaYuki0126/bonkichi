"use client";

export const titles = [
  { title: "Story / ストーリー" },
  { title: "Living / 暮らし" },
  { title: "Off-grid / エネルギー自立性" },
  { title: "Confort / 快適性" },
  { title: "Design / デザイン・外観" },
  { title: "Base & Mobility / ベース車両・走行性能" },
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
