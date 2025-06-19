import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = performance.now();
    this.current = this.start;
    this.delta = 16;
    this.elapsed = 0;

    const tick = () => {
      const current = performance.now();
      this.delta = current - this.current;
      this.current = current;
      this.elapsed = this.current - this.start;
      this.emit('tick');
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}
