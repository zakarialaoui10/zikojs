import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventClipboard extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Clipboard, details_setter, customizer)
    }
}
function details_setter(){

}
const bindClipboardEvent = (target, customizer) => new ZikoEventClipboard(target, customizer)

export{
    bindClipboardEvent,
    ZikoEventClipboard
}