"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ParallaxImageMobile({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      //画像が画面に表示されているときのcenterYの範囲: -rect.height / 2 から window.innerHeight + rect.height / 2
      //centerYの進捗
      const p =
        (window.innerHeight + rect.height / 2 - centerY) /
        (window.innerHeight + rect.height);
      const clamped = Math.max(Math.min(p, 1), 0);
      const imageEl = imageRef.current;
      if (!imageEl) return;
      imageEl.style.setProperty("--p", clamped.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={ref}
      className="shrink-0 w-screen h-[500px] relative overflow-hidden"
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        className="object-cover parallax-img-mobile"
      />
    </div>
  );
}
