import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventHash extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Hash, details_setter, customizer)
    }
}
function details_setter(){

}
const bindHashEvent = (target, customizer) => new ZikoEventHash(target, customizer)

export{
    bindHashEvent,
    ZikoEventHash
}