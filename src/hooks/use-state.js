export function useState(initialValue) {
    let value = initialValue;
    const subscribers = new Set();
    let paused = false;

    function getValue() {
        return {
            value,
            isStateGetter: () => true,
            _subscribe: (fn) => subscribers.add(fn)
        };
    }

    function setValue(newValue) {
        if (paused) return;
        if (typeof newValue === "function") newValue = newValue(value);
        if (newValue !== value) {
            value = newValue;
            subscribers.forEach(fn => fn(value));
        }
    }

    const controller = {
        pause: () => { paused = true; },
        resume: () => { paused = false; },
        clear: () => { subscribers.clear(); },
        force: (newValue) => { // force update even if paused
            if (typeof newValue === "function") newValue = newValue(value);
            value = newValue;
            subscribers.forEach(fn => fn(value));
        },
        getSubscribers: () => new Set(subscribers),
    };

    return [getValue, setValue, controller];
}

export const isStateGetter = (arg) => {
    return typeof(arg) === 'function' && arg?.()?.isStateGetter?.()
}

