"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";

export default function ParallaxImage() {
  const { smoothedProgress } = useScroll();
  const maxShift = 120;
  const translateX = (smoothedProgress - 0.5) * 2 * maxShift;
  return (
    <div className="shrink-0 h-screen w-[35vw] relative overflow-hidden shadow-inner">
      <Image
        src="/about/photo_1.jpg"
        alt="photo_1"
        sizes="100vw"
        fill
        className="object-cover -z-10"
        style={{ transform: `translate3d(${translateX}px,0,0)`, scale: 1.7 }}
      />
    </div>
  );
}
