"use client";

import { useScroll } from "@/contexts/ScrollContext";

export default function ProgressBar() {
  const { smoothedProgress } = useScroll();
  return (
    <div className="fixed bottom-10 left-10 w-[100px] h-[4px] bg-black/10 dark:bg-white/20 z-50 rounded-full">
      <div
        className="h-full bg-black/60 dark:bg-white/60 rounded-full"
        style={{ width: `${smoothedProgress * 100}%` }}
      />
    </div>
  );
}
