"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ParallaxImageMobile({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const translateY = (progress - 0.5) * 60;
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
      setProgress(clamped);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={ref}
      className="shrink-0 w-screen h-[50vh] relative overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        className="object-cover"
        style={{
          transform: `translate3d(0,${translateY}px,0)`,
          scale: 1.5,
        }}
      />
    </div>
  );
}
