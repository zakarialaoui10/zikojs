import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventHash extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Hash, details_setter, customizer)
    }
}
function details_setter(){

}
const bindHashEvent = (target, customizer) => new ZikoEventHash(target, customizer)

export{
    bindHashEvent,
    ZikoEventHash
}