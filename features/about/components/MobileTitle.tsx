"use client";

import { useRef } from "react";
import { contents } from "../data/contents";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function MobileTitle({ index }: { index: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const titles = contents.map(({ title }) => title);
  const text = titles[index] ?? "";
  const chars = Array.from(text);
  useIntersectionObserver(ref, () => ref.current?.classList.add("is-visible"), {
    threshold: 0.3,
  });
  return (
    <h1 ref={ref} className="absolute top-20 left-5 text-3xl font-bold">
      {chars.map((ch, i) => (
        <span
          className="inline-block will-change-transform opacity-0 title-char"
          key={`${index}-${i}-${ch}`}
          style={{ animationDelay: `${i * 35}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}
