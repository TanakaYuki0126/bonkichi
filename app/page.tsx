"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Truck() {
  const { scene } = useGLTF("/models/bongo.glb");
  useFrame(() => {
    // scene.position.z += 0.02;
    const wheels = [
      scene.getObjectByName("wheel_fl_parent"),
      scene.getObjectByName("wheel_fr_parent"),
      scene.getObjectByName("wheel_rl_parent"),
      scene.getObjectByName("wheel_rr_parent"),
    ];
    // タイヤ回す
    wheels.forEach((wheel) => {
      wheel?.rotateX(0.05);
    });
  });
  return <primitive object={scene} />;
}

export default function Page() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Truck />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
