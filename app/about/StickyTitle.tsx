"use client";

import { contents } from "./contents";

export default function StickyTitle({ activeIndex }: { activeIndex: number }) {
  const titles = contents.map(({ title }) => title);
  const text = titles[activeIndex] ?? "";
  const chars = Array.from(text);
  return (
    <div className="fixed top-20 left-10 z-50">
      <h1 key={activeIndex} className="text-3xl font-bold">
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
