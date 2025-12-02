import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventDrag extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Drag, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_drag_event = (target, customizer) => new ZikoEventDrag(target, customizer)

export{
    bind_drag_event,
    ZikoEventDrag
}