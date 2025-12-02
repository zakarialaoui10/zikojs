import { ZikoMutationObserver } from "./mutation";
class ZikoWatchAttr extends ZikoMutationObserver{
    constructor(targetUIElement,callback){
      super(targetUIElement,{ attributes: true, childList: false, subtree: false });
      Object.assign(this.cache,{
        observeCallback : (mutationsList, observer) =>{
          for (const mutation of mutationsList) {
            this.cache.lastMutation = {
              name : mutation.attributeName,
              value : mutation.target.getAttribute(mutation.attributeName)
            }
            if (this.cache.streamingEnabled) this.cache.mutationHistory.attributes.push(this.cache.lastMutation)
        }
        if (this.callback) this.callback(mutationsList, observer);  
      }  
      })
      this.cache.mutationHistory.attributes = []
      if(callback)this.observe(callback);
    }
    get history(){
      return this.cache.mutationHistory.attributes;
    }
  }
const watchAttr=(targetUIElement, callback)=>new ZikoWatchAttr(targetUIElement, callback);
export{
    watchAttr
}

