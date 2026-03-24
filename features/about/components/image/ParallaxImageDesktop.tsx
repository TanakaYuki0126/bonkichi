"use client";

import { useScroll } from "@/contexts/ScrollContext";
import { useParallax } from "@/features/about/hooks/useParallax";
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
  useParallax({ targetRef: imageRef, containerRef: ref });

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
