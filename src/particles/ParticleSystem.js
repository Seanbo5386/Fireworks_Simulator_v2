import * as THREE from 'three';
import vertexShader from './shaders/particles.vertex.glsl?raw';
import fragmentShader from './shaders/particles.fragment.glsl?raw';

/**
 * GPU-based particle system using BufferGeometry and custom shaders.
 * Particles are simulated on the GPU for better performance.
 */
export default class ParticleSystem {
  constructor(scene, maxParticles = 1000) {
    this.scene = scene;
    this.maxParticles = maxParticles;
    this._current = 0;
    this._time = 0;

    // attribute buffers
    const positions = new Float32Array(maxParticles * 3);
    const velocities = new Float32Array(maxParticles * 3);
    const colors = new Float32Array(maxParticles * 3);
    const startTimes = new Float32Array(maxParticles);
    const lifeTimes = new Float32Array(maxParticles);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('aStartPosition', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('aStartTime', new THREE.BufferAttribute(startTimes, 1));
    this.geometry.setAttribute('aLifeTime', new THREE.BufferAttribute(lifeTimes, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uGravity: { value: new THREE.Vector3(0, -9.81, 0) }
      }
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    // store references for updates
    this.positions = positions;
    this.velocities = velocities;
    this.colors = colors;
    this.startTimes = startTimes;
    this.lifeTimes = lifeTimes;
  }

  /**
   * Spawn a burst of particles at a position with a given color.
   */
  spawn(position, color, count = 30, life = 2) {
    for (let i = 0; i < count; i++) {
      const index = this._current++ % this.maxParticles;

      this.positions[index * 3] = position.x;
      this.positions[index * 3 + 1] = position.y;
      this.positions[index * 3 + 2] = position.z;

      this.velocities[index * 3] = (Math.random() - 0.5) * 6;
      this.velocities[index * 3 + 1] = (Math.random() - 0.5) * 6;
      this.velocities[index * 3 + 2] = (Math.random() - 0.5) * 6;

      this.colors[index * 3] = color.r;
      this.colors[index * 3 + 1] = color.g;
      this.colors[index * 3 + 2] = color.b;

      this.startTimes[index] = this._time;
      this.lifeTimes[index] = life;
    }

    this.geometry.attributes.aStartPosition.needsUpdate = true;
    this.geometry.attributes.aVelocity.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;
    this.geometry.attributes.aStartTime.needsUpdate = true;
    this.geometry.attributes.aLifeTime.needsUpdate = true;
  }

  /**
   * Update the GPU uniform time.
   */
  update(delta) {
    this._time += delta;
    this.material.uniforms.uTime.value = this._time;
  }
}
