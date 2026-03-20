"use client";

import Image from "next/image";

export default function FloatingImage() {
  return (
    <div className="overflow-hidden rounded-sm">
      <Image
        src={"/about/insulation.jpg"}
        width={1080}
        height={718}
        alt="insulation"
      />
    </div>
  );
}
