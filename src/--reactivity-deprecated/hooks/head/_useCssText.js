class ZikoUseCssText{
    constructor(css){
        this.#init();
        this.set(css);
    }
    #init(){     
        // this.__FavIcon__=document.querySelector("link[rel*='icon']") || document?.createElement('link');   
        // this.__FavIcon__.type = 'image/x-icon';
        // this.__FavIcon__.rel = 'shortcut icon';
        return this;
    }
    set(cssText){
        // if(href!==this.__FavIcon__.href){
        //     this.__FavIcon__.href=href;
        //     if(this.cache.Emitter)this.cache.Emitter.emit("ziko:favicon-changed");
        // }
        return this;
    }
}
const useCss=(FavIcon,useEventEmitter)=>new ZikoUseCssText(FavIcon,useEventEmitter);
export{ useCss }