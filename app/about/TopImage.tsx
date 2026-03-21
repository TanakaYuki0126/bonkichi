"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";

export default function TopImage() {
  const { smoothedProgress } = useScroll();
  const translateX = -smoothedProgress * 500;
  return (
    <div className="flex items-end absolute bottom-10 right-10 xl:right-20">
      <Image
        src="/about/top_image.jpg"
        height={3627}
        width={5455}
        alt="top_image"
        className="w-[40vw] lg:w-[50vw] rounded-full animate-circleIn transition-transform duration-100"
        style={{
          transform: `translate3d(${translateX}px,0,0)`,
        }}
      />
    </div>
  );
}
