import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventClick extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Click, details_setter, customizer)
    }
}
function details_setter(){
    if(this.currentEvent==="click") this.dx = 0
    else this.dx = 1
    // console.log(this.currentEvent)
}
const __useClickEvent = (target, customizer) => new ZikoEventClick(target, customizer)

globalThis.expClick = __useClickEvent
export{
    __useClickEvent,
    ZikoEventClick
}