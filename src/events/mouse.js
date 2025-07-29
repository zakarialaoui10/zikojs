import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventMouse extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Mouse, details_setter, customizer)
    }
}
function details_setter(){

}
const bindMouseEvent = (target, customizer) => new ZikoEventMouse(target, customizer)

export{
    bindMouseEvent,
    ZikoEventMouse
}