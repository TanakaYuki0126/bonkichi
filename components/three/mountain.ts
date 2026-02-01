import * as THREE from "three";

export function createMountain(x: number, z: number, scale = 1): THREE.Mesh {
  const height = Math.random() * 20;
  const geo = new THREE.ConeGeometry(50, height, 6);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x556b2f,
    flatShading: true,
  });
  const mountain = new THREE.Mesh(geo, mat);
  mountain.position.set(x, 0, z);
  mountain.scale.set(scale, scale, scale);
  mountain.receiveShadow = true;
  return mountain;
}
