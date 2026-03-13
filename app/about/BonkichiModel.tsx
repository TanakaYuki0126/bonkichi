"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/bongo.glb");
  return (
    <Center>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

export default function BonkichiModel() {
  return (
    <Canvas camera={{ position: [3, 2, 4], fov: 50 }}>
      <ambientLight intensity={4.8} />
      <directionalLight position={[5, 5, 5]} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}
