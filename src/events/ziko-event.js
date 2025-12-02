import { 
    getEvent,
    event_controller,
    toggle_event_listener
} from './utils.js'
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
        this.pause();
        Object.assign(this.cache.options[evt], options);
        this.resume();
        return this;
    }
    pause(...events) {
        return toggle_event_listener.call(this, 'removeEventListener', ...events)
    }
    resume(...events) {
        return toggle_event_listener.call(this, 'addEventListener', ...events);
    }
    dispose(){
        this.pause();
        this.target.events[this.cache.signature] = null
        return this;
    }
}
export {
    ZikoEvent,
    getEvent
}
