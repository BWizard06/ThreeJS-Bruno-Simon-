import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// AxesHelper
// const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const textMatcap = textureLoader.load("/textures/matcaps/12.png");
const donutMatcap = textureLoader.load("/textures/matcaps/10.png");
const torusKnotMatcap = textureLoader.load("/textures/matcaps/11.png");

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("B Wizard", {
    font: font,
    size: 1.3,
    height: 0.7,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //     - (textGeometry.boundingBox.max.x - 0.02) / 2,
  //     - (textGeometry.boundingBox.max.y - 0.02) / 2,
  //     - (textGeometry.boundingBox.max.z - 0.03) / 2,
  // )
  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: textMatcap });
  // textMaterial.wireframe = true
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: donutMatcap });

  const torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.3)
  const torusKnotMaterial = new THREE.MeshMatcapMaterial({ matcap: torusKnotMatcap });

  for (let i = 0; i < 80; i++) {
    //Donut
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * 15;
    donut.position.y = (Math.random() - 0.5) * 15;
    donut.position.z = (Math.random() - 0.5) * 15;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);

    //Torusknot 
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
    
    torusKnot.position.x = (Math.random() - 0.5) * 15;
    torusKnot.position.y = (Math.random() - 0.5) * 15;
    torusKnot.position.z = (Math.random() - 0.5) * 15;
    
    torusKnot.rotation.x = Math.random() * Math.PI;
    torusKnot.rotation.y = Math.random() * Math.PI;
    
    torusKnot.scale.set(scale / 3, scale/ 3 , scale/ 3)

    scene.add(torusKnot)
  }
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
//
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
