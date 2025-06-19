export default class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  off(event, fn) {
    if (!this.listeners[event]) return;
    const index = this.listeners[event].indexOf(fn);
    if (index !== -1) this.listeners[event].splice(index, 1);
  }

  emit(event, ...args) {
    if (!this.listeners[event]) return;
    for (const fn of [...this.listeners[event]]) {
      fn(...args);
    }
  }
}
