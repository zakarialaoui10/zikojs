import { useIPC } from "./use-ipc.js";

class UseStorage {
    constructor(storage, globalKey, initialValue, use_channel = true) {
        this.cache = {
            storage,
            globalKey,
            channel: use_channel ? useIPC(`Ziko:useStorage-${globalKey}`) : null,
            oldItemKeys: new Set()
        };

        this.#init(initialValue, use_channel);
    }

    get items() {
        const raw = this.cache.storage.getItem(this.cache.globalKey);
        if (!raw) return {};
        try {
            return JSON.parse(raw);
        } catch {
            return {};
        }
    }

    #maintain() {
        const items = this.items;
        this.cache.oldItemKeys.forEach(k => delete this[k]);
        for (const key in items) {
            this[key] = items[key];
            this.cache.oldItemKeys.add(key);
        }
    }
    #init(initialValue, use_channel) {
        if (use_channel && this.cache.channel) this.cache.channel.on("Ziko-Storage-Updated", () => this.#maintain());
        if (!initialValue) {
            this.#maintain();
            return;
        }
        if (this.cache.storage.getItem(this.cache.globalKey)) {
            const existing = this.items;
            Object.keys(existing).forEach(k => this.cache.oldItemKeys.add(k));
            this.#maintain();
        } 
        else this.set(initialValue);
    }

    set(data) {
        this.cache.storage.setItem(this.cache.globalKey, JSON.stringify(data));
        if (this.cache.channel) this.cache.channel.emit("Ziko-Storage-Updated", data);
        this.#maintain();
        return this;
    }

    add(data) {
        this.set({
            ...this.items,
            ...data
        });
        return this;
    }
    remove(...keys) {
        const items = { ...this.items };
        keys.forEach(key => {
            delete items[key];
            delete this[key];
            this.cache.oldItemKeys.delete(key);
        });
        this.set(items);
        return this;
    }
    get(key) {
        return this.items[key];
    }
    clear() {
        this.cache.storage.removeItem(this.cache.globalKey);
        this.cache.oldItemKeys.forEach(k => delete this[k]);
        this.cache.oldItemKeys.clear();
        this.#maintain();
        return this;
    }
    onStorageUpdated(callback) {
        if (this.cache.channel) {
            this.cache.channel.on("Ziko-Storage-Updated", callback);
        }
        return this;
    }
}

// factory functions
const useLocaleStorage = (key, initialValue, use_channel = true) =>
    new UseStorage(localStorage, key, initialValue, use_channel);

const useSessionStorage = (key, initialValue, use_channel = true) =>
    new UseStorage(sessionStorage, key, initialValue, use_channel);

export {
    useLocaleStorage,
    useSessionStorage
};
