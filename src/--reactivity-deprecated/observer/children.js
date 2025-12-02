import { ZikoMutationObserver } from "./mutation";
class ZikoWatchChildren extends ZikoMutationObserver{
    constructor(targetUIElement,callback){
      super(targetUIElement,{ attributes: false, childList: true, subtree: false });
      Object.assign(this.cache,{
        observeCallback : (mutationsList, observer) =>{
          for (const mutation of mutationsList) {
            if(mutation.addedNodes)this.cache.lastMutation = {
              type : "add",
              item : this.target.find(n=>n.element === mutation.addedNodes[0])[0],
              previous : this.target.find(n=>n.element === mutation.previousSibling)[0]
            }
            else if(mutation.addedNodes)this.cache.lastMutation = {
              type : "remove",
              item : this.target.find(n=>n.element === mutation.removedNodes[0])[0],
              previous : this.target.find(n=>n.element === mutation.previousSibling)[0]
            }
            if (this.cache.streamingEnabled) this.cache.mutationHistory.children.push(this.cache.lastMutation)
        }
        if (this.callback) this.callback(mutationsList, observer);  
      }  
      })
      this.cache.mutationHistory.children = []
      if(callback)this.observe(callback);
    }
    get item(){
      return this.cache.lastMutation.item;
    }
    get history(){
      return this.cache.mutationHistory.children;
    }
  }

const watchChildren=(targetUIElement, callback)=>new ZikoWatchChildren(targetUIElement, callback);
export{
    watchChildren
}