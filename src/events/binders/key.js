import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventKey extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Key, details_setter, customizer)
    }
}
function details_setter(){
    switch(this.currentEvent){
        case "keydown" : {
            this.kd = this.event.key
        }; break;
        case "keypress" : {
            this.kp = this.event.key
        }; break;
        case "keyup" : {
            this.ku = this.event.key
        }; break;

    }
}
const bind_key_event = (target, customizer) => new ZikoEventKey(target, customizer)

export{
    bind_key_event,
    ZikoEventKey
}