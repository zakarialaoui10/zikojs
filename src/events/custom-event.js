import { __ZikoEvent__ } from "./__ZikoEvent__.js";
class ZikoEventCustom extends __ZikoEvent__{
    constructor(target, events, customizer){
        super(target, events, details_setter, customizer)
    }
    _register_events(events){
        super._register_events(events, null, null, false);
        return this;
    }
    emit(event_name, details = {}){
        const event=new Event(event_name);
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
const bindCustomEvent = (target, events, customizer) => new ZikoEventCustom(target, events, customizer)

export{
    bindCustomEvent,
    ZikoEventCustom
}