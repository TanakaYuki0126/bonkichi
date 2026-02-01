import * as THREE from "three";

export function createRoad(scene: THREE.Scene) {
  const roadLength = 1000;
  const geometry = new THREE.PlaneGeometry(10, roadLength);
  const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const road1 = new THREE.Mesh(geometry, material);
  const road2 = new THREE.Mesh(geometry, material);

  const lineGeometry = new THREE.BoxGeometry(0.15, 0.01, 1.5);
  const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const lines: THREE.Mesh[] = [];
  for (let i = 0; i < 200; i++) {
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.y = 0.01;
    line.position.x = -2.5;
    line.position.z = -500;
    line.position.z = -i * 4;
    scene.add(line);
    lines.push(line);
  }

  road1.rotation.x = -Math.PI / 2;
  road2.rotation.x = -Math.PI / 2;

  road1.position.z = 0;
  road2.position.z = roadLength;
  road1.position.x = -2.5;
  road2.position.x = -2.5;
  scene.add(road1, road2);
  return {
    road: [road1, road2],
    roadLength,
    lines,
  };
}
