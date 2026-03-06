"use client";

import Image from "next/image";

export default function FadeInImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ maxWidth: "100%" }}
        className="opacity-0 transition-opacity duration-500 hover:opacity-70"
        onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
      />
    </div>
  );
}
