import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventTouch extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Touch, details_setter, customizer)
    }
}
function details_setter(){

}
const bindTouchEvent = (target, customizer) => new ZikoEventTouch(target, customizer)

export{
    bindTouchEvent,
    ZikoEventTouch
}