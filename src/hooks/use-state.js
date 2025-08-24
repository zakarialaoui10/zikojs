import { __State__ } from "../__ziko__/__state__.js";
export function useState(initialValue) {
    if(!__Ziko__) globalThis.__Ziko__ = {}
    if(!__Ziko__.__State__) __Ziko__.__State__

    const {store, index} = __Ziko__.__State__
    __Ziko__.__State__.register({
            value : initialValue,
            subscribers : new Set(),
            paused : false
    })

    const current = store.get(index);

    function getValue() {
        return {
            value: current.value,
            isStateGetter: () => true,
            _subscribe: (fn) => current.subscribers.add(fn),
        };
    }

    function setValue(newValue) {
        if (current.paused) return;
        if (typeof newValue === "function") newValue = newValue(current.value);
        if (newValue !== current.value) {
            current.value = newValue;
            current.subscribers.forEach(fn => fn(current.value));
        }
    }

    const controller = {
        pause: () => { current.paused = true; },
        resume: () => { current.paused = false; },
        clear: () => { current.subscribers.clear(); },
        force: (newValue) => {
            if (typeof newValue === "function") newValue = newValue(current.value);
            current.value = newValue;
            current.subscribers.forEach(fn => fn(current.value));
        },
        getSubscribers: () => new Set(current.subscribers),
    };

    return [getValue, setValue, controller];
}


export const isStateGetter = (arg) => {
    return typeof arg === 'function' && arg?.()?.isStateGetter?.();
};
