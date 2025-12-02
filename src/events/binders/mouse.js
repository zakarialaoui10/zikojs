import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventMouse extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Mouse, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_mouse_event = (target, customizer) => new ZikoEventMouse(target, customizer)

export{
    bind_mouse_event,
    ZikoEventMouse
}