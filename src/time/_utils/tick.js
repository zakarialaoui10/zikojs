export class Tick {
  constructor(ms, fn) {
    this.ms = ms;
    this.fn = fn;
    this.id = null;
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.id = setInterval(this.fn, this.ms);
    }
    return this;
  }

  stop() {
    if (this.running) {
      this.running = false;
      clearInterval(this.id);
      this.id = null;
    }
    return this;
  }

  isRunning() {
    return this.running;
  }
}
const tick = (ms, fn) => new Tick(ms, fn)
export {
    tick,
    Tick
}