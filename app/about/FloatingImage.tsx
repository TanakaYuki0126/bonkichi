"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FloatingImage() {
  return (
    <div className="rounded-xl overflow-hidden">
      <Image
        src={"/about/insulation.jpg"}
        width={1080}
        height={718}
        alt="insulation"
        className="rounded-xl"
      />
    </div>
  );
}
