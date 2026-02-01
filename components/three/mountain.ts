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
  return mountain;
}
