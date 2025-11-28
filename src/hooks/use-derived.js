export function useDerived(deriveFn, sources) {
    let value = deriveFn(...sources.map(s => s().value));
    const subscribers = new Set();
    let paused = false;

    sources.forEach(source => {
        const srcValue = source();
        srcValue._subscribe(() => {
            if (!paused) {
                const newVal = deriveFn(...sources.map(s => s().value));
                if (newVal !== value) {
                    value = newVal;
                    subscribers.forEach(fn => fn(value));
                }
            }
        }); 
    });
    return () => ({
        value,
        isStateGetter : () => true,
        _subscribe: (fn) => subscribers.add(fn)
    })
}