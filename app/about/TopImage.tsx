"use client";

import { useScroll } from "@/contexts/ScrollContext";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function TopImage() {
  const ref = useRef<HTMLImageElement>(null);
  const { subscribe } = useScroll();
  useEffect(() => {
    return subscribe(({ smoothedScrollY }) => {
      ref.current?.style.setProperty("--p", smoothedScrollY.toString());
    });
  }, [subscribe]);
  return (
    <div
      ref={ref}
      className="flex items-end absolute bottom-10 right-10 xl:right-20 top-image-parallax"
    >
      <Image
        src="/about/top_image.jpg"
        height={3627}
        width={5455}
        alt="top_image"
        className="w-[40vw] lg:w-[50vw] rounded-full duration-100 animate-circleIn"
      />
    </div>
  );
}
