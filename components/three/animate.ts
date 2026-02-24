import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface Args {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  road: THREE.Mesh[];
  lines: THREE.Mesh[];
  wheels: THREE.Object3D[];
  controls: OrbitControls;
}
export function animate({
  scene,
  camera,
  renderer,
  road,
  wheels,
  lines,
  controls,
}: Args) {
  const speed = 0.1;

  function tick() {
    road.forEach((r) => {
      r.position.z -= speed;
      if (r.position.z < -200) {
        r.position.z += 200;
      }
    });

    lines.forEach((line) => {
      line.position.z -= speed;
      if (line.position.z < -200) {
        line.position.z += 500;
      }
    });

    wheels.forEach((w) => {
      w.rotation.x += speed * 0.4;
    });

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
}
