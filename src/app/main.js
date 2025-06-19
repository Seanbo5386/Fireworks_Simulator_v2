import * as THREE from 'three';
import World from './World.js';
import PostProcessing from '../experience/PostProcessing.js';

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
const post = new PostProcessing(renderer, scene, camera);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  post.setSize(window.innerWidth, window.innerHeight);
  if (typeof world.onResize === 'function') {
    world.onResize();
  }
});

const clock = new THREE.Clock();

function tick() {
  requestAnimationFrame(tick);
  const delta = clock.getDelta();
  if (typeof world.update === 'function') {
    world.update(delta);
  }
  post.render();
}

tick();