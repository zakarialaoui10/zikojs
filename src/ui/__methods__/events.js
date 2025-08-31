import { Events } from "../../events/__Events__";
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

const EventsMethodes = {};

Object.entries(Events).forEach(([name, eventList]) => {
  eventList.forEach(event => {
    const methodName = `on${event}`;
    EventsMethodes[methodName] = function (...callbacks) {
      if (!this.events[name]) this.events[name] = binderMap[name.toLowerCase()](this);
      this.events[name][methodName](...callbacks);
      return this;
    };
  });
});



export {EventsMethodes}