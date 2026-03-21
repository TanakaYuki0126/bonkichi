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
  const { subscribe } = useScroll();
  const widthRef = useRef<number>(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const updateSize = () => {
      widthRef.current = el.offsetWidth;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return subscribe(({ smoothedScrollY }) => {
      const rect = el.getBoundingClientRect();
      const width = widthRef.current;
      const center = rect?.left + width / 2;
      const p =
        (window.innerWidth + width / 2 - center) / (window.innerWidth + width);

      const progress = Math.min(Math.max(p, 0), 1);
      const translateX = (progress - 0.5) * 100;
      const imageEl = imageRef.current;
      if (!imageEl) return;
      imageEl.style.transform = `translate3d(${translateX}px,0,0)`;
    });
  }, [subscribe]);

  return (
    <div ref={ref} className="shrink-0 h-dvh w-[60vw] relative overflow-hidden">
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        className={`object-cover -z-10 parallax-img transform`}
        style={{
          scale: 1.3,
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}
