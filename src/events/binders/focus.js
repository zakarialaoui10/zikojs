import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventFocus extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Focus, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_focus_event = (target, customizer) => new ZikoEventFocus(target, customizer)

export{
    bind_focus_event,
    ZikoEventFocus
}