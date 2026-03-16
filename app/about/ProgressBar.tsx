"use client";

import { useScroll } from "@/contexts/ScrollContext";

export default function ProgressBar() {
  const { progress } = useScroll();
  return (
    <div className="fixed bottom-10 left-10 w-[100px] h-[3px] bg-black/10 z-50">
      <div
        className="h-full bg-black/60 transition-[width] duration-200"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
