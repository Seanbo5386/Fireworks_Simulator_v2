import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class PostProcessing {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    const bloomStrength = 1.2;
    const bloomRadius = 0.4;
    const bloomThreshold = 0.0;
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloomStrength, bloomRadius, bloomThreshold);
    this.composer.addPass(this.bloomPass);

    this.setSize(window.innerWidth, window.innerHeight);
  }

  render(delta) {
    this.composer.render(delta);
  }

  setSize(width, height) {
    this.composer.setSize(width, height);
  }
}
