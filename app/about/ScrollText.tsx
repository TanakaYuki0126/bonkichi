"use client";

import { useMemo } from "react";

export default function ScrollText({
  progress,
  fadeInStart,
  fadeInEnd,
  fadeOutStart,
  fadeOutEnd,
  children,
}: {
  progress: number;
  fadeInStart: number;
  fadeInEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  children: React.ReactNode;
}) {
  const style = useMemo(() => {
    let opacity = 0;
    let y = 40;
    //fade in
    if (progress >= fadeInStart && progress <= fadeInEnd) {
      const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
      opacity = t;
      y = (1 - t) * 40;
    }
    //fully visible
    if (progress > fadeInEnd && progress < fadeOutStart) {
      opacity = 1;
      y = 0;
    }
    //fade out
    if (progress >= fadeOutStart && progress <= fadeOutEnd) {
      const t = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      opacity = 1 - t;
      y = t * 40;
    }
    return { opacity, transform: `translateY(${y}px)` };
  }, [progress, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]);

  return (
    // <div style={style} className="transition-[opacity, transform] duration-200">
    <div style={style} className="">
      {children}
    </div>
  );
}
