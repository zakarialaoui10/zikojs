export class EventController {
  constructor(target, category){
    this.cache = {
      category,
      target,
      listeners : {},
      currentEvent : null,
      event : null
    }
  }
  get event(){
    return this.cache.event
  }
  get element(){
    return this.cache.target.element;
  }
  get currentEvent(){
    return this.cache.currentEvent;
  }
  addListener(event_name, callback){
    this.cache.listeners[event_name] = {
      paused : false,
      callback : e =>{
        this.cache.event = e;
        if(!this.cache.listeners[event_name].paused) {
          this.cache.currentEvent = event_name;
          callback.call(this, this)
        }
      },
    };
    this.element.addEventListener(event_name, this.cache.listeners[event_name].callback);
    return this;
  }
  removeListener(event_name){
    this.element.removeEventListener(event_name, this.cache.listeners[event_name].callback);
    return this;
  }
  pause(event_name){
    this.cache.listeners[event_name].paused = true;
    return this;
  }
  resume(event_name){
    this.cache.listeners[event_name].paused = false;
    return this;
  }
}