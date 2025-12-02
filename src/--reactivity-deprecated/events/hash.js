import { ZikoEvent , EVENT_CONTROLLER } from "./ZikoEvent.js";
function hashchange_controller(e){
    EVENT_CONTROLLER.call(this,e,"hashchange",null,null)
}
class ZikoEventHash extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                hashchange:false,
            },
            paused:{
                hashchange:false,      
            },
            stream:{
                enabled:{
                    hashchange:false,

                },
                clear:{
                    hashchange:false, 
         
                },
                history:{
                    hashchange:[],
                }
            },
            callbacks:{
                hashchange:[],
            }
        }
        this.__controller={
            hashchange:hashchange_controller.bind(this),
        }
    }
    onChange(...callbacks){
        this.__onEvent("hashchange",{},...callbacks)
        return this;
     }    
}
const useHashEvent=target=>new ZikoEventHash(target);
export{
    useHashEvent,
    ZikoEventHash
}