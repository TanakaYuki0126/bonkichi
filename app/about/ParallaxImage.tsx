"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";

export default function ParallaxImage() {
  const { smoothedProgress } = useScroll();
  const translateX = smoothedProgress * 500 - 100;
  return (
    <section className="shrink-0 h-screen w-[30vw] relative">
      <Image
        src="/about/photo_1.jpg"
        alt="photo_1"
        sizes="100vw"
        fill
        className="object-cover -z-10"
        style={{ transform: `translate3d(${translateX}px,0,0)`, scale: 1.5 }}
      />
    </section>
  );
}
