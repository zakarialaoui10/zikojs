class ZikoTimeLoop {
  constructor(callback, step = 1000/30, startTime=0, endTime = Infinity, started = true) {
    this.callback = callback;
    this.cache = {
      isRunning: false,
      AnimationId : null,
      t0 : null,
      step,
      // fps,
      startTime,
      endTime,
      started
    };
    this.init();
    this.i=0;
  }
  init(){
    // if(this.cache.step && this.cache.fps){
    //   console.warn(`Fps will be adjusted from ${this.cache.fps} to ${1000/this.cache.step} to ensure a smoother animation`);
    //   this.cache.fps=1000/this.cache.step;
    // }
    if(this.cache.started){
      this.cache.startTime?this.startAfter(this.cache.startTime):this.start();
      if(this.cache.endTime&&this.cache.endTime!==Infinity)this.stopAfter(this.cache.endTime);
    }
    return this;
  }
  // get TIME_STEP() {
  //   // return this.cache.step?this.cache.step:1000 / this.cache.fps;
  //   return this.cache.step;
  // }
  start() {
    if (!this.cache.isRunning) {
      this.i=0;
      this.cache.isRunning = true;
      this.cache.t0 = Date.now();
      this.animate();
    }
    return this;
  }
  pause() {
    if (this.cache.isRunning) {
      clearTimeout(this.cache.AnimationId);
      this.cache.isRunning = false;
    }
    return this;
  }
  stop(){
    this.pause();
    this.i=0;
    return this;
  }
  resume(){
    this.cache.isRunning=true;
    this.animate();
    return this;
  }
  startAfter(t=1000){
    setTimeout(this.start.bind(this),t);
    return this;
  }
  stopAfter(t=1000){
    setTimeout(this.stop.bind(this),t);
    return this;   
  }
  animate = () => {
    if (this.cache.isRunning) {
      const now = Date.now();
      const delta = now - this.cache.t0;
      if (delta > this.cache.step) {
        this.callback(this);
        this.i++;
        this.cache.t0 = now - (delta % this.cache.step);
      }
      this.cache.AnimationId = setTimeout(this.animate, 0);
    };
  }
}
const useFps = fps => 1000/fps;
const useTimeLoop = (callback, step, startTime, endTime, started) => new ZikoTimeLoop(callback, step, startTime, endTime, started);


//const a = useTimeLoop((e) => console.log(e.i), {step:100,fps:30,t:[500,4001],start:true});
export {
  useTimeLoop,
  useFps
}
