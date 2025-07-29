import { getEvent } from "./utils.js"
function event_controller(e, event_name, details_setter, customizer, push_object){
    this.cache.currentEvent = event_name;
    this.cache.event = e;
    details_setter?.call(this);
    if(customizer?.hasOwnProperty("prototype"))customizer?.call(this)
    else customizer?.call(null, this)
    if(this.cache.preventDefault[event_name]) e.preventDefault();
    if(this.cache.stopPropagation[event_name]) e.stopPropagation();
    if(this.cache.stopImmediatePropagation[event_name]) e.stopImmediatePropagation();
    
    if(this.cache.stream.enabled[event_name]&&push_object)this.cache.stream.history[event_name].push(push_object);
    this.cache.callbacks[event_name]?.map(n=>n(this));
}
class __ZikoEvent__ {
    constructor(target = null, Events = [], details_setter, customizer){
        this.target = target;
        this.cache = {
            currentEvent : null,
            event: null,
            options : {},
            preventDefault : {},
            stopPropagation : {},
            stopImmediatePropagation : {},
            event_flow : {},
            paused : {},
            stream : {
                enabled : {},
                clear : {},
                history : {}
            },
            callbacks : {},
            __controllers__:{}
        }
        const events = Events.map(n=>getEvent(n))
        events.forEach((event,i)=>{
            Object.assign(this.cache.preventDefault, {[event] : false});
            Object.assign(this.cache.options, {[event] : {}});
            Object.assign(this.cache.paused, {[event] : false});
            Object.assign(this.cache.stream.enabled, {[event] : false});
            Object.assign(this.cache.stream.clear, {[event] : false});
            Object.assign(this.cache.stream.history, {[event] : []});
            Object.assign(this.cache.__controllers__, {[event] : e=>event_controller.call(this, e, event, details_setter, customizer)});
            Object.assign(this, { [`on${Events[i]}`] : (...callbacks)=> this.__onEvent(event, this.cache.options[event], {}, ...callbacks)})
        })
    }
    get targetElement(){
        return this.target?.element;
    }
    get isParent(){
        return this.target?.element === this.event.srcElement;
    }
    get item(){
        return this.target.find(n=>n.element == this.event?.srcElement)?.[0];
    }
    get currentEvent(){
        return this.cache.currentEvent;
    }
    get event(){
        return this.cache.event;
    }
    setTarget(UI){
        this.target=UI;
        return this;
    }
    __handle(event, handler, options, dispose){
        this.targetElement?.addEventListener(event, handler, options);
        return this;
    }
    __onEvent(event, options, dispose, ...callbacks){
        if(callbacks.length===0){
            console.log("00")
            if(this.cache.callbacks[event]){
                console.log("Call")
                // this.cache.callbacks.map(n=>e=>n.call(this,e));
                this.cache.callbacks[event].map(n=>e=>n.call(this,e))
            }   
            else {
                return this;
            }
        }
        else this.cache.callbacks[event] = callbacks.map(n=>e=>n.call(this,e));
        this.__handle(event, this.cache.__controllers__[event],options, dispose)
        return this;  
    }
    #override(methode, overrides, defaultValue){
        if(defaultValue === "default") Object.assign(this.cache[methode], {...this.cache[methode], ...overrides});
        const all = defaultValue === "default" 
        ? this.cache[methode]
        : Object.fromEntries(Object.keys(this.cache.preventDefault).map(n=>[n,defaultValue]))
        Object.assign(this.cache[methode], {...all,...overrides});
        return this       
    }
    preventDefault(overrides = {}, defaultValue = "default"){
        this.#override("preventDefault", overrides, defaultValue);
        // const all=Object.fromEntries(Object.keys(this.cache.preventDefault).map(n=>[n,defaultValue]))
        // Object.assign(this.cache.preventDefault, {...all,...overrides});
        return this;
    }
    stopPropagation(overrides = {}, defaultValue = "default"){
        this.#override("stopPropagation", overrides, defaultValue);
        return this;
    }
    stopImmediatePropagation(overrides = {}, defaultValue = "default"){
        this.#override("stopImmediatePropagation", overrides, defaultValue);
        return this;
    }
    setEventOptions(event, options){
        this.pause({[event] : true, }, "default");
        Object.assign(this.cache.options[getEvent(event)], options);
        this.resume({[event] : true, }, "default");
        return this;
    }
    pause(overrides = {}, defaultValue = "default"){
        const all = defaultValue === "default" 
          ? this.cache.stream.enabled
          : Object.entries(Object.keys(this.cache.stream.enabled).map(n=>[n,defaultValue]));
        overrides={...all,...overrides};
        for(let key in overrides){
            if(overrides[key]){
                this.targetElement?.removeEventListener(key, this.cache.__controllers__[key], this.cache.options[key]);
                this.cache.paused[key]=true;
            }
        }
        return this;
    }
    resume(overrides = {}, defaultValue = "default"){
        const all = defaultValue === "default" 
          ? this.cache.stream.enabled
          : Object.entries(Object.keys(this.cache.stream.enabled).map(n=>[n,defaultValue]));
        overrides={...all,...overrides};
        for(let key in overrides){
            if(overrides[key]){
                this.targetElement?.addEventListener(key,this.cache.__controllers__[key], this.cache.options[key]);
                this.cache.paused[key]=false;
            }
        }
        return this;
     }
    stream(overrides = {}, defaultValue = "default"){
        this.cache.stream.t0=Date.now();
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,defaultValue]))
        overrides={...all,...overrides}
        Object.assign(this.cache.stream.enabled,overrides);
        return this;
     }
    clear(){

    }
    dispose(overrides = {}, defaultValue = "default"){
        this.pause(overrides, defaultValue);

        return this;
    }
}

export {
    __ZikoEvent__,
    getEvent
}