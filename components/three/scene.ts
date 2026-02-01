import * as THREE from "three";
import { createRoad } from "./road";
import { loadCar } from "./car";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createMountain } from "./mountain";
export function initScene(container: HTMLElement) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  camera.position.set(10, 5, 7);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  const controls = new OrbitControls(camera, document.body);
  controls.enableRotate = true;
  controls.minDistance = 1;
  controls.maxDistance = 200;
  const skyGeo = new THREE.SphereGeometry(500, 32, 32);
  const skyMat = new THREE.MeshBasicMaterial({
    color: 0x87ceeb,
    side: THREE.BackSide,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  const groundGeo = new THREE.PlaneGeometry(1000, 1000);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x4c7a3d,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  scene.add(ground);

  const mountains: THREE.Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const z = (10 - i) * 80;
    const scale = 1 + Math.random() * 2;
    const far = (Math.random() + 0.7) * 120;
    mountains.push(createMountain(far, z, scale));
    mountains.push(createMountain(-far, z, scale));
  }
  mountains.forEach((m) => scene.add(m));

  scene.fog = new THREE.Fog(0x87ceeb, 50, 400);

  const { road, roadLength, lines } = createRoad(scene);
  const { wheels } = loadCar(scene);
  return { scene, camera, renderer, road, roadLength, wheels, lines };
}
