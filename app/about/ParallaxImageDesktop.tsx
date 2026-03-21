"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ParallaxImageDesktop({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { subscribe, smoothedScrollYRef } = useScroll();
  const widthRef = useRef<number>(0);
  const leftRef = useRef<number>(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const updateSize = () => {
      widthRef.current = el.offsetWidth;
      const rect = el.getBoundingClientRect();
      leftRef.current = rect.left + smoothedScrollYRef.current;
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => {
      subscribe(({ smoothedScrollY }) => {
        const left = leftRef.current;
        const width = widthRef.current;
        const center = left - smoothedScrollY + width / 2;
        const p =
          (window.innerWidth + width / 2 - center) /
          (window.innerWidth + width);
        const progress = Math.min(Math.max(p, 0), 1);
        const imageEl = imageRef.current;
        if (!imageEl) return;
        imageEl.style.setProperty("--p", progress.toString());
      });
      ro.disconnect();
    };
  }, [subscribe]);

  return (
    <div ref={ref} className="shrink-0 h-dvh w-[60vw] relative overflow-hidden">
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        className={`object-cover -z-10 parallax-img transform will-change-transform`}
      />
    </div>
  );
}
