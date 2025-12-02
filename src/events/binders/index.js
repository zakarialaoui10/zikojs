import { ZikoEvent } from "../ziko-event.js";
import { EventsMap } from "../events-map/index.js";
import {
    ptr_details_setter,
    key_details_setter
} from '../details-setter/index.js'
import { 
    register_click_away_event,
    register_view_event,
    register_swipe_event
} from "../custom-events-registry/index.js";

export const bind_click_event = (target, customizer) => {
    register_click_away_event(target.element)
    return new ZikoEvent(
        'click',
        target,
        EventsMap.Click,
        null,
        customizer
    );
}
export const bind_clipboard_event = (target, customizer) => new ZikoEvent(
    'clipboard',
    target,
    EventsMap.Clipboard,
    null,
    customizer
);
export const bind_drag_event = (target, customizer) => new ZikoEvent(
    'drag',
    target,
    EventsMap.Drag,
    null,
    customizer
);
export const bind_focus_event = (target, customizer) => new ZikoEvent(
    'focus',
    target,
    EventsMap.Focus,
    null,
    customizer
);
export const bind_key_event = (target, customizer) => new ZikoEvent(
    'key',
    target,
    EventsMap.Key, 
    key_details_setter, 
    customizer
);
export const bind_mouse_event = (target, customizer) => new ZikoEvent(
    'mouse',
    target,
    EventsMap.Mouse,
    null,
    customizer
);
export const bind_pointer_event = (target, customizer) => new ZikoEvent(
    'ptr',
    target,
    EventsMap.Ptr, 
    ptr_details_setter, 
    customizer
);
export const bind_touch_event = (target, customizer) => new ZikoEvent(
    'touch',
    target,
    EventsMap.Touch,
    null,
    customizer
);
export const bind_wheel_event = (target, customizer) => new ZikoEvent(
    'wheel',
    target,
    EventsMap.Wheel,
    null,
    customizer
);

export const bind_view_event = (target, customizer) => {
    register_view_event(target.element)
    return new ZikoEvent(
        'view',
        target, 
        EventsMap.View,
        null, 
        customizer
    )
}

export const bind_swipe_event = (target, customizer) => {
    register_swipe_event(target.element)
    return new ZikoEvent(
        'swipe',
        target, 
        EventsMap.Swipe,
        null, 
        customizer
    )
}