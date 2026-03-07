"use client";

import { useState } from "react";
import PageFade from "./PageFade";

export default function PageFadeOut() {
  const [fade, setFade] = useState(false);
  return <PageFade active={fade} />;
}
