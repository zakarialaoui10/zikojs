export declare class UseTitle {
    /**
     * Create a reactive title manager.
     * @param title Initial title. Defaults to `document.title`.
     * @param withEmitter Whether to create an internal event emitter. Default: true.
     */
    constructor(title?: string, withEmitter?: boolean);

    /**
     * Enables the internal event emitter.
     */
    enableEmitter(): this;

    /**
     * Sets the document title.
     * Emits "ziko:title-changed" if emitter is enabled.
     */
    set(title: string): this;

    /**
     * Returns the current document title.
     */
    readonly current: string;

    /**
     * Listen for title changes.
     */
    onChange(callback: (title: string) => void): this;

    /**
     * Listen once for the next title change.
     */
    onceChange(callback: (title: string) => void): this;

    /**
     * Remove a listener from title changes.
     */
    offChange(callback: (title: string) => void): this;
}

export declare const useTitle: (title?: string, withEmitter?: boolean) => UseTitle;
