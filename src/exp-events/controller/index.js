export class EventController {
  constructor(target, category){
    this.cache = {
      category,
      target,
      listeners : {},
      currentEvent : null
    }
  }
  get element(){
    return this.cache.target.element;
  }
  get currentEvent(){
    return this.cache.currentEvent;
  }
  addListener(event, callback){
    this.cache.listeners[event] = {
      paused : false,
      callback : ()=>{
        if(!this.cache.listeners[event].paused) {
          this.cache.currentEvent = event
          callback.call(this, this)
        }
      },
    };
    this.element.addEventListener(event, this.cache.listeners[event].callback);
    return this;
  }
  removeListener(event){
    this.element.removeEventListener(event, this.cache.listeners[event].callback);
    return this;
  }
  pause(event){
    this.cache.listeners[event].paused = true;
    return this;
  }
  resume(event){
    this.cache.listeners[event].paused = false;
    return this;
  }
}