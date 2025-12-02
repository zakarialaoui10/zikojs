import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map/index.js";
import {
    ptr_details_setter,
    key_details_setter
} from '../details-setter/index.js'
import { register_click_away_event } from "../custom-events-registry/click-away.js";

export const bind_click_event = (target, customizer) => {
    register_click_away_event(target.element)
    return new ZikoEvent(
        target,
        EventsMap.Click,
        null,
        customizer
    );
}
export const bind_clipboard_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Clipboard,
    null,
    customizer
);
export const bind_drag_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Drag,
    null,
    customizer
);
export const bind_focus_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Focus,
    null,
    customizer
);
export const bind_key_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Key, 
    key_details_setter, 
    customizer
);
export const bind_mouse_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Mouse,
    null,
    customizer
);
export const bind_pointer_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Ptr, 
    ptr_details_setter, 
    customizer
);
export const bind_touch_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Touch,
    null,
    customizer
);
export const bind_wheel_event = (target, customizer) => new ZikoEvent(
    target,
    EventsMap.Wheel,
    null,
    customizer
);


// function details_setter(){
//     if(this.currentEvent==="click") this.dx = 0
//     else this.dx = 1
//     // console.log(this.currentEvent)
// }
