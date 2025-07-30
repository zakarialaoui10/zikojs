export type EventCustomizer = ((this: __ZikoEvent__) => void) | ((ctx: __ZikoEvent__) => void);

export type EventMethodesBinder<
  EventKeys extends string,
  InstanceType
> = {
  [K in EventKeys as `on${K}`]: (...callbacks: ((ctx: InstanceType) => void)[]) => InstanceType
};

export type Callback<InstanceType> = (ctx: InstanceType) => void;

export interface ZikoEventStream {
  enabled: Record<string, boolean>;
  clear: Record<string, boolean>;
  history: Record<string, any[]>;
  t0?: number;
}

export interface ZikoEventCache {
  currentEvent: string | null;
  event: Event | null;
  options: Record<string, AddEventListenerOptions>;
  preventDefault: Record<string, boolean>;
  stopPropagation: Record<string, boolean>;
  stopImmediatePropagation: Record<string, boolean>;
  event_flow: Record<string, unknown>;
  paused: Record<string, boolean>;
  stream: ZikoEventStream;
  callbacks: Record<string, ((e: any) => void)[]>;
  __controllers__: Record<string, (e: Event) => void>;
}

export declare class __ZikoEvent__ {
  constructor(
    target: any,
    Events: string[],
    details_setter?: (this: __ZikoEvent__) => void,
    customizer?: EventCustomizer
  );

  target: any;
  cache: ZikoEventCache;

  get targetElement(): HTMLElement | null;
  get isParent(): boolean;
  get item(): any;
  get currentEvent(): string | null;
  get event(): Event | null;

  _register_events(
    Events: string[] | undefined,
    details_setter: (e: this) => any,
    customizer: (e: this) => any, // To Check
    REGISTER_METHODES?: boolean
  ): this;

  setTarget(UI: any): this;

  preventDefault(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  stopPropagation(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  stopImmediatePropagation(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  setEventOptions(
    event: string,
    options: AddEventListenerOptions
  ): this;

  pause(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  resume(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  stream(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  clear(): this;

  dispose(
    overrides?: Partial<Record<string, boolean>>,
    defaultValue?: boolean | "default"
  ): this;

  // Internal
  protected __handle(
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions,
    dispose?: any
  ): this;

  protected __onEvent(
    event: string,
    options?: AddEventListenerOptions,
    dispose?: any,
    ...callbacks: ((ctx: this) => void)[]
  ): this;
}
// export type ClickEventKeys = 
//         | 'Click'
//         | 'DblClick';

// export type PointerEventKeys =
//         | 'PtrMove'
//         | 'PtrDown'
//         | 'PtrUp'
//         | 'PtrLeave'
//         | 'PtrEnter'
//         | 'PtrOut'
//         | 'PtrCancel'

// export type MouseEventKeys = 
//         | 'MouseMove'
//         | 'MouseDown';
// export type TouchEventKeys = 
//         | 'ToucMove'
//         | 'ToucDown';
// export type KeyEventKeys = 
//         | 'keyDown'
//         | 'keyPress'
//         | 'keyUs';
// export type ClipboardEventKeys = 
//         | 'Copy'
//         | 'Cut'
//         | 'Paste';
// export type FocusEventKeys = 
//         | 'focus'
//         | 'blur';
// export type DragEventKeys = 
//         | 'Drag'
//         | 'DragStart'
//         | 'DragEnd'
//         | 'Drop';        
// export type MediaEventKeys = 
//         | '__';
// export type HashEventKeys = 
//         | 'HashChange'
  