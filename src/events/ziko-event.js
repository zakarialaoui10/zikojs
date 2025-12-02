import { getEvent } from './utils.js'
class ZikoEvent {
    constructor(signature, target = null, Events = [], details_setter, customizer){
        this.target = target;
        this.cache = {
            signature,
            currentEvent : null,
            event: null,
            options : {},
            preventDefault : {},
            stopPropagation : {},
            stopImmediatePropagation : {},
            paused : {},
            callbacks : {},
            __controllers__:{}
        }
        if (Events) this._register_events(Events, details_setter, customizer);
    }
    _register_events(Events, details_setter, customizer, REGISTER_METHODES = true) {
        const events = Events?.map(n => getEvent(n));
        events?.forEach((event, i) => {
            this.cache.preventDefault[event] = false;
            this.cache.options[event] = {};
            this.cache.paused[event] = false;
            this.cache.__controllers__[event] = (e) =>
                event_controller.call(this, e, event, details_setter, customizer);
            if (REGISTER_METHODES) {
                this[`on${Events[i]}`] = (callback) =>
                    this.__onEvent(event, this.cache.options[event], {}, callback);
            }
        });
        return this;
}

    __onEvent(event, options, dispose, callback) {
        if (!callback) return this;

        // Store single callback directly
        this.cache.callbacks[event] = callback;

        this.__handle(event, this.cache.__controllers__[event], options, dispose);
        return this;
    }

    get targetElement(){
        return this.target?.element;
    }
    get isParent(){
        return this.target?.element === this.event?.srcElement;
    }
    get item(){
        return this.target.find(n => n.element == this.event?.srcElement)?.[0];
    }
    get currentEvent(){
        return this.cache.currentEvent;
    }
    get event(){
        return this.cache.event;
    }
    get detail(){
        return this.cache.event.detail
    }
    setTarget(UI){
        this.target = UI;
        return this;
    }
    __handle(event, handler, options){
        this.targetElement?.addEventListener(event, handler, options);
        return this;
    }
    #override(method, ...events) {
        const keys = events.length === 0 ? Object.keys(this.cache[method]) : events
        keys.forEach(e => {
            if (this.cache[method].hasOwnProperty(e)) this.cache[method][e] = true;
        });
        return this;
    }
    preventDefault(...events) {
        return this.#override('preventDefault', ...events);
    }
    stopPropagation(...events) {
        return this.#override('stopPropagation', ...events);
    }
    stopImmediatePropagation(...events) {
        return this.#override('stopImmediatePropagation', ...events);
    }
    setEventOptions(event, options){
        const evt = getEvent(event);
        this.pause({ [evt]: true });
        Object.assign(this.cache.options[evt], options);
        this.resume({ [evt]: true });
        return this;
    }
    #toggleEventListener(method, ...events) {
        console.log(events, events.length)
        const keys = events.length === 0
            ? Object.keys(this.cache.paused) 
            : events;
        keys.forEach(key => {
            if (!this.cache.paused.hasOwnProperty(key)) return;
            this.targetElement?.[method](
                key,
                this.cache.__controllers__[key],
                this.cache.options[key]
            );
            this.cache.paused[key] = method === 'removeEventListener';
        });
        return this;
    }
    pause(...events) {
        return this.#toggleEventListener('removeEventListener', ...events);
    }
    resume(...events) {
        return this.#toggleEventListener('addEventListener', ...events);
    }
    clear(){
        return this;
    }
    dispose(){
        this.pause(true);
        this.target.cache.event[this.cache.signature] = null
        return this;
    }
}

function event_controller(e, event_name, details_setter, customizer) {
    this.cache.currentEvent = event_name;
    this.cache.event = e;

    details_setter?.call(this);
    if (customizer?.hasOwnProperty('prototype')) customizer?.call(this);
    else customizer?.call(null, this);

    if (this.cache.preventDefault[event_name]) e.preventDefault();
    if (this.cache.stopPropagation[event_name]) e.stopPropagation();
    if (this.cache.stopImmediatePropagation[event_name]) e.stopImmediatePropagation();

    // Call the single callback if it exists
    this.cache.callbacks[event_name]?.(this);
}



export {
    ZikoEvent,
    getEvent
}
