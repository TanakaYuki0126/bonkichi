"use client";

import { useEffect, useState } from "react";
import PageFade from "./PageFade";

export default function PageFadeIn() {
  const [fade, setFade] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFade(false);
    }, 50);
  }, []);
  return <PageFade active={fade} />;
}
