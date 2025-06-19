import * as THREE from 'three';
import Controls from '../experience/Controls.js';

export default class World {
  constructor({ scene, camera, canvas }) {
    this.scene = scene;
    this.camera = camera;
    this.canvas = canvas;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.controls = new Controls({ camera: this.camera, domElement: this.canvas, scene: this.scene });
  }

  update(delta) {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.controls.update(delta);
  }

  onResize() {
    // placeholder for resize logic
  }
}
