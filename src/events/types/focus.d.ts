import { __ZikoEvent__ } from "../__ZikoEvent__.js";
import type { Callback } from './__Shared__.js';
import { ZikoUIElement } from "../../ui/index.js";

declare class ZikoEventFocus extends __ZikoEvent__ {
  constructor(target: any, customizer?: Function);

  // Explicitly declare the dynamic methods to get editor support
    onFocus(...callbacks: Callback<ZikoEventFocus>[]): this;
    onBlur(...callbacks: Callback<ZikoEventFocus>[]): this;

}

declare const bindFocusEvent: (target: ZikoUIElement, customizer?: Function) => ZikoEventFocus;

export {
  ZikoEventFocus,
  bindFocusEvent,
};
