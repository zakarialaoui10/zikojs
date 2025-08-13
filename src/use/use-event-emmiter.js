class ZikoUseEventEmitter {
    constructor() {
      this.events = {};
      this.maxListeners = 10; 
    }
    on(event, listener) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);  
      if (this.events[event].length > this.maxListeners) {
        console.warn(`Warning: Possible memory leak. Event '${event}' has more than ${this.maxListeners} listeners.`);
      }
    }
    once(event, listener) {
      const onceListener = (data) => {
        this.off(event, onceListener); // Remove the listener after it's been called
        listener(data);
      };
      this.on(event, onceListener);
    }
  
    off(event, listener) {
      const listeners = this.events[event];
      if (listeners) {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }
  
    emit(event, data) {
      const listeners = this.events[event];
      if (listeners) {
        listeners.forEach(listener => {
          listener(data);
        });
      }
    }
  
    clear(event) {
      if (event) {
        delete this.events[event];
      } else {
        this.events = {};
      }
    }
  
    setMaxListener(event, max) {
      this.maxListeners = max;
    }
  
    removeAllListeners(event) {
      if (event) {
        this.events[event] = [];
      } else {
        this.events = {};
      }
    }
  }

const useEventEmitter=()=>new ZikoUseEventEmitter()
export{useEventEmitter}