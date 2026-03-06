"use client";

import { useEffect, useRef } from "react";
import { initScene } from "./scene";
import { animate, startExit, resetExit } from "./animate";
import GUI from "lil-gui";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    resetExit();
    const { scene, camera, renderer, road, wheels, lines, controls, car } =
      initScene(containerRef.current);

    const stopAnimation = animate({
      scene,
      camera,
      renderer,
      road,
      wheels,
      lines,
      controls,
      car,
    });

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
    return () => {
      stopAnimation();
      renderer.dispose();
      controls.dispose();
      containerRef.current?.removeChild(renderer.domElement);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
