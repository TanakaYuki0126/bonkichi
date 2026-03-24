import * as THREE from "three";

export function createMountain(x: number, z: number, scale = 1): THREE.Mesh {
  const height = (Math.random() + 1) * 30;
  const radius = (Math.random() + 1) * 50;
  const geo = new THREE.ConeGeometry(radius, height, 6);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x556b2f,
    flatShading: true,
  });
  mat.color.multiplyScalar(0.5);
  const mountain = new THREE.Mesh(geo, mat);
  mountain.position.set(x, 0, z);
  mountain.scale.set(scale, scale, scale);
  mountain.receiveShadow = true;
  mountain.castShadow = true;
  mountain.rotation.y = Math.random() * Math.PI;
  return mountain;
}

export function createMountainGroup() {
  const mountains = new THREE.Group();
  for (let i = 0; i < 20; i++) {
    const z = (10 - i) * 80;
    const scale = 1 + Math.random() * 2;
    const far = (Math.random() + 0.8) * 200;
    mountains.add(createMountain(far, z, scale));
    mountains.add(createMountain(-far, z, scale));
  }
  return mountains;
}
