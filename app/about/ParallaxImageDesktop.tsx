"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";

export default function ParallaxImageDesktop({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const { smoothedProgress } = useScroll();
  const maxShift = 120;
  const translateX = (smoothedProgress - 0.5) * 5 * maxShift;
  return (
    <div className="shrink-0 h-screen h-dvh w-[90vw] relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        className="object-cover -z-10"
        style={{
          transform: `translate3d(${translateX}px,0,0)`,
          scale: 1.5,
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}
