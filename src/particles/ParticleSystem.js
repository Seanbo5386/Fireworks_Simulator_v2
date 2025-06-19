import * as THREE from 'three';

/**
 * Extremely small GPU-less particle system used for the fireworks example. It
 * simply spawns particles as THREE.Points and updates them on the CPU.
 */
export default class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    // Preload the particle texture located in the public folder
    const loader = new THREE.TextureLoader();
    this.texture = loader.load('/textures/smoke.png');
  }

  /**
   * Spawn a burst of particles at a position.
   * @param {THREE.Vector3} position
   * @param {THREE.Color} color
   * @param {number} [count]
   */
  spawn(position, color, count = 30) {
    for (let i = 0; i < count; i++) {
      const material = new THREE.SpriteMaterial({
        map: this.texture,
        color,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.setScalar(0.2);

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );

      this.scene.add(sprite);
      this.particles.push({ mesh: sprite, velocity, life: 2 });
    }
  }

  /**
   * Update all currently active particles.
   * @param {number} delta
   */
  update(delta) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.velocity.y -= 9.81 * delta * 0.3;
      p.mesh.position.addScaledVector(p.velocity, delta);
      p.life -= delta;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }
  }
}
