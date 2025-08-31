import { __ZikoEvent__ } from "../__ZikoEvent__.js";
import { Events } from "../__Events__.js";
class ZikoEventFocus extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Focus, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_focus_event = (target, customizer) => new ZikoEventFocus(target, customizer)

export{
    bind_focus_event,
    ZikoEventFocus
}