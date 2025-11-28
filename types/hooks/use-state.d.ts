export function useState<T>(
    initialValue: T
): [
    /** getter function */
    () => {
        value: T;
        isStateGetter: () => true;
        _subscribe: (fn: (value: T) => void) => void;
    },

    /** setter function */
    (newValue: T | ((prev: T) => T)) => void,

    /** controller */
    {
        pause: () => void;
        resume: () => void;
        clear: () => void;
        force: (newValue: T | ((prev: T) => T)) => void;
        getSubscribers: () => Set<(value: T) => void>;
    }
];

/** check if argument is a state getter */
export function isStateGetter(arg: any): boolean;
