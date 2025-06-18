import * as THREE from 'three';

export default class World {
  constructor({ scene }) {
    this.scene = scene;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }

  onResize() {
    // placeholder for resize logic
  }
}
