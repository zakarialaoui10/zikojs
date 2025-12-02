class ZikoMutationObserver {
    constructor(targetUIElement, options) {
      this.target = targetUIElement;
      this.observer = null;
      this.cache = {
        options : options || { attributes: true, childList: true, subtree: true },
        streamingEnabled : true,
        lastMutation : null,
        mutationHistory : {
          // attributes: [],
          // childList: [],
          // subtree: [],
        },
      }
  // children to Items : a.items.filter(n=>n.element === a[0].element)
      this.observeCallback = (mutationsList, observer) => {
        // if(this.cache.lastUpdatedAttr){
        //   this.cache.lastUpdatedAttr = mutation.target.getAttribute(mutation.attributeName)
        // }
        if (this.cache.streamingEnabled) {
          for (const mutation of mutationsList) {
            switch(mutation.type){
              case 'attributes':this.cache.mutationHistory.attributes.push(mutation.target.getAttribute(mutation.attributeName));break;
              case 'childList':this.cache.mutationHistory.childList.push(mutation);break;
              case 'subtree':this.cache.mutationHistory.subtree.push(mutation);break;
            }
          }
        }
        if (this.callback) {
          this.callback(mutationsList, observer);
        }
      };
    }
  
    observe(callback) {
      if(!this.observer) {
        if(!globalThis.MutationObserver) {
          console.log("MutationObserver Nor Supported")
          return;
        }
        this.observer = new MutationObserver(this.cache.observeCallback);
        this.observer.observe(this.target.element, this.cache.options);
        // this.callback = ([e]) => callback.call(e,this.target);
        this.callback = ([e]) => callback.call(e, this);
        this.cache.streamingEnabled = true;
      }
    }
  
    pause(options) {
      if (this.observer) {
        this.observer.disconnect();
        if (options) {
          this.observer.observe(this.target, options);
        }
      }
    }
  
    reset(options) {
      if (this.observer) {
        this.observer.disconnect();
        this.observer.observe(this.target, options || this.cache.options);
      }
    }
  
    clear() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
        this.cache.mutationHistory = {
          attributes: [],
          childList: [],
          subtree: [],
        };
      }
      this.cache.streamingEnabled = false;
      return this;
    }
  
    getMutationHistory() {
      return this.cache.mutationHistory;
    }
  
    enableStreaming() {
      this.cache.streamingEnabled = true;
      return this;
    }
  
    disableStreaming() {
      this.cache.streamingEnabled = false;
      return this;
    }
  }



const watch=(targetUIElement,options={},callback=null)=>{
    const Observer= new ZikoMutationObserver(targetUIElement,options);
    if(callback)Observer.observe(callback);
    return Observer
}
// const watchAttr = (targetUIElement, callback = null) => {
//   const options = { attributes: true, childList: false, subtree: false };
//   return watch(targetUIElement, options, ([e])=>callback.call(e,targetUIElement));
// };
// const watchAttr = (targetUIElement, callback = null) => {
//   const options = { attributes: true, childList: false, subtree: false };
//   return watch(targetUIElement, options, callback);
// };

export { 
  ZikoMutationObserver,
  watch,
 }; 