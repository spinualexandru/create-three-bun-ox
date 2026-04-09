import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(3, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.75, 0);
controls.update();

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 1 }),
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.75, 32, 16),
  new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35, metalness: 0.05 }),
);
sphere.position.y = 0.75;
sphere.castShadow = true;
scene.add(sphere);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(3, 5, 2);
light.castShadow = true;
scene.add(light);

const panel = document.createElement("div");
panel.className = "ui";
panel.innerHTML = `
  <label>
    Sphere X
    <input id="sphere-x" type="range" min="-3" max="3" step="0.01" value="0" />
  </label>
  <label>
    Light Intensity
    <input id="light-intensity" type="range" min="0" max="5" step="0.01" value="3" />
  </label>
`;
document.body.append(panel);

const sphereX = panel.querySelector<HTMLInputElement>("#sphere-x");
const lightIntensity = panel.querySelector<HTMLInputElement>("#light-intensity");

if (sphereX && lightIntensity) {
  sphereX.addEventListener("input", () => {
    sphere.position.x = Number(sphereX.value);
  });

  lightIntensity.addEventListener("input", () => {
    light.intensity = Number(lightIntensity.value);
  });
}

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
