"use client";

import { titles } from "./StickyTitle";

export default function MobileTitle({ index }: { index: number }) {
  const text = titles[index]?.title ?? "";
  const chars = Array.from(text);
  return (
    <h1 className="absolute top-20 left-5 text-3xl font-bold text-gray-700">
      {chars.map((ch, i) => (
        <span key={`${index}-${i}-${ch}`}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </h1>
  );
}
