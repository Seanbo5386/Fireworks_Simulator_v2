import * as THREE from 'three';
import World from './World.js';

const canvas = document.querySelector('canvas.webgl');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
scene.add(camera);
camera.position.set(0, 0, 5);

const world = new World({ scene, camera, renderer });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if (typeof world.onResize === 'function') {
    world.onResize();
  }
});

function tick() {
  requestAnimationFrame(tick);
  if (typeof world.update === 'function') {
    world.update();
  }
  renderer.render(scene, camera);
}

tick();
