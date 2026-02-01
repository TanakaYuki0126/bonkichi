"use client";

import { useEffect, useRef } from "react";
import { initScene } from "./scene";
import { animate } from "./animate";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const { scene, camera, renderer, road, wheels, lines } = initScene(
      containerRef.current
    );

    animate({ scene, camera, renderer, road, wheels, lines });

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
