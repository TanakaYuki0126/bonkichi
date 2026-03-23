"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Image from "next/image";
import { useRef } from "react";

export default function TopImageMobile() {
  const ref = useRef<HTMLImageElement>(null);
  useIntersectionObserver(ref, () =>
    ref.current?.classList.add("animate-fadeIn")
  );
  return (
    <Image
      ref={ref}
      src="/about/top_image.jpg"
      height={3627}
      width={5455}
      alt="top_image"
      className="animate-fadeIn"
      style={{ animationDelay: "1s" }}
    />
  );
}
