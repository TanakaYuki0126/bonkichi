import * as THREE from "three";
import { createRoad } from "./road";
import { loadCar } from "./car";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createMountainGroup } from "./mountain";
import gsap from "gsap";

function introPlayed() {
  return Boolean(sessionStorage.getItem("introPlayed"));
}
export function initScene(container: HTMLElement) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffc4a0, 0.5);
  scene.add(ambient);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = true;
  controls.enablePan = false;
  controls.target.set(0, 10, 0);
  controls.minDistance = 1;
  controls.maxDistance = 200;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableDamping = true;
  function saveCamera() {
    const data = {
      position: camera.position.toArray(),
      target: controls.target.toArray(),
    };
    sessionStorage.setItem("cameraState", JSON.stringify(data));
  }
  controls.addEventListener("change", saveCamera);

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

  const mountainGroup1 = createMountainGroup();
  const mountainGroup2 = createMountainGroup();
  const groupLength = 1600;
  mountainGroup1.position.z = 0;
  mountainGroup2.position.z = groupLength;
  scene.add(mountainGroup1);
  scene.add(mountainGroup2);

  const sunLight = new THREE.DirectionalLight(0xffa060, 3);
  sunLight.position.set(50, 30, -40);
  sunLight.castShadow = true;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  const { road, roadLength, lines } = createRoad(scene);
  const { car, wheels } = loadCar(scene);

  function playIntro() {
    //オープニングアニメーション
    gsap.set(".lp-links", { pointerEvents: "none" });
    gsap.set(".title", { pointerEvents: "none" });
    controls.enabled = false;
    gsap.to("#introOverlay", {
      opacity: 0,
      duration: 2,
      scale: 1.05,
      delay: 3,
      ease: "power2.out",
      onComplete: () => {
        document.getElementById("introOverlay")?.remove();
      },
    });
    gsap.fromTo(
      "#landingMenu",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 8,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(".lp-links", { pointerEvents: "auto" });
          gsap.set(".title", { pointerEvents: "auto" });
        },
      }
    );
    gsap.to(camera.position, {
      x: 10,
      y: 5,
      z: 7,
      duration: 5,
      delay: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
      onComplete: () => {
        controls.enabled = true;
      },
    });
    gsap.to(controls.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 5,
      delay: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.update();
      },
    });
  }

  if (introPlayed()) {
    const saved = sessionStorage.getItem("cameraState");
    if (saved) {
      const data = JSON.parse(saved);
      camera.position.fromArray(data.position);
      controls.target.fromArray(data.target);
      controls.update();
    } else {
      camera.position.set(10, 5, 7);
    }
  } else {
    camera.position.set(100, 10, 10);
  }

  if (!sessionStorage.getItem("introPlayed")) {
    // playIntro();
    sessionStorage.setItem("introPlayed", "true");
  }
  camera.position.set(-20, 8, -70);
  playIntro();

  return {
    scene,
    car,
    camera,
    renderer,
    road,
    roadLength,
    wheels,
    lines,
    controls,
    mountainGroup1,
    mountainGroup2,
  };
}
