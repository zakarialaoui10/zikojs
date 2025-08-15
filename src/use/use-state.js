export function useState(initialValue) {
    let value = initialValue;
    const subscribers = new Set();
    let Paused = false

    function getValue() {
        return {
            value,
            isStateGetter: () => true,
            _subscribe: (fn, element) => {
                subscribers.add(fn);

                // Automatically remove subscriber if the element is removed from DOM
                const observer = new MutationObserver(() => {
                    if (!document.body.contains(element)) {
                        Paused = true
                        subscribers.delete(fn);
                        observer.disconnect();
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
            },
        };
    }

    function setValue(newValue) {
        if(!Paused){
            if (typeof newValue === "function") newValue = newValue(value);
            if (newValue !== value) {
                value = newValue;
                subscribers.forEach(fn => fn(value));
            }
        }
    }

    return [getValue, setValue];
}
