"use client";

import { useEffect, useRef } from "react";
import { initScene } from "./scene";
import { animate } from "./animate";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const { scene, camera, renderer, road, wheels, lines, controls } =
      initScene(containerRef.current);

    animate({ scene, camera, renderer, road, wheels, lines, controls });

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
