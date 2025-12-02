function EVENT_CONTROLLER(e,EVENT,setter,push_object){
    this.event=e
    if(this.cache.preventDefault[EVENT])e.preventDefault();
    console.log({setter})
    if(setter)setter();
    if(this.cache.stream.enabled[EVENT]&&push_object)this.cache.stream.history[EVENT].push(push_object);
    this.cache.callbacks[EVENT].map(n=>n(this));
    return this;
}
class ZikoEvent{
    constructor(target){
        this.target=null;
        this.setTarget(target);
        this.__dispose=this.dispose.bind(this);
        // this.EventIndex=Garbage.Pointer.data.length;
        // Garbage.Pointer.data.push({event:this,index:this.EventIndex});
    }
    get targetElement(){
        return this.target.element
    }
    setTarget(UI){
        this.target=UI;
        return this;
    }
    __handle(event,handler,dispose){
        const EVENT=(event==="drag")?event:`${this.cache.prefixe}${event}`
        this.dispose(dispose);
        this.targetElement?.addEventListener(EVENT,handler);
        return this;   
    }
    __onEvent(event,dispose,...callbacks){
        if(callbacks.length===0){
            if(this.cache.callbacks.length>1){
                this.cache.callbacks.map(n=>e=>n.call(this,e));
            }   
            else {
                return this;
            }
        }
        else this.cache.callbacks[event]=callbacks.map(n=>e=>n.call(this,e));
        this.__handle(event,this.__controller[event],dispose)
        return this;  
    }
    preventDefault(config={}){
        Object.assign(this.cache.preventDefault,config);
        return this;
    }
    pause(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.targetElement?.removeEventListener(`${this.cache.prefixe}${key}`,this.__controller[`${this.cache.prefixe}${key}`]);
                this.cache.paused[`${this.cache.prefixe}${key}`]=true;
            }
        }
        return this;
     }
    resume(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.targetElement?.addEventListener(`${this.cache.prefixe}${key}`,this.__controller[`${this.cache.prefixe}${key}`]);
                this.cache.paused[`${this.cache.prefixe}${key}`]=false;
            }
        }
        return this;
     }
    dispose(config={}){
        this.pause(config);
        return this;
     }
    stream(config={}){
        this.cache.stream.t0=Date.now();
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        Object.assign(this.cache.stream.enabled,config);
        return this;
     }
    clear(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.clear).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.cache.stream.history[key]=[]
            }
        }
        return this;
    }
}
export {ZikoEvent,EVENT_CONTROLLER}