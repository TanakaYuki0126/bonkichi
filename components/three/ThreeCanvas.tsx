"use client";

import { useEffect, useRef } from "react";
import { initScene } from "./scene";
import { animate } from "./animate";
import GUI from "lil-gui";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const guiRef = useRef<GUI | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const { scene, camera, renderer, road, wheels, lines, controls } =
      initScene(containerRef.current);

    animate({ scene, camera, renderer, road, wheels, lines, controls });

    // if (guiRef.current) return;
    // const gui = new GUI();
    // guiRef.current = gui;
    return () => {
      renderer.dispose();
      controls.dispose();
      // gui.destroy();
      // guiRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
