"use client";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useRef } from "react";
import { useScroll } from "@/contexts/ScrollContext";

function Model() {
  const { progressRef } = useScroll();
  const progress = progressRef.current;
  const { scene } = useGLTF("/models/bongo.glb");
  const ref = useRef<THREE.Object3D | null>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = progress * 20;
    const targetX = progress * 4 - 2;
    if (progress < 0.5) {
      camera.position.x = 2;
    } else {
      camera.position.x = -2;
    }
  });
  return (
    <Center>
      <primitive object={scene} scale={0.8} ref={ref} />
    </Center>
  );
}

export default function BonkichiModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 30 }}
      className="w-full h-full"
    >
      <axesHelper args={[5]} />
      <ambientLight intensity={4.8} />
      <directionalLight position={[5, 5, 5]} />
      <Model />
    </Canvas>
  );
}
