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

    //画面リサイズ対応
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    window.addEventListener("resize", handleResize);
    // if (guiRef.current) return;
    // const gui = new GUI();
    // guiRef.current = gui;
    return () => {
      renderer.dispose();
      controls.dispose();
      window.removeEventListener("resize", handleResize);
      // gui.destroy();
      // guiRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
