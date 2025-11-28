import { Random } from "../math/random/index.js";

class UseChannel {
    constructor(name = "") {
        this.channel = new BroadcastChannel(name);
        this.eventData = new Map();
        this.handlers = new Map();
        this.uuid = "ziko-channel:" + Random.string(10);
        this.subscribers = new Set([this.uuid]);

        this.channel.addEventListener("message", (e) => {
            const { last_sent_event, userId, eventData } = e.data;

            // ignore own events
            if (userId === this.uuid) return;

            this.subscribers.add(userId);

            // sync data
            this.eventData = new Map(eventData);

            const data = this.eventData.get(last_sent_event);
            const handlers = this.handlers.get(last_sent_event);

            if (handlers) {
                handlers.forEach(fn => fn(data));
            }
        });
    }

    emit(event, data) {
        this.eventData.set(event, data);

        this.channel.postMessage({
            eventData: this.eventData,
            last_sent_event: event,
            userId: this.uuid
        });
        return this;
    }

    on(event, handler = console.log) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event).push(handler);
        return this;
    }

    close() {
        this.channel.close();
        return this;
    }

    get broadcast() {
        return this;
    }
}

const useChannel = (name) => new UseChannel(name);
export { useChannel };
