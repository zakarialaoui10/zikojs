import { ZikoEvent } from "../ziko-event.js";
class ZikoCustomEvent extends ZikoEvent{
    constructor(target, events, customizer){
        super('custom', target, events, details_setter, customizer)
    }
    _register_events(events){
        super._register_events(events, null, null, false);
        return this;
    }
    emit(event_name, detail = {}){
        const event = new CustomEvent(event_name, {
            detail,
            bubbles: true,
            cancelable: true
        });
        this.targetElement.dispatchEvent(event);
        return this;
    }
    on(event_name, ...callbacks){
        if(!this.cache.options.hasOwnProperty(event_name)) this._register_events([event_name]);
        this.__onEvent(event_name, this.cache.options[event_name], {}, ...callbacks);
        return this;
    }
}
function details_setter(){

}
const bind_custom_event = (target, events, customizer) => new ZikoCustomEvent(target, events, customizer)

export{
    bind_custom_event,
    ZikoCustomEvent
}