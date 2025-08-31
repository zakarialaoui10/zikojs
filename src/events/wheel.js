import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventWheel extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Wheel, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_wheel_event = (target, customizer) => new ZikoEventWheel(target, customizer)

export{
    bind_wheel_event,
    ZikoEventWheel
}