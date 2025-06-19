import * as THREE from 'three';
import FireworksController from '../fireworks/FireworksController.js';

/**
 * Basic user controls for launching fireworks on demand.
 * - Clicking on the canvas launches a firework from the clicked position on the ground plane (y=0).
 * - Pressing the space bar launches a firework from a random ground location.
 */
export default class Controls {
  /**
   * @param {Object} options
   * @param {THREE.Camera} options.camera Camera used to convert pointer positions
   * @param {HTMLElement} options.domElement Element receiving pointer events
   * @param {THREE.Scene} options.scene Scene where fireworks are added
   */
  constructor({ camera, domElement, scene, audio = {} }) {
    this.camera = camera;
    this.domElement = domElement || window;
    this.scene = scene;
    this.audio = audio;

    this.fireworks = new FireworksController(scene, audio);

    this.raycaster = new THREE.Raycaster();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    this._onPointerDown = this._onPointerDown.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this.domElement.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('keydown', this._onKeyDown);
  }

  /**
   * Handle pointer clicks to launch fireworks where the user clicked.
   */
  _onPointerDown(event) {
    const rect = this.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    this.raycaster.setFromCamera(mouse, this.camera);
    const point = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.groundPlane, point);
    if (Number.isFinite(point.x)) {
      this.fireworks.launch(point);
    }
  }

  /**
   * Handle keyboard input. Space bar launches a firework from a random position.
   */
  _onKeyDown(event) {
    if (event.code === 'Space') {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        0,
        (Math.random() - 0.5) * 4
      );
      this.fireworks.launch(pos);
    }
  }

  /**
   * Update all fireworks each frame.
   * @param {number} delta Time step in seconds
   */
  update(delta) {
    this.fireworks.update(delta);
  }

  /** Remove event listeners and clean up. */
  dispose() {
    this.domElement.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('keydown', this._onKeyDown);
  }
}
