import { ZikoEvent } from "../ziko-event.js";
import type { Callback } from './__Shared__.js';
import { UIElement } from "../../ui/index.js";

declare class ZikoEventFocus extends ZikoEvent {
  constructor(target: any, customizer?: Function);

  // Explicitly declare the dynamic methods to get editor support
    onFocus(...callbacks: Callback<ZikoEventFocus>[]): this;
    onBlur(...callbacks: Callback<ZikoEventFocus>[]): this;

}

declare const bind_focus_event: (target: UIElement, customizer?: Function) => ZikoEventFocus;

export {
  ZikoEventFocus,
  bind_focus_event,
};
