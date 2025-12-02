import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map.js";
class ZikoEventClipboard extends ZikoEvent{
    constructor(target, customizer){
        super(target, EventsMap.Clipboard, details_setter, customizer)
    }
}
function details_setter(){

}
const bind_clipboard_event = (target, customizer) => new ZikoEventClipboard(target, customizer)

export{
    bind_clipboard_event,
    ZikoEventClipboard
}