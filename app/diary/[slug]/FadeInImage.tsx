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
    <div className="relative w-full h-auto">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        style={{ maxWidth: "100%" }}
        className="opacity-0 transition-opacity duration-500"
        onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
      />
    </div>
  );
}
