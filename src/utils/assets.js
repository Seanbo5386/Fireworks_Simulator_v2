import * as THREE from 'three';

// Paths relative to the `public` directory. Vite will serve these from the root
// of the dev server / production build.
const TEXTURE_PATHS = {
  smoke: '/textures/smoke.png',
};

const AUDIO_PATHS = {
  ambient: '/audio/ambient.mp3',
  crackle: '/audio/crackle.mp3',
  launch: '/audio/launch-whistle.mp3',
  'explosion-1': '/audio/explosion-1.mp3',
  'explosion-2': '/audio/explosion-2.mp3',
  'explosion-3': '/audio/explosion-3.mp3',
};

/**
 * Simple manager that preloads textures and audio clips used by the simulator.
 * Usage:
 *   import assets from '../utils/assets.js';
 *   await assets.load();
 *   const smokeTexture = assets.getTexture('smoke');
 */
class AssetManager {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textures = {};
    this.audio = {};
  }

  /**
   * Load all declared textures and audio clips. Returns a Promise that
   * resolves once every asset has either loaded or failed.
   */
  async load() {
    const texPromises = Object.entries(TEXTURE_PATHS).map(([key, path]) => {
      return new Promise((resolve) => {
        this.textureLoader.load(path, (tex) => {
          this.textures[key] = tex;
          resolve();
        });
      });
    });

    const audioPromises = Object.entries(AUDIO_PATHS).map(([key, path]) => {
      const element = new Audio(path);
      this.audio[key] = element;
      // Resolve once the file can play through or on error (e.g. when running
      // outside of a browser environment).
      return new Promise((resolve) => {
        const done = () => resolve();
        element.addEventListener('canplaythrough', done, { once: true });
        element.addEventListener('error', done, { once: true });
      });
    });

    await Promise.all([...texPromises, ...audioPromises]);
  }

  getTexture(name) {
    return this.textures[name];
  }

  getAudio(name) {
    return this.audio[name];
  }
}

export default new AssetManager();
