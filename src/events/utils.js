export function event_controller(e, event_name, details_setter, customizer) {
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

export function toggle_event_listener(method, ...events) {
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
const getEvent=(event = "")=>{
    if(event.startsWith("Ptr"))return `pointer${event.split("Ptr")[1].toLowerCase()}`;
    return event.toLowerCase()
}
export{
    getEvent
}