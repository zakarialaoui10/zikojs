// pointer.d.ts

import { __ZikoEvent__ } from "./__ZikoEvent__.js";

type PointerEventKeys =
  | 'PtrMove'
  | 'PtrDown'
  | 'PtrUp'
  | 'PtrLeave'
  | 'PtrEnter'
  | 'PtrOut'
  | 'PtrCancel';

type Callback = (ctx: ZikoEventPointer) => void;

type PointerEventHandlers = {
  [K in PointerEventKeys as `on${K}`]: (...callbacks: Callback[]) => ZikoEventPointer;
};

declare class ZikoEventPointer extends __ZikoEvent__ implements PointerEventHandlers {
  constructor(target: any, customizer?: Function);

  isDown: boolean;

  dx?: number;
  dy?: number;

  mx?: number;
  my?: number;
  isMove?: boolean;

  ux?: number;
  uy?: number;

  swippe?: {
    h: "left" | "right" | "none";
    v: "top" | "bottom" | "none";
    delta_x: number;
    delta_y: number;
  };

  // Explicitly declare the dynamic methods to get editor support
  onPtrMove(...callbacks: Callback[]): this;
  onPtrDown(...callbacks: Callback[]): this;
  onPtrUp(...callbacks: Callback[]): this;
  onPtrLeave(...callbacks: Callback[]): this;
  onPtrEnter(...callbacks: Callback[]): this;
  onPtrOut(...callbacks: Callback[]): this;
  onPtrCancel(...callbacks: Callback[]): this;
}

declare const bindPointerEvent: (target: any, customizer?: Function) => ZikoEventPointer;

export {
  ZikoEventPointer,
  bindPointerEvent,
};
