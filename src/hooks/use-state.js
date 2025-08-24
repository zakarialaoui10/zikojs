import { __init__global__ } from "../__ziko__/index.js";
if(!globalThis.__Ziko__) __init__global__()

    // HMR persistence
if (import.meta.hot) {
    import.meta.hot.data.__Ziko__ = import.meta.hot.data.__Ziko__ || globalThis.__Ziko__;
    globalThis.__Ziko__ = import.meta.hot.data.__Ziko__;
    // import.meta.hot.accept(n=>console.log(n));
    // console.log(import.meta.hot.data.__Ziko__.__State__.store)
}



export function useState(initialValue) {

    // console.log(import.meta.hot.data.__Ziko__.__State__.store.get(0))

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
