"use client";

import { useScroll } from "@/contexts/ScrollContext";
import { getSectionProgress } from "./getSectionProgress";

export default function AnimatedSection({
  range,
  children,
}: {
  range: [number, number];
  children: React.ReactNode;
}) {
  const { smoothedProgress } = useScroll();
  const t = getSectionProgress(smoothedProgress, range[0], range[1]);
  const appear = Math.min(1, t / 0.5);
  const lift = Math.max(0, (t - 0.5) / 0.5);
  const opacity = appear;
  const translateY = (1 - appear) * 40 - lift * 10;
  const scale = 0.95 + appear * 0.05;
  return (
    <section className="w-screen h-screen h-dvh shrink-0 flex items-center justify-center">
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
        className="max-w-xl text-center"
      >
        {children}
      </div>
    </section>
  );
}
