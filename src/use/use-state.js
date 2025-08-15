export function useState(initialValue) {
    let value = initialValue;
    const subscribers = new Set();

    function getValue() {
        return {
            value,
            isStateGetter: () => true,
            _subscribe: (fn) => subscribers.add(fn),
        };
    }

    function setValue(newValue) {
        if (typeof newValue === "function") newValue = newValue(value);
        if (newValue !== value) {
            value = newValue;
            subscribers.forEach(fn => fn(value));
        }
    }

    return [getValue, setValue];
}