"use client";

import { useEffect, useRef } from "react";
import { initScene } from "../three/scene";
import { animate, resetExit } from "../three/animate";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    resetExit();
    const {
      scene,
      camera,
      renderer,
      road,
      wheels,
      lines,
      controls,
      car,
      mountainGroup1,
      mountainGroup2,
    } = initScene(containerRef.current);

    const stopAnimation = animate({
      scene,
      camera,
      renderer,
      road,
      wheels,
      lines,
      controls,
      car,
      mountainGroup1,
      mountainGroup2,
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
