import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(3.8, 2.3, 4.8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1.1, 0);
controls.update();

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 1 }),
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const logo = new THREE.Group();
scene.add(logo);

const loader = new GLTFLoader();

loader.load(
  "/assets/three-logo.glb",
  (gltf) => {
    const model = gltf.scene;

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.2 / maxDimension;

    model.scale.setScalar(scale);
    model.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(model);
    const scaledSize = scaledBox.getSize(new THREE.Vector3());
    const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

    model.position.x -= scaledCenter.x;
    model.position.y -= scaledCenter.y;
    model.position.z -= scaledCenter.z;
    model.position.y += scaledSize.y * 0.5 + 0.02;

    logo.add(model);
  },
  undefined,
  (error) => {
    console.error("Failed to load /assets/three-logo.glb", error);
  },
);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(3.5, 5.5, 3);
light.castShadow = true;
scene.add(light);

const fillLight = new THREE.HemisphereLight(0xe2e8f0, 0x0f172a, 1.2);
scene.add(fillLight);

const panel = document.createElement("div");
panel.className = "ui";
panel.innerHTML = `
  <label>
    Logo Rotation
    <input id="logo-rotation" type="range" min="-180" max="180" step="1" value="0" />
  </label>
  <label>
    Light Intensity
    <input id="light-intensity" type="range" min="0" max="5" step="0.01" value="3" />
  </label>
`;
document.body.append(panel);

const logoRotation = panel.querySelector<HTMLInputElement>("#logo-rotation");
const lightIntensity = panel.querySelector<HTMLInputElement>("#light-intensity");

if (logoRotation && lightIntensity) {
  logoRotation.addEventListener("input", () => {
    logo.rotation.y = THREE.MathUtils.degToRad(Number(logoRotation.value));
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
