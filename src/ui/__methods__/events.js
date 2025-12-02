import { EventsMap } from "../../events/events-map/index.js";
import {
  bind_pointer_event,
  bind_mouse_event,
  bind_key_event,
  bind_click_event,
  bind_drag_event,
  bind_clipboard_event,
  bind_focus_event,
  bind_wheel_event
} from "../../events/binders/index.js";

import { bind_custom_event } from "../../events/binders/custom-event.js";

const binderMap = {
  ptr: bind_pointer_event,
  mouse : bind_mouse_event,
  key: bind_key_event,
  click : bind_click_event,
  drag : bind_drag_event,
  clipboard : bind_clipboard_event,
  focus : bind_focus_event,
  wheel : bind_wheel_event
};

const EventsMethodes = {
  on(event_name,...callbacks){
    if(!this.events.custom)this.events.custom = bind_custom_event(this);
    this.events.custom.on(event_name,...callbacks);
    return this;
  },
  emit(event_name,detail={}){
    if(!this.events.custom)this.events.custom = bind_custom_event(this);
    this.events.custom.emit(event_name,detail);
    return this;
  }
};

Object.entries(EventsMap).forEach(([name, eventList]) => {
  const lname = name.toLowerCase()
  eventList.forEach(event => {
    const methodName = `on${event}`;
    EventsMethodes[methodName] = function (...callbacks) {
      if (!this.events[lname]) this.events[lname] = binderMap[lname](this);
      this.events[lname][methodName](...callbacks);
      return this;
    };
  });
});



export {EventsMethodes}