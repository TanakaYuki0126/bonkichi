"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

export default function SectionDivider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIntersectionObserver(ref, () => ref.current?.classList.add("is-visible"), {
    threshold: 0.3,
  });
  return (
    <div
      ref={ref}
      className={`writing-vertical text-9xl text-center text-gray-700 dark:text-gray-500 section-divider opacity-0`}
    >
      {children}
    </div>
  );
}
