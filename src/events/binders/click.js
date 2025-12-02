import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
// import { register_click_away_event } from "./custom-events/click-away.js";
class ZikoEventClick extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Click, details_setter, customizer);
        // register_click_away_event(target.element)
    }
}
function details_setter(){
    if(this.currentEvent==="click") this.dx = 0
    else this.dx = 1
    // console.log(this.currentEvent)
}
const bind_click_event = (target, customizer) => new ZikoEventClick(target, customizer)

export{
    bind_click_event,
    ZikoEventClick
}