import { __init__global__ } from "../__ziko__/index.js";

if(!globalThis.__Ziko__) __init__global__()

export function useState(initialValue) {
    
    const {store, index} = __Ziko__.__State__
    __Ziko__.__State__.register({
            value : initialValue,
            subscribers : new Set(),
            paused : false
    })

    let current = store.get(index);

    function getValue() {
        return {
            value: current.value,
            isStateGetter: () => true,
            _subscribe: (fn) => current.subscribers.add(fn),
        };
    }

    function setValue(newValue) {
        if (current.paused) return;
        if (typeof newValue === "function") {
            newValue = newValue(current.value);
        }
        if (newValue !== current.value) {
            current.value = newValue;
            current.subscribers.forEach(fn => fn(current.value));
            __Ziko__.__State__.update(index, newValue)
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
