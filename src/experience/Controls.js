import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Controls {
  constructor(camera, canvas) {
    this.controls = new OrbitControls(camera, canvas);
    this.controls.enableDamping = true;
  }

  update() {
    this.controls.update();
  }
}
