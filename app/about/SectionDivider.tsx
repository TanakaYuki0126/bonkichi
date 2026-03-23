"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useParallax } from "@/hooks/useParallax";
import { useRef } from "react";

export default function SectionDivider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(ref, () => ref.current?.classList.add("is-visible"), {
    threshold: 0.3,
  });
  useParallax({ containerRef: parallaxRef });
  return (
    <div
      ref={parallaxRef}
      className="flex items-center h-full section-divider-parallax"
    >
      <div
        ref={ref}
        className={`writing-vertical text-9xl text-center text-gray-600 dark:text-gray-500 section-divider opacity-0`}
      >
        {children}
      </div>
    </div>
  );
}
