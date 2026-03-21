"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";

export default function TopImage() {
  const { smoothedProgress } = useScroll();
  const translateX = -smoothedProgress * 500;
  return (
    <div className="flex items-end absolute bottom-10 right-10 xl:right-20">
      <Image
        src="/about/photo_main.jpg"
        height={3627}
        width={5455}
        alt="photo_main"
        className="w-[40vw] lg:w-[50vw] rounded-full animate-circleIn transition-transform duration-100"
        style={{
          transform: `translate3d(${translateX}px,0,0)`,
        }}
      />
    </div>
  );
}
