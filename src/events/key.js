import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventKey extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Key, details_setter, customizer)
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
const __useKeyEvent = (target, customizer) => new ZikoEventKey(target, customizer)

export{
    __useKeyEvent,
    ZikoEventKey
}