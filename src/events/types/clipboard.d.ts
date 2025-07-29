import { __ZikoEvent__ } from "../__ZikoEvent__.js";
import type { Callback, ClipboardEventKeys } from './__Shared__.js';
import { ZikoUIElement } from "../../ui/index.js";

declare class ZikoEventClipboard extends __ZikoEvent__ {
  constructor(target: any, customizer?: Function);

  // Explicitly declare the dynamic methods to get editor support
    onCopy(...callbacks: Callback<ZikoEventClipboard>[]): this;
    onCut(...callbacks: Callback<ZikoEventClipboard>[]): this;
    onPaste(...callbacks: Callback<ZikoEventClipboard>[]): this;

}

declare const bindClipboardEvent: (target: ZikoUIElement, customizer?: Function) => ZikoEventClipboard;

export {
  ZikoEventClipboard,
  bindClipboardEvent,
};
