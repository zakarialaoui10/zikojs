const runtimeStore = new Map();
globalThis.runtimeStore = runtimeStore

export function useState(initialValue, key = Math.random()) {
    if (!runtimeStore.has(key)) {
        runtimeStore.set(key, {
            value: initialValue,
            subscribers: new Set(),
            paused: false,
        });
    }

    const store = runtimeStore.get(key);

    function getValue() {
        return {
            value: store.value,
            isStateGetter: () => true,
            _subscribe: (fn) => store.subscribers.add(fn),
        };
    }

    function setValue(newValue) {
        if (store.paused) return;
        if (typeof newValue === "function") newValue = newValue(store.value);
        if (newValue !== store.value) {
            store.value = newValue;
            store.subscribers.forEach(fn => fn(store.value));
        }
    }

    const controller = {
        pause: () => { store.paused = true; },
        resume: () => { store.paused = false; },
        clear: () => { store.subscribers.clear(); },
        force: (newValue) => {
            if (typeof newValue === "function") newValue = newValue(store.value);
            store.value = newValue;
            store.subscribers.forEach(fn => fn(store.value));
        },
        getSubscribers: () => new Set(store.subscribers),
    };

    return [getValue, setValue, controller];
}


export const isStateGetter = (arg) => {
    return typeof arg === 'function' && arg?.()?.isStateGetter?.();
};
