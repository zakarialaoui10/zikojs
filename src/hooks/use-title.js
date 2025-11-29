import { useEventEmitter } from "./use-event-emitter.js";

class UseTitle {
    constructor(title = document.title, withEmitter = true) {
        this.cache = {
            emitter: null
        };

        if (withEmitter) this.enableEmitter();
        this.set(title);
    }

    enableEmitter() {
        this.cache.emitter = useEventEmitter();
        return this;
    }

    set(title) {
        if (title !== document.title) {
            document.title = title;

            if (this.cache.emitter) {
                this.cache.emitter.emit("ziko:title-changed", title);
            }
        }
        return this;
    }

    get current() {
        return document.title;
    }

    onChange(callback) {
        if (this.cache.emitter) {
            this.cache.emitter.on("ziko:title-changed", callback);
        }
        return this;
    }

    onceChange(callback) {
        if (this.cache.emitter) {
            this.cache.emitter.once("ziko:title-changed", callback);
        }
        return this;
    }

    offChange(callback) {
        if (this.cache.emitter) {
            this.cache.emitter.off("ziko:title-changed", callback);
        }
        return this;
    }
}

const useTitle = (title, withEmitter = true) => new UseTitle(title, withEmitter);

export { useTitle };
