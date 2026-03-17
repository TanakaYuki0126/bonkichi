"use client";

import { useScroll } from "@/contexts/ScrollContext";

export default function ProgressBar() {
  const { progress, smoothedProgress } = useScroll();
  return (
    <div className="fixed bottom-10 left-10 w-[100px] h-[3px] bg-black/10 z-50">
      <div
        className="h-full bg-black/60"
        style={{ width: `${smoothedProgress * 100}%` }}
      />
      <p>{Math.round(progress * 100)}</p>
    </div>
  );
}
