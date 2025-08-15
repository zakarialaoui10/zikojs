import { Events } from "../../events/__Events__";
import {
  bindPointerEvent,
  bindMouseEvent,
  bindKeyEvent,
  bindClickEvent,
  bindDragEvent,
  bindClipboardEvent,
  bindFocusEvent,
  bindWheelEvent
} from "../../events/index.js";

const binderMap = {
  ptr: bindPointerEvent,
  mouse : bindMouseEvent,
  key: bindKeyEvent,
  click : bindClickEvent,
  drag : bindDragEvent,
  clipboard : bindClipboardEvent,
  focus : bindFocusEvent,
  wheel : bindWheelEvent
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