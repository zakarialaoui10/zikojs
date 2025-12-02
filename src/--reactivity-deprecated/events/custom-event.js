import { ZikoEvent , EVENT_CONTROLLER } from "./ZikoEvent.js";
const custom_event_controller=event_name=>function(e){
    EVENT_CONTROLLER.call(this,e,event_name,null,null)
}
class ZikoCustomEvent extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
            },
            paused:{
            },
            stream:{
                enabled:{
                },
                clear:{
                },
                history:{
                }
            },
            callbacks:{
            }
        }
        this.__controller={
        }
    }
    #init(event_name){
        this.cache.preventDefault[event_name]=false;
        this.cache.paused[event_name]=false;
        this.cache.stream.enabled=false;
        this.cache.stream.clear=false;
        this.cache.stream.history=[];
        this.cache.callbacks[event_name]=[]
        this.__controller[event_name]=custom_event_controller(event_name).bind(this);
        return this;
    }
    on(event_name,...callbacks){
        if(!(this.__controller[event_name]))this.#init(event_name);
        this.__onEvent(event_name,{},...callbacks)
        return this;
     }  
    emit(event_name,detail={}){
        if(!(this.__controller[event_name]))this.#init(event_name);
        this.detail=detail;
        const event=new Event(event_name);
        this.targetElement.dispatchEvent(event);
        return this;
    }
}
const useCustomEvent=target=>new ZikoCustomEvent(target);

export{
    useCustomEvent,
    ZikoCustomEvent
}