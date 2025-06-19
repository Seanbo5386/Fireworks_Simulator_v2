import * as THREE from 'three';
import World from '../app/World.js';
import Sizes from '../utils/Sizes.js';
import Time from '../utils/Time.js';
import Controls from './Controls.js';
import Environment from './Environment.js';
import PostProcessing from './PostProcessing.js';

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // Setup
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 5);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);

    // Components
    this.controls = new Controls(this.camera, canvas);
    this.environment = new Environment(this.scene);
    this.post = new PostProcessing(this.renderer, this.scene, this.camera);
    this.world = new World({ scene: this.scene });

    // Resize event
    this.sizes.on('resize', () => {
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(this.sizes.pixelRatio);
      if (this.post.onResize) this.post.onResize(this.sizes);
      if (this.world.onResize) this.world.onResize();
    });

    // Tick event
    this.time.on('tick', () => {
      if (this.controls.update) this.controls.update();
      if (this.world.update) this.world.update(this.time.delta / 1000);
      if (this.post.update) this.post.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
}
