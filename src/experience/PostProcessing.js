import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

export default class PostProcessing {
  constructor(renderer, scene, camera) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
  }

  onResize(sizes) {
    this.composer.setSize(sizes.width, sizes.height);
    this.composer.setPixelRatio(sizes.pixelRatio);
  }

  update() {
    this.composer.render();
  }
}
