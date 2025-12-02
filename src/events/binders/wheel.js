import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventWheel extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Wheel, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_wheel_event = (target, customizer) => new ZikoEventWheel(target, customizer)

export{
    bind_wheel_event,
    ZikoEventWheel
}