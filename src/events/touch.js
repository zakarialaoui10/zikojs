import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventTouch extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Touch, details_setter, customizer)
    }
}
function details_setter(){

}
const bindTouchEvent = (target, customizer) => new ZikoEventTouch(target, customizer)

export{
    bindTouchEvent,
    ZikoEventTouch
}