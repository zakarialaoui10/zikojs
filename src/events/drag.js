import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventDrag extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Drag, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_drag_event = (target, customizer) => new ZikoEventDrag(target, customizer)

export{
    bind_drag_event,
    ZikoEventDrag
}