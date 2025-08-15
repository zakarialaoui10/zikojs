export function useState(initialValue) {
    let value = initialValue;
    const subscribers = new Set();
    let paused = false;

    function getValue() {
        return {
            value,
            isStateGetter: () => true,
            _subscribe: (fn, UIElement) => {
                subscribers.add(fn);

                const observer = new MutationObserver(() => {
                    if (!document.body.contains(UIElement.element)) {
                        subscribers.delete(fn);
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });
            },
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
