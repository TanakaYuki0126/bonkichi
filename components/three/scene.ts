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
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffc4a0, 0.4);
  scene.add(ambient);

  const controls = new OrbitControls(camera, document.body);
  controls.enableRotate = true;
  controls.minDistance = 1;
  controls.maxDistance = 200;
  controls.maxPolarAngle = Math.PI / 2;

  const skyGeo = new THREE.SphereGeometry(500, 32, 32);
  const skyMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.BackSide,
  });
  const colors: number[] = [];
  const position = skyGeo.attributes.position;

  const topColor = new THREE.Color(0.25, 0.45, 0.85);
  const midColor = new THREE.Color(0.9, 0.6, 0.5);
  const bottomColor = new THREE.Color(1.0, 0.5, 0.25);

  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    const t = THREE.MathUtils.clamp((y + 500) / 1000, 0, 1);
    const color = new THREE.Color();
    if (t > 0.1) {
      color.lerpColors(midColor, topColor, (t - 0.6) / 0.4);
    } else {
      color.lerpColors(bottomColor, midColor, t / 0.6);
    }
    colors.push(color.r, color.g, color.b);
  }

  skyGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  const groundGeo = new THREE.PlaneGeometry(1000, 1000);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x4c7a3d,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.receiveShadow = true;
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  scene.add(ground);

  const mountains: THREE.Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const z = (10 - i) * 80;
    const scale = 1 + Math.random() * 2;
    const far = (Math.random() + 0.8) * 200;
    mountains.push(createMountain(far, z, scale));
    mountains.push(createMountain(-far, z, scale));
  }
  mountains.forEach((m) => scene.add(m));

  const sunLight = new THREE.DirectionalLight(0xffa060, 1.2);
  sunLight.position.set(50, 30, -40);
  sunLight.castShadow = true;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  const { road, roadLength, lines } = createRoad(scene);
  const { wheels } = loadCar(scene);
  return { scene, camera, renderer, road, roadLength, wheels, lines };
}
