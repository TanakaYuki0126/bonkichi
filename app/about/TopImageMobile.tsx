"use client";

import Image from "next/image";

export default function TopImageMobile() {
  return (
    <Image
      src="/about/top_image.jpg"
      height={3627}
      width={5455}
      alt="top_image"
      className="animate-fadeIn"
      style={{ animationDelay: "3s" }}
    />
  );
}
