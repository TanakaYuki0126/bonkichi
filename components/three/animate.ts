import * as THREE from "three";
import { OrbitControls, SimplexNoise } from "three/examples/jsm/Addons.js";

let exitMode = false;

let animationId: number;

export function startExit() {
  exitMode = true;
}

export function resetExit() {
  exitMode = false;
}

interface Args {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  road: THREE.Mesh[];
  lines: THREE.Mesh[];
  wheels: THREE.Object3D[];
  controls: OrbitControls;
  car: THREE.Object3D;
}

export function animate({
  scene,
  camera,
  renderer,
  road,
  wheels,
  lines,
  controls,
  car,
}: Args) {
  const speed = 0.1;

  const noise = new SimplexNoise();
  let t = 0;
  function tick() {
    t += 0.02;
    const bounce = noise.noise(t, 0) * 0.005;
    const tilt = noise.noise(t, 1) * 0.005;
    if (exitMode) {
      car.position.z += speed * 2;
      camera.position.z -= speed * 2;
    } else {
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
    }

    wheels.forEach((w) => {
      w.rotation.x += speed * 0.4;
    });

    car.position.y = bounce;
    car.rotation.z = tilt;

    controls.update();

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(tick);
  }

  tick();
  return () => cancelAnimationFrame(animationId);
}
