"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";

export default function ParallaxFrontImage() {
  const { smoothedProgress } = useScroll();
  const translateX = -smoothedProgress * 500;
  return (
    <div className="absolute bottom-10 right-6">
      <Image
        src="/about/photo_main.jpg"
        height={3627}
        width={5455}
        alt="photo_main"
        className="w-[700px] rounded-full animate-circleIn transition-transform duration-100"
        style={{
          transform: `translate3d(${translateX}px,0,0)`,
        }}
      />
    </div>
  );
}
