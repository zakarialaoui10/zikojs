import { useEventEmitter } from "../../../use/use-event-emmiter.js";
class ZikoUseTitle{
    constructor(title=document.title,useEventEmitter=true){
        this.cache={
            Emitter:null
        }
        if(useEventEmitter)this.useEventEmitter();
        this.set(title);
    }
    useEventEmitter(){
        this.cache.Emitter=useEventEmitter();
        return this;
    }
    set(title){
        if(title!==document.title){
            document.title=title;
            if(this.cache.Emitter)this.cache.Emitter.emit("ziko:title-changed");
        }
        return this;
    }
    get current(){
        return document.title;
    }
    onChange(callback){
        if(this.cache.Emitter)this.cache.Emitter.on("ziko:title-changed",callback);
        return this;
    }
}
const useTitle=(title, useEventEmitter)=>new ZikoUseTitle(title, useEventEmitter);
export{ useTitle }