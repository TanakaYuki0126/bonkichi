import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type CarResult = {
  car: THREE.Object3D;
  wheels: THREE.Object3D[];
};

export function loadCar(scene: THREE.Scene): CarResult {
  const loader = new GLTFLoader();
  const wheels: THREE.Object3D[] = [];
  const carGroup = new THREE.Group();

  loader.load(
    "models/bongo.glb",
    (gltf) => {
      const model = gltf.scene;
      model.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
        if (obj.name.toLowerCase().includes("wheel")) {
          wheels.push(obj);
        }
      });
      carGroup.add(model);
      scene.add(carGroup);
    },
    undefined,
    (error) => console.error("Failed to load car model", error)
  );
  console.log(wheels);
  return { car: carGroup, wheels };
}
