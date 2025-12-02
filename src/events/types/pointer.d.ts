import { ZikoEvent } from "../ziko-event.js";
import type { EventMethodesBinder, Callback, PointerEventKeys } from './__Shared__.js';
import { UIElement } from "../../ui/index.js";

type PointerEventMethodesBinder = EventMethodesBinder<PointerEventKeys, ZikoEventPointer>;

declare class ZikoEventPointer extends ZikoEvent implements PointerEventMethodesBinder {
  constructor(target: any, customizer?: Function);

  isDown: boolean;

  dx?: number;
  dy?: number;

  mx?: number;
  my?: number;
  isMoving?: boolean;

  ux?: number;
  uy?: number;

  swippe?: {
    h: "left" | "right" | "none";
    v: "top" | "bottom" | "none";
    delta_x: number;
    delta_y: number;
  };

  // Explicitly declare the dynamic methods to get editor support
    onPtrMove(...callbacks: Callback<ZikoEventPointer>[]): this;
    onPtrDown(...callbacks: Callback<ZikoEventPointer>[]): this;
    onPtrUp(...callbacks: Callback<ZikoEventPointer>[]): this;
    onPtrLeave(...callbacks: Callback<ZikoEventPointer>[]): this;
    onPtrEnter(...callbacks: Callback<ZikoEventPointer>[]): this;
    onPtrOut(...callbacks: Callback<ZikoEventPointer>[]): this;
    onPtrCancel(...callbacks: Callback<ZikoEventPointer>[]): this;

}

declare const bind_pointer_event: (target: UIElement, customizer?: Function) => ZikoEventPointer;

export {
  ZikoEventPointer,
  bind_pointer_event,
};
