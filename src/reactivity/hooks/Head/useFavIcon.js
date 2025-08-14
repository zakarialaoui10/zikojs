import { useEventEmitter } from "../../../use/use-event-emmiter.js";
class ZikoUseFavIcon{
    constructor(FavIcon,useEventEmitter=true){
        this.#init();
        this.cache={
            Emitter:null
        }
        if(useEventEmitter)this.useEventEmitter();
        this.set(FavIcon);
    }
    #init(){     
        this.__FavIcon__ = document.querySelector("link[rel*='icon']") || document?.createElement('link');   
        this.__FavIcon__.type = 'image/x-icon';
        this.__FavIcon__.rel = 'shortcut icon';
        return this;
    }
    set(href){
        if(href!==this.__FavIcon__.href){
            this.__FavIcon__.href=href;
            if(this.cache.Emitter)this.cache.Emitter.emit("ziko:favicon-changed");
        }
        return this;
    }
    get current(){
        return document.__FavIcon__.href;
    }
    onChange(callback){
        if(this.cache.Emitter)this.cache.Emitter.on("ziko:favicon-changed",callback);
        return this;
    }
    useEventEmitter(){
        this.cache.Emitter=useEventEmitter();
        return this;
    }

}
const useFavIcon=(FavIcon,useEventEmitter)=>new ZikoUseFavIcon(FavIcon,useEventEmitter);
export{ useFavIcon }