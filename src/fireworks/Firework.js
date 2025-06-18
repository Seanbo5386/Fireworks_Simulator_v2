import * as THREE from 'three';

/**
 * Simple class representing a single firework rocket. It ascends until its
 * velocity in the Y axis becomes negative, then it explodes and spawns
 * particles via the provided ParticleSystem instance. Audio clips for the
 * launch and explosion are triggered if provided.
 */
export default class Firework {
  constructor(scene, particleSystem, audio = {}) {
    this.scene = scene;
    this.particleSystem = particleSystem;
    this.audio = audio;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.color = new THREE.Color();

    this.mesh = null;
    this.alive = false;
  }

  /**
   * Launch the firework from a given position with the supplied velocity.
   * @param {THREE.Vector3} position
   * @param {THREE.Vector3} velocity
   * @param {THREE.Color} [color]
   */
  launch(position, velocity, color = new THREE.Color(Math.random(), Math.random(), Math.random())) {
    this.position.copy(position);
    this.velocity.copy(velocity);
    this.color.copy(color);

    if (!this.mesh) {
      const geometry = new THREE.SphereGeometry(0.05, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color: this.color });
      this.mesh = new THREE.Mesh(geometry, material);
    } else {
      this.mesh.material.color.copy(this.color);
    }

    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
    this.alive = true;

    this._playAudio('launch');
  }

  /**
   * Update the firework simulation.
   * @param {number} delta Time step in seconds
   */
  update(delta) {
    if (!this.alive) return;

    // simple gravity
    this.velocity.y -= 9.81 * delta;
    this.position.addScaledVector(this.velocity, delta);

    if (this.mesh) {
      this.mesh.position.copy(this.position);
    }

    // When the rocket starts falling, trigger explosion
    if (this.velocity.y <= 0) {
      this._explode();
    }
  }

  /**
   * Remove the mesh and spawn particles.
   */
  _explode() {
    if (!this.alive) return;
    this.alive = false;

    if (this.mesh) {
      this.scene.remove(this.mesh);
    }

    this._playAudio('explosion');
    if (this.particleSystem) {
      this.particleSystem.spawn(this.position.clone(), this.color);
    }
  }

  _playAudio(key) {
    const clip = this.audio[key];
    if (clip && typeof clip.play === 'function') {
      try {
        clip.currentTime = 0;
        clip.play();
      } catch (err) {
        // ignore playback errors in non-browser environments
      }
    }
  }
}
