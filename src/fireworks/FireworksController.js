import * as THREE from 'three';
import Firework from './Firework.js';
import ParticleSystem from '../particles/ParticleSystem.js';

/**
 * Controller that manages a set of fireworks. It handles launching new
 * fireworks, updating them every frame and forwarding updates to the underlying
 * ParticleSystem instance.
 */
export default class FireworksController {
  constructor(scene, audio = {}) {
    this.scene = scene;
    this.audio = audio;
    this.fireworks = [];
    this.particleSystem = new ParticleSystem(scene);
  }

  /**
   * Launch a new firework from a given position.
   * @param {THREE.Vector3} position
   * @param {THREE.Vector3} [velocity]
   * @param {THREE.Color} [color]
   */
  launch(position, velocity = new THREE.Vector3(0, 8, 0), color) {
    const fw = new Firework(this.scene, this.particleSystem, this.audio);
    fw.launch(position, velocity, color);
    this.fireworks.push(fw);
    return fw;
  }

  /**
   * Update all fireworks and the particle system.
   * @param {number} delta Time step in seconds
   */
  update(delta) {
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.update(delta);
      if (!fw.alive) {
        this.fireworks.splice(i, 1);
      }
    }
    this.particleSystem.update(delta);
  }
}
